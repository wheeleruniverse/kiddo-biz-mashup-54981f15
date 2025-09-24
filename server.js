import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/photos', express.static(path.join(__dirname, 'photos')));

// Ensure photos directory exists
const photosDir = path.join(__dirname, 'photos');
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Raspberry Pi Camera API is running' });
});

// Check if camera is available
app.get('/api/camera/status', (req, res) => {
  exec('rpicam-still --list-cameras', (error, stdout, stderr) => {
    if (error) {
      console.error('Camera check error:', error);
      return res.status(500).json({ 
        available: false, 
        error: 'Camera not detected or rpicam-still not available' 
      });
    }
    
    res.json({ 
      available: true, 
      message: 'Camera is available',
      output: stdout 
    });
  });
});

// Capture photo
app.post('/api/camera/capture', (req, res) => {
  const { filename } = req.body;
  const photoPath = path.join(photosDir, filename || `photo_${Date.now()}.jpg`);
  
  // Use rpicam-still to capture photo
  const command = `rpicam-still -o "${photoPath}" --width 1280 --height 720 --timeout 2000`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Photo capture error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to capture photo',
        details: error.message 
      });
    }
    
    // Check if file was created
    if (fs.existsSync(photoPath)) {
      const photoUrl = `/photos/${path.basename(photoPath)}`;
      res.json({ 
        success: true, 
        message: 'Photo captured successfully',
        photoUrl,
        localPath: photoPath
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Photo file was not created' 
      });
    }
  });
});

// Start preview (for testing)
app.post('/api/camera/preview', (req, res) => {
  const { duration = 5000 } = req.body;
  
  exec(`rpicam-still -t ${duration}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Preview error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to start preview',
        details: error.message 
      });
    }
    
    res.json({ 
      success: true, 
      message: `Preview started for ${duration}ms` 
    });
  });
});

// List captured photos
app.get('/api/photos', (req, res) => {
  fs.readdir(photosDir, (err, files) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to read photos directory' 
      });
    }
    
    const photos = files
      .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
      .map(file => ({
        filename: file,
        url: `/photos/${file}`,
        path: path.join(photosDir, file)
      }));
    
    res.json({ 
      success: true, 
      photos 
    });
  });
});

app.listen(PORT, () => {
  console.log(`📸 Raspberry Pi Camera API running on port ${PORT}`);
  console.log(`📸 Photos will be saved to: ${photosDir}`);
  console.log(`🌐 Access photos at: http://localhost:${PORT}/photos/`);
});
