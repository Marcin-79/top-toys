const { mockToys } = require('../mockData');

exports.handler = async (event) => {
    try {
        const params = new URLSearchParams(event.queryStringParameters);
        const ageGroup = params.get('ageGroup') || 'all';
        const priceRange = params.get('priceRange') || 'all';
        const brand = params.get('brand') || 'all';
        const category = params.get('category') || 'all';
        const sortBy = params.get('sortBy') || 'popularity';
        
        // Filter and sort toys
        let filteredToys = mockToys.filter(toy => {
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

        // Sort toys
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

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                data: filteredToys,
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: filteredToys.length
                }
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch products' })
        };
    }
}; 