const express = require('express');
require('dotenv').config();
const NodeCache = require('node-cache');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const winston = require('winston');
const { mockToys, filterToys } = require('./mockData');
const amazonService = require('./services/amazonApi');

const app = express();
const port = 3000;

const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            connectSrc: ["'self'", "http://localhost:3000"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com' 
        : 'http://localhost:3000',
    methods: ['GET'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Move the static files middleware before other middleware
app.use(express.static('.'));

// Update the request validation middleware
const validateRequest = (req, res, next) => {
    // Skip validation for non-API routes
    if (!req.path.startsWith('/api/')) {
        return next();
    }
    
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Apply validation middleware
app.use(validateRequest);

app.use(compression());

app.get('/api/toys', async (req, res) => {
    try {
        const { ageGroup, priceRange, brand, category, sortBy } = req.query;
        
        // Check cache first
        const cacheKey = `toys-${JSON.stringify(req.query)}`;
        const cachedData = cache.get(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        // Fetch from Amazon API
        const products = await amazonService.searchToys({
            ageGroup,
            priceRange,
            brand,
            category,
            sortBy
        });

        const response = {
            data: products,
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: products.length
            }
        };

        // Store in cache (1 hour)
        cache.set(cacheKey, response, 3600);

        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch products',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Track API usage
let apiCallCount = 0;
const API_LIMIT = 1000; // Example daily limit

function trackApiUsage(req, res, next) {
    apiCallCount++;
    if (apiCallCount > API_LIMIT) {
        return res.status(429).json({ error: 'API limit exceeded' });
    }
    next();
}

app.use('/api/', trackApiUsage);

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Amazon PA-API has strict rate limits
const amazonRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 8, // PA-API allows ~8-10 requests per second
    message: 'Too many requests to Amazon API, please try again later'
});

app.use('/api/toys', amazonRateLimit);

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Add monitoring
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info({
            method: req.method,
            path: req.path,
            duration,
            status: res.statusCode
        });
    });
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Add specific Amazon API error handling
app.use((error, req, res, next) => {
    if (error.name === 'ProductAdvertisingAPIError') {
        logger.error('Amazon API Error:', {
            code: error.code,
            message: error.message,
            requestId: error.requestId
        });
        
        return res.status(503).json({
            error: 'Amazon service temporarily unavailable',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
    next(error);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 