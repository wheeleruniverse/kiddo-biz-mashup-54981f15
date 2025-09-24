import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Camera, Download, RotateCcw, Wifi, WifiOff } from 'lucide-react';
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
  const [capturedPhotoFilename, setCapturedPhotoFilename] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setCapturedPhoto(null);
      setCapturedPhotoFilename(null);
      setIsCapturing(false);
      checkCameraStatus();
    }
  }, [open]);

  const checkCameraStatus = async () => {
    try {
      const status = await CameraService.checkStatus();
      setCameraStatus(status);
    } catch (error) {
      console.error('Camera status check failed:', error);
      setCameraStatus({ available: false, error: 'Service unavailable' });
    }
  };


  const capturePhoto = async () => {
    setIsCapturing(true);
    try {
      const filename = `customer_photo_${Date.now()}.jpg`;
      const result = await CameraService.capturePhoto(filename);
      
      if (result.success && result.photoUrl) {
        // Store the filename for potential deletion
        setCapturedPhotoFilename(filename);
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

  const retakePhoto = async () => {
    // Delete the previously captured photo from server if it exists
    if (capturedPhotoFilename) {
      try {
        await CameraService.deletePhoto(capturedPhotoFilename);
        console.log('Previous photo deleted:', capturedPhotoFilename);
      } catch (error) {
        console.error('Failed to delete previous photo:', error);
        // Don't show error to user, just log it
      }
    }
    
    setCapturedPhoto(null);
    setCapturedPhotoFilename(null);
    setIsCapturing(false);
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

  const closeCamera = async () => {
    // Delete any unsaved photo when closing
    if (capturedPhotoFilename) {
      try {
        await CameraService.deletePhoto(capturedPhotoFilename);
        console.log('Unsaved photo deleted on close:', capturedPhotoFilename);
      } catch (error) {
        console.error('Failed to delete unsaved photo:', error);
      }
    }
    
    setCapturedPhoto(null);
    setCapturedPhotoFilename(null);
    setIsCapturing(false);
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
          <div className="flex items-center justify-center p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              {cameraStatus?.available ? (
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
          </div>

          {/* Camera Interface */}
          {!capturedPhoto && (
            <div className="text-center py-8">
              <div className="space-y-4">
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Raspberry Pi Camera Ready</p>
                    <p className="text-sm text-gray-500">Click capture when ready</p>
                  </div>
                </div>
                
                <Button
                  onClick={capturePhoto}
                  disabled={isCapturing || !cameraStatus?.available}
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
                      Capture Photo
                    </>
                  )}
                </Button>
                
                {!cameraStatus?.available && (
                  <p className="text-sm text-red-600 mt-2">
                    Camera service is not available. Please check your Raspberry Pi setup.
                  </p>
                )}
              </div>
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

      </DialogContent>
    </Dialog>
  );
}
