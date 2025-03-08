const { mockToys } = require('../mockData');

class AmazonService {
    constructor() {
        // We'll initialize the real API later
        this.api = null;
    }

    async searchToys({ 
        ageGroup = 'all',
        priceRange = 'all',
        brand = 'all',
        category = 'all',
        sortBy = 'popularity',
        search = ''
    }) {
        try {
            // Get filtered toys
            let filteredToys = this.filterToys(ageGroup, priceRange, brand, category);
            
            // Apply search filter if provided
            if (search) {
                const searchLower = search.toLowerCase();
                filteredToys = filteredToys.filter(toy => 
                    toy.name.toLowerCase().includes(searchLower) ||
                    toy.description.toLowerCase().includes(searchLower) ||
                    toy.brand.toLowerCase().includes(searchLower)
                );
            }

            // Apply sorting
            return this.sortToys(filteredToys, sortBy);

        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch products');
        }
    }

    filterToys(ageGroup, priceRange, brand, category) {
        return mockToys.filter(toy => {
            const matchesAge = ageGroup === 'all' || toy.ageGroup === ageGroup;
            const matchesBrand = brand === 'all' || toy.brand.toLowerCase() === brand.toLowerCase();
            const matchesCategory = category === 'all' || toy.category.toLowerCase() === category.toLowerCase();
            
            if (priceRange !== 'all') {
                const price = parseFloat(toy.price.replace('£', ''));
                switch(priceRange) {
                    case '0-20': return price <= 20 && matchesAge && matchesBrand && matchesCategory;
                    case '20-50': return price > 20 && price <= 50 && matchesAge && matchesBrand && matchesCategory;
                    case '50-100': return price > 50 && price <= 100 && matchesAge && matchesBrand && matchesCategory;
                    case '100+': return price > 100 && matchesAge && matchesBrand && matchesCategory;
                }
            }
            
            return matchesAge && matchesBrand && matchesCategory;
        });
    }

    sortToys(toys, sortBy) {
        const toysList = [...toys];
        
        switch(sortBy) {
            case 'price-low':
                toysList.sort((a, b) => 
                    parseFloat(a.price.replace('£', '')) - parseFloat(b.price.replace('£', '')));
                break;
            case 'price-high':
                toysList.sort((a, b) => 
                    parseFloat(b.price.replace('£', '')) - parseFloat(a.price.replace('£', '')));
                break;
            case 'rating':
                toysList.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                toysList.sort((a, b) => b.id - a.id);
                break;
            default: // popularity
                toysList.sort((a, b) => a.salesRank - b.salesRank);
        }

        return toysList;
    }

    // We'll add these methods when we implement the real Amazon API
    buildSearchKeywords(category, brand, ageGroup) {
        const keywords = ['toys'];
        if (brand !== 'all') keywords.push(brand);
        if (category !== 'all') keywords.push(category);
        if (ageGroup !== 'all') keywords.push(`age ${ageGroup}`);
        return keywords.join(' ');
    }

    convertSortOption(sortBy) {
        const sortMap = {
            'popularity': 'Featured',
            'price-low': 'Price:LowToHigh',
            'price-high': 'Price:HighToLow',
            'rating': 'AvgCustomerReviews',
            'newest': 'NewestArrivals'
        };
        return sortMap[sortBy] || 'Featured';
    }
}

module.exports = new AmazonService(); 