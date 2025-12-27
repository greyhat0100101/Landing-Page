// Express server for Modern Futuristic Platform with visitor tracking
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const geoip = require('geoip-lite');
const { UAParser } = require('ua-parser-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Visitor Log Schema
const visitorLogSchema = new mongoose.Schema({
  ip: String,
  country: String,
  city: String,
  device: String,
  browser: String,
  os: String,
  timestamp: { type: Date, default: Date.now }
});

const VisitorLog = mongoose.model('VisitorLog', visitorLogSchema, 'visitoLogs');

// Middleware to get client IP
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         '127.0.0.1';
}

// Endpoint to log visitor
app.post('/api/log-visitor', async (req, res) => {
  try {
    const ip = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    
    // Parse user agent
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    
    // Get geolocation
    const geo = geoip.lookup(ip);
    
    // Create log entry
    const visitorLog = new VisitorLog({
      ip: ip,
      country: geo?.country || 'Unknown',
      city: geo?.city || 'Unknown',
      device: result.device.type || 'desktop',
      browser: result.browser.name || 'Unknown',
      os: result.os.name || 'Unknown'
    });
    
    await visitorLog.save();
    res.json({ 
      success: true, 
      message: 'Visitor logged successfully',
      data: {
        country: visitorLog.country,
        device: visitorLog.device
      }
    });
  } catch (error) {
    console.error('Error logging visitor:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to get visitor stats
app.get('/api/visitor-stats', async (req, res) => {
  try {
    const visitors = await VisitorLog.find({}).sort({ timestamp: -1 }).lean();
    res.json(visitors);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static assets
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});