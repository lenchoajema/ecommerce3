const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const customerRoutes = require('./routes/customerRoutes');

// Import routes
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('E-commerce Backend Running');
});

// Connect to MongoDB
const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
   /*await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); */ 
    console.log('Connected to MongoDB');
    app.listen(process.env.port || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

startServer();
