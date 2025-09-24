import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Camera, Download, RotateCcw, X, Wifi, WifiOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { CameraService, CameraStatus } from '@/services/cameraService';

interface RaspberryPiCameraProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPhotoCaptured: (photoData: string) => void;
  onSkip?: () => void;
  onError?: () => void;
}

export function RaspberryPiCamera({ open, onOpenChange, onPhotoCaptured, onSkip, onError }: RaspberryPiCameraProps) {
  const [cameraStatus, setCameraStatus] = useState<CameraStatus | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [useWebCamera, setUseWebCamera] = useState(false);
  const [webCameraStream, setWebCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (open) {
      checkCameraStatus();
    } else {
      // Clean up web camera stream when dialog closes
      if (webCameraStream) {
        webCameraStream.getTracks().forEach(track => track.stop());
        setWebCameraStream(null);
      }
    }
  }, [open, webCameraStream]);

  const checkCameraStatus = async () => {
    try {
      const status = await CameraService.checkStatus();
      setCameraStatus(status);
      
      if (!status.available) {
        // Don't show error toast, just fall back to web camera
        setUseWebCamera(true);
      }
    } catch (error) {
      console.error('Camera status check failed:', error);
      setCameraStatus({ available: false, error: 'Service unavailable' });
      setUseWebCamera(true);
    }
  };

  const startWebCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Front camera for selfies
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setWebCameraStream(stream);
      }
    } catch (err) {
      console.error('Error accessing web camera:', err);
      if (onError) {
        onError();
      } else {
        toast({
          title: "Camera Unavailable",
          description: "Unable to access any camera. Please check permissions.",
          variant: "destructive",
        });
      }
    }
  };

  const capturePhoto = async () => {
    if (useWebCamera) {
      captureWebPhoto();
      return;
    }

    setIsCapturing(true);
    try {
      const filename = `customer_photo_${Date.now()}.jpg`;
      const result = await CameraService.capturePhoto(filename);
      
      if (result.success && result.photoUrl) {
        // Convert the local photo to base64 for the parent component
        const response = await fetch(`http://localhost:3001${result.photoUrl}`);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setCapturedPhoto(base64);
          setIsCapturing(false);
        };
        reader.readAsDataURL(blob);
      } else {
        throw new Error(result.error || 'Failed to capture photo');
      }
    } catch (error) {
      console.error('Photo capture error:', error);
      if (onError) {
        onError();
      } else {
        toast({
          title: "Photo Capture Failed",
          description: "Failed to capture photo. Please try again.",
          variant: "destructive",
        });
      }
      setIsCapturing(false);
    }
  };

  const captureWebPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const photoData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedPhoto(photoData);
    setIsCapturing(false);
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setIsCapturing(true);
    if (useWebCamera && !webCameraStream) {
      startWebCamera();
    }
  };

  const skipPhoto = () => {
    if (onSkip) {
      onSkip();
    } else {
      onOpenChange(false);
    }
  };

  const savePhoto = () => {
    if (capturedPhoto) {
      onPhotoCaptured(capturedPhoto);
      onOpenChange(false);
      toast({
        title: "Photo Captured! 📸",
        description: "Your happy customer photo has been saved!",
      });
    }
  };

  const switchToWebCamera = () => {
    setUseWebCamera(true);
    startWebCamera();
    toast({
      title: "Switched to Web Camera",
      description: "Using your device's camera instead.",
    });
  };

  const closeCamera = () => {
    if (webCameraStream) {
      webCameraStream.getTracks().forEach(track => track.stop());
      setWebCameraStream(null);
    }
    setCapturedPhoto(null);
    setIsCapturing(false);
    setUseWebCamera(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={closeCamera}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Capture Happy Customer Photo
          </DialogTitle>
          <DialogDescription>
            Take a photo to celebrate your purchase! This will be saved as a memory.
          </DialogDescription>
        </DialogHeader>

        {/* Skip Button */}
        <div className="flex justify-end">
          <Button onClick={skipPhoto} variant="ghost" size="sm">
            Skip Photo
          </Button>
        </div>

        <div className="space-y-4">
          {/* Camera Status */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              {useWebCamera ? (
                <>
                  <WifiOff className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-700">Using Web Camera</span>
                </>
              ) : cameraStatus?.available ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-700">Raspberry Pi Camera Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-700">Raspberry Pi Camera Unavailable</span>
                </>
              )}
            </div>
            {!useWebCamera && !cameraStatus?.available && (
              <Button onClick={switchToWebCamera} variant="outline" size="sm">
                Use Web Camera
              </Button>
            )}
          </div>

          {/* Camera Interface */}
          {!capturedPhoto && (
            <div className="text-center py-8">
              {useWebCamera && webCameraStream ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <Button
                      onClick={captureWebPhoto}
                      size="lg"
                      className="bg-primary text-primary-foreground rounded-full w-16 h-16"
                    >
                      <Camera className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {useWebCamera ? 'Web Camera Ready' : 'Raspberry Pi Camera Ready'}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {useWebCamera 
                      ? 'Click the button below to start your device camera'
                      : 'Click the button below to capture a photo with the Raspberry Pi camera'
                    }
                  </p>
                  
                  <Button
                    onClick={useWebCamera ? startWebCamera : capturePhoto}
                    disabled={isCapturing}
                    size="lg"
                    className="bg-primary text-primary-foreground"
                  >
                    {isCapturing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Capturing...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        {useWebCamera ? 'Start Web Camera' : 'Capture Photo'}
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Captured Photo */}
          {capturedPhoto && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedPhoto}
                  alt="Captured photo"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    onClick={retakePhoto}
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button onClick={retakePhoto} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
                <Button onClick={savePhoto} className="bg-primary text-primary-foreground">
                  <Download className="mr-2 h-4 w-4" />
                  Save Photo
                </Button>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
