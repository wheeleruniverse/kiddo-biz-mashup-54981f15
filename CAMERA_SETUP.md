# Raspberry Pi Camera Integration Setup

This guide will help you integrate the 5MP OV5647 camera module with your son's website for happy customer photo capture during checkout.

## Prerequisites

1. **Raspberry Pi 4B** with the 5MP OV5647 camera module properly connected
2. **Raspberry Pi OS** (Bookworm or Bullseye) with camera configured
3. **Node.js** installed on your Raspberry Pi
4. **rpicam-apps** installed (usually comes with Raspberry Pi OS)

## Camera Configuration

First, make sure your camera is properly configured following the [Arducam guide](https://docs.arducam.com/Raspberry-Pi-Camera/Native-camera/5MP-OV5647/#2-camera-usage):

### For Raspberry Pi 4B:

1. Edit the config file:
   ```bash
   sudo nano /boot/firmware/config.txt  # For Bookworm
   # OR
   sudo nano /boot/config.txt           # For Bullseye
   ```

2. Make these changes:
   - Change `camera_auto_detect=1` to `camera_auto_detect=0`
   - Add `dtoverlay=ov5647` under the `[all]` section

3. Reboot your Pi:
   ```bash
   sudo reboot
   ```

4. Test the camera:
   ```bash
   rpicam-still --list-cameras
   rpicam-still -t 5000 -o test.jpg
   ```

## Backend Setup

1. **Install server dependencies:**
   ```bash
   cd /path/to/your/project
   npm install express cors
   # OR install from the server-package.json
   npm install --save express cors
   ```

2. **Start the camera API server:**
   ```bash
   node server.js
   ```

   The server will run on `http://localhost:3001` and create a `photos/` directory for storing captured images.

3. **Test the API:**
   ```bash
   curl http://localhost:3001/api/health
   curl http://localhost:3001/api/camera/status
   ```

## Frontend Integration

The camera integration is already set up in your React app with these components:

- `RaspberryPiCamera` - Main camera component that can use both Pi camera and web camera
- `CameraService` - API service for communicating with the backend
- Updated `CartDrawer` - Includes photo capture in checkout flow

## Usage Flow

1. **Customer adds items to cart** and clicks "Checkout & Photo"
2. **Camera dialog opens** showing Raspberry Pi camera status
3. **If Pi camera is available:** Uses the physical camera module
4. **If Pi camera is unavailable:** Falls back to web camera
5. **Customer takes photo** and it's saved as a memory
6. **Checkout completes** with photo confirmation

## Features

- **Dual camera support:** Raspberry Pi camera + web camera fallback
- **Real-time status:** Shows if Pi camera is connected
- **Photo preview:** See captured photo before saving
- **Retake option:** Can retake photos if needed
- **Automatic fallback:** Uses web camera if Pi camera isn't available

## Troubleshooting

### Camera not detected:
- Check camera connection and configuration
- Verify `rpicam-still --list-cameras` works
- Ensure the server is running on the Pi

### API connection issues:
- Check if server is running on port 3001
- Verify CORS settings allow your frontend domain
- Check firewall settings

### Photo capture fails:
- Ensure `photos/` directory exists and is writable
- Check camera permissions
- Verify `rpicam-still` command works manually

## Development Notes

- The server runs on port 3001 to avoid conflicts with your Vite dev server (port 8080)
- Photos are saved locally in the `photos/` directory
- The API provides both local file paths and web URLs for photos
- The frontend converts captured photos to base64 for easy handling

## Production Deployment

For production, consider:
- Using a reverse proxy (nginx) to serve photos
- Implementing proper authentication
- Adding photo compression and optimization
- Setting up automatic cleanup of old photos
- Using a proper database to track photos

## Security Considerations

- The current setup is for development/demo purposes
- In production, add proper authentication and authorization
- Validate file uploads and implement size limits
- Consider using HTTPS for the API endpoints

## Quick Start Commands

```bash
# 1. Install dependencies
npm install express cors

# 2. Start the camera server
node server.js

# 3. In another terminal, start your React app
npm run dev

# 4. Test the camera
curl http://localhost:3001/api/camera/status
```

## File Structure

```
your-project/
├── server.js                 # Camera API server
├── server-package.json       # Server dependencies
├── photos/                   # Captured photos directory
├── src/
│   ├── components/ui/
│   │   ├── raspberry-pi-camera.tsx  # Camera component
│   │   └── cart-drawer.tsx          # Updated cart with photo
│   └── services/
│       └── cameraService.ts         # API service
└── CAMERA_SETUP.md          # This file
```

## Support

If you encounter issues:
1. Check the camera configuration steps
2. Verify the server is running and accessible
3. Test the camera commands manually
4. Check browser console for errors
5. Ensure all dependencies are installed
