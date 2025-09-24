const API_BASE_URL = 'http://localhost:3001/api';

export interface CameraStatus {
  available: boolean;
  message?: string;
  error?: string;
}

export interface PhotoCaptureResult {
  success: boolean;
  message?: string;
  photoUrl?: string;
  localPath?: string;
  error?: string;
}

export interface Photo {
  filename: string;
  url: string;
  path: string;
}

export class CameraService {
  static async checkStatus(): Promise<CameraStatus> {
    try {
      const response = await fetch(`${API_BASE_URL}/camera/status`);
      return await response.json();
    } catch (error) {
      console.error('Failed to check camera status:', error);
      return {
        available: false,
        error: 'Failed to connect to camera service'
      };
    }
  }

  static async capturePhoto(filename?: string): Promise<PhotoCaptureResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/camera/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to capture photo:', error);
      return {
        success: false,
        error: 'Failed to capture photo'
      };
    }
  }

  static async startPreview(duration: number = 5000): Promise<PhotoCaptureResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/camera/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ duration }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to start preview:', error);
      return {
        success: false,
        error: 'Failed to start preview'
      };
    }
  }

  static async getPhotos(): Promise<{ success: boolean; photos?: Photo[]; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/photos`);
      return await response.json();
    } catch (error) {
      console.error('Failed to get photos:', error);
      return {
        success: false,
        error: 'Failed to get photos'
      };
    }
  }
}
