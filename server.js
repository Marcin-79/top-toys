const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { mockToys } = require('./mockData');

const app = express();
const port = process.env.PORT || 3000;

// Basic CORS setup
app.use(cors());

// Serve static files
app.use(express.static('.'));

// Simple API endpoint for toys
app.get('/api/toys', (req, res) => {
    try {
        const { ageGroup, priceRange, brand, category, sortBy, search } = req.query;
        
        // Filter toys
        let filteredToys = mockToys.filter(toy => {
            const matchesAge = ageGroup === 'all' || toy.ageGroup === ageGroup;
            const matchesBrand = brand === 'all' || toy.brand.toLowerCase() === brand.toLowerCase();
            const matchesCategory = category === 'all' || toy.category.toLowerCase() === category.toLowerCase();
            
            // Search filter
            const matchesSearch = !search || 
                toy.name.toLowerCase().includes(search.toLowerCase()) ||
                toy.description.toLowerCase().includes(search.toLowerCase());
            
            if (priceRange !== 'all') {
                const price = parseFloat(toy.price.replace('£', ''));
                switch(priceRange) {
                    case '0-20': return price <= 20 && matchesAge && matchesBrand && matchesCategory && matchesSearch;
                    case '20-50': return price > 20 && price <= 50 && matchesAge && matchesBrand && matchesCategory && matchesSearch;
                    case '50-100': return price > 50 && price <= 100 && matchesAge && matchesBrand && matchesCategory && matchesSearch;
                    case '100+': return price > 100 && matchesAge && matchesBrand && matchesCategory && matchesSearch;
                    default: return matchesAge && matchesBrand && matchesCategory && matchesSearch;
                }
            }
            
            return matchesAge && matchesBrand && matchesCategory && matchesSearch;
        });

        // Sort toys
        if (sortBy) {
            switch(sortBy) {
                case 'price-low':
                    filteredToys.sort((a, b) => 
                        parseFloat(a.price.replace('£', '')) - parseFloat(b.price.replace('£', '')));
                    break;
                case 'price-high':
                    filteredToys.sort((a, b) => 
                        parseFloat(b.price.replace('£', '')) - parseFloat(a.price.replace('£', '')));
                    break;
                case 'rating':
                    filteredToys.sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    filteredToys.sort((a, b) => b.id - a.id);
                    break;
                default:
                    filteredToys.sort((a, b) => a.salesRank - b.salesRank);
            }
        }

        res.json({
            data: filteredToys,
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: filteredToys.length
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 