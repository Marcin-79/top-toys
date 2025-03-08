const mockToys = [
    {
        id: 1,
        name: "LEGO Star Wars Millennium Falcon",
        description: "Ultimate Collector Series building set with 7541 pieces, perfect for Star Wars fans aged 16+",
        price: "£734.99",
        rating: 4.9,
        reviewCount: 2847,
        salesRank: 1,
        ageGroup: "16+",
        category: "Building Sets",
        brand: "LEGO",
        image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B075SDMMMV",
        pros: ["Highly detailed", "Collector's item", "Great display piece"],
        cons: ["Premium price", "Large storage space needed"]
    },
    {
        id: 2,
        name: "Barbie Dreamhouse",
        description: "3-story dollhouse with 8 rooms, furniture, pool and working elevator",
        price: "£309.99",
        rating: 4.7,
        reviewCount: 1523,
        salesRank: 2,
        ageGroup: "3-7",
        category: "Dolls",
        brand: "Barbie",
        image: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B07BFRS1L9",
        pros: ["Interactive features", "Large play space", "Durable"],
        cons: ["Assembly required", "Large footprint"]
    },
    {
        id: 3,
        name: "Hot Wheels Mega Garage",
        description: "Multi-level car park playset with working elevator and car wash",
        price: "£89.99",
        rating: 4.6,
        reviewCount: 982,
        salesRank: 3,
        ageGroup: "5-12",
        category: "Vehicles",
        brand: "Hot Wheels",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B08HRVC91L",
        pros: ["Multiple play features", "Stores many cars", "Good value"],
        cons: ["Some plastic parts", "Needs assembly"]
    },
    {
        id: 4,
        name: "Nintendo Switch OLED",
        description: "Latest Nintendo gaming console with 7-inch OLED screen",
        price: "£309.99",
        rating: 4.8,
        reviewCount: 3421,
        salesRank: 4,
        ageGroup: "6-8",
        category: "Gaming",
        brand: "Nintendo",
        image: "https://m.media-amazon.com/images/I/619BkvKW35L._AC_SL1500_.jpg",
        amazonLink: "https://www.amazon.co.uk/dp/B098RJXBTY",
        pros: ["OLED screen", "Better stand", "Improved audio"],
        cons: ["Premium price", "No 4K output"]
    },
    {
        id: 5,
        name: "Playmobil City Life Hospital",
        description: "Large hospital playset with medical equipment and figures",
        price: "£89.99",
        rating: 4.7,
        reviewCount: 892,
        salesRank: 5,
        ageGroup: "3-7",
        category: "Playsets",
        brand: "Playmobil",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B08175GV77",
        pros: ["Detailed set", "Educational value", "Durable"],
        cons: ["Many small parts", "Assembly required"]
    },
    {
        id: 6,
        name: "Melissa & Doug Wooden Kitchen",
        description: "Charming wooden play kitchen with realistic features",
        price: "£159.99",
        rating: 4.8,
        reviewCount: 1245,
        salesRank: 6,
        ageGroup: "3-7",
        category: "Pretend Play",
        brand: "Melissa & Doug",
        image: "https://images.unsplash.com/photo-1545997281-2cfe4d4b740f?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B002VD7XS6",
        pros: ["High quality", "Realistic design", "Durable wood construction"],
        cons: ["Assembly required", "Takes up space"]
    },
    {
        id: 7,
        name: "LEGO Technic Bugatti Chiron",
        description: "Advanced building set of the iconic supercar",
        price: "£329.99",
        rating: 4.9,
        reviewCount: 2156,
        salesRank: 7,
        ageGroup: "16+",
        category: "Building Sets",
        brand: "LEGO",
        image: "https://images.unsplash.com/photo-1697600896879-1c7b1d013adb?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B0792RB3B6",
        pros: ["Incredibly detailed", "Working mechanics", "Display piece"],
        cons: ["Complex build", "Premium price"]
    },
    {
        id: 8,
        name: "Monopoly Ultimate Banking",
        description: "Electronic banking version of the classic board game",
        price: "£29.99",
        rating: 4.5,
        reviewCount: 1876,
        salesRank: 8,
        ageGroup: "9-12",
        category: "Board Games",
        brand: "Hasbro",
        image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B01MF9W8JG",
        pros: ["Electronic banking", "Faster gameplay", "Modern update"],
        cons: ["Requires batteries", "Different from classic"]
    },
    {
        id: 9,
        name: "VTech Kidizoom Creator Cam",
        description: "Digital camera for kids with green screen effects",
        price: "£59.99",
        rating: 4.6,
        reviewCount: 892,
        salesRank: 9,
        ageGroup: "6-8",
        category: "Electronics",
        brand: "VTech",
        image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B08BLTDQST",
        pros: ["Creative effects", "Durable design", "Easy to use"],
        cons: ["Limited storage", "Basic quality"]
    },
    {
        id: 10,
        name: "Razor A5 Lux Scooter",
        description: "Premium kick scooter with large wheels",
        price: "£119.99",
        rating: 4.7,
        reviewCount: 1543,
        salesRank: 10,
        ageGroup: "9-12",
        category: "Outdoor",
        brand: "Razor",
        image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800",
        amazonLink: "https://www.amazon.co.uk/dp/B01MYFM9NS",
        pros: ["Smooth ride", "Durable build", "Foldable design"],
        cons: ["Heavier than basic models", "Premium price"]
    }
];

// Helper function to filter toys
const filterToys = (ageGroup = 'all', priceRange = 'all', brand = 'all', category = 'all') => {
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
};

module.exports = { mockToys, filterToys }; 