const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const helmet = require('helmet');
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://unpkg.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://plus.unsplash.com", "*"],
            connectSrc: ["'self'"],
        },
    },
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(mongoSanitize());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.locals.admin = req.session.admin || null;
    next();
});

const indexRoutes = require('./routes/index');
const herbRoutes = require('./routes/herbs');
const treatmentRoutes = require('./routes/treatments');
const adminRoutes = require('./routes/admin');
const remedyRoutes = require('./routes/remedies');

app.use('/', indexRoutes);
app.use('/herbs', herbRoutes);
app.use('/treatments', treatmentRoutes);
app.use('/remedies', remedyRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).render('error/404', { title: '404 - Page Not Found', path: req.path });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});