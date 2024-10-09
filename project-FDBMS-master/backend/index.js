const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const upload = require('./config/multerConfig'); // Import the Multer configuration

dotenv.config();

const router = require('./routes/Admin');
const FacultyRoutes = require('./routes/Faculty');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (for serving uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));

console.log('Exporting upload:', upload);

// Routes
app.use(router);
app.use('/api/', FacultyRoutes);



// Database connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((con) => {
    console.log(`MongoDB Connected to host: ` + con.connection.host);
}).catch(err => {
    console.error('MongoDB connection error:', err.message);
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on the port ${process.env.PORT}`);
});

module.exports = upload; // Export upload for use in routes
