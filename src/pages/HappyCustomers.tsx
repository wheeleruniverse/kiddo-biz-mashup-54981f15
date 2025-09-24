import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, Download, RefreshCw, Smile, Heart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CameraService, Photo } from '@/services/cameraService';
import { toast } from '@/hooks/use-toast';

const HappyCustomers = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await CameraService.getPhotos();
      
      if (result.success && result.photos) {
        // Sort photos by filename (newest first)
        const sortedPhotos = result.photos.sort((a, b) => 
          b.filename.localeCompare(a.filename)
        );
        setPhotos(sortedPhotos);
      } else {
        setError(result.error || 'Failed to load photos');
      }
    } catch (err) {
      console.error('Error loading photos:', err);
      setError('Failed to connect to camera service');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = `http://localhost:3001${photo.url}`;
    link.download = photo.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Photo Downloaded! 📸",
      description: `${photo.filename} has been downloaded to your device.`,
    });
  };

  const deletePhoto = async (photo: Photo) => {
    if (!window.confirm(`Are you sure you want to delete this photo? This action cannot be undone.`)) {
      return;
    }

    try {
      const result = await CameraService.deletePhoto(photo.filename);
      
      if (result.success) {
        toast({
          title: "Photo Deleted! 🗑️",
          description: "The photo has been removed from the gallery.",
        });
        // Reload photos to update the list
        loadPhotos();
      } else {
        throw new Error(result.error || 'Failed to delete photo');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the photo. Please try again.",
        variant: "destructive",
      });
    }
  };


  const formatDate = (filename: string) => {
    // Extract timestamp from filename (customer_photo_1234567890.jpg)
    const timestamp = filename.match(/\d{13}/);
    if (timestamp) {
      const date = new Date(parseInt(timestamp[0]));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return 'Unknown date';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-foreground hover:bg-accent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={loadPhotos}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-8 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Smile className="h-8 w-8 text-primary" />
            <Heart className="h-6 w-6 text-red-500" />
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Happy Customers Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See all the wonderful photos our customers have taken during their shopping experience!
          </p>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading happy customer photos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
                <Camera className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-destructive mb-2">
                  Unable to Load Photos
                </h3>
                <p className="text-destructive/80 mb-4">{error}</p>
                <Button onClick={loadPhotos} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Photos Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start shopping and take some happy customer photos!
                </p>
                <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground">
                  Start Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {photos.length} Happy Customer{photos.length !== 1 ? 's' : ''} 📸
                </h2>
                <p className="text-muted-foreground">
                  Each photo represents a joyful shopping experience!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo, index) => (
                  <Card key={photo.filename} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">
                        Customer #{photos.length - index}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative group">
                        <img
                          src={`http://localhost:3001${photo.url}`}
                          alt={`Happy customer photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <Button
                            onClick={() => downloadPhoto(photo)}
                            size="sm"
                            className="bg-white text-black hover:bg-gray-100"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          {formatDate(photo.filename)}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => downloadPhoto(photo)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Download className="mr-2 h-3 w-3" />
                            Download
                          </Button>
                          <Button
                            onClick={() => deletePhoto(photo)}
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {photos.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <Card className="inline-block p-6 bg-gradient-card">
              <h3 className="text-xl font-bold text-foreground mb-2">
                <Heart className="inline h-5 w-5 mr-2 text-red-500" />
                Love These Photos?
              </h3>
              <p className="text-muted-foreground mb-4">
                Take your own happy customer photo by shopping with us!
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-primary text-primary-foreground"
              >
                Start Shopping & Take Photo
              </Button>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default HappyCustomers;
