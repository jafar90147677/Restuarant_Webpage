// Restaurant Menu Data - Eat Well😋
// Import logging system
if (typeof RestaurantLogger !== 'undefined') {
    window.restaurantLogger = new RestaurantLogger();
}

const menuData = {
    starters: [
        {
            id: 1,
            name: "Paneer Tikka",
            description: "Grilled cottage cheese marinated in spices and yogurt",
            price: 180,
            icon: "🧀"
        },
        {
            id: 2,
            name: "Chicken Tikka",
            description: "Tender chicken pieces marinated in aromatic spices",
            price: 220,
            icon: "🍗"
        },
        {
            id: 3,
            name: "Samosa",
            description: "Crispy fried pastry filled with spiced potatoes",
            price: 25,
            icon: "🥟"
        },
        {
            id: 4,
            name: "Fish Fry",
            description: "Fresh fish marinated in spices and deep fried",
            price: 200,
            icon: "🐟"
        },
        {
            id: 5,
            name: "Veg Manchurian",
            description: "Fried vegetable balls in tangy Manchurian sauce",
            price: 120,
            icon: "🥬"
        },
        {
            id: 42,
            name: "Chicken 65",
            description: "Spicy deep-fried chicken with curry leaves and spices",
            price: 190,
            icon: "🌶️"
        },
        {
            id: 43,
            name: "Mutton Seekh Kebab",
            description: "Minced mutton skewers grilled to perfection",
            price: 250,
            icon: "🍖"
        },
        {
            id: 44,
            name: "Aloo Tikki",
            description: "Spiced potato patties served with chutney",
            price: 60,
            icon: "🥔"
        },
        {
            id: 45,
            name: "Chicken Wings",
            description: "Crispy chicken wings with spicy marinade",
            price: 180,
            icon: "🍗"
        },
        {
            id: 46,
            name: "Onion Rings",
            description: "Crispy golden onion rings with dipping sauce",
            price: 80,
            icon: "🧅"
        },
        {
            id: 47,
            name: "Chicken Spring Rolls",
            description: "Crispy rolls filled with spiced chicken and vegetables",
            price: 140,
            icon: "🌯"
        },
        {
            id: 48,
            name: "Paneer Chilli",
            description: "Crispy paneer cubes in spicy chilli sauce",
            price: 160,
            icon: "🌶️"
        }
    ],
    veg: [
        {
            id: 6,
            name: "Dal Makhani",
            description: "Creamy black lentils cooked with butter and cream",
            price: 150,
            icon: "🫘"
        },
        {
            id: 7,
            name: "Paneer Butter Masala",
            description: "Cottage cheese in rich tomato and cream gravy",
            price: 180,
            icon: "🧀"
        },
        {
            id: 8,
            name: "Chana Masala",
            description: "Spiced chickpeas cooked with onions and tomatoes",
            price: 120,
            icon: "🫘"
        },
        {
            id: 9,
            name: "Aloo Gobi",
            description: "Potatoes and cauliflower cooked with Indian spices",
            price: 130,
            icon: "🥔"
        },
        {
            id: 10,
            name: "Rajma Curry",
            description: "Red kidney beans in spicy tomato gravy",
            price: 140,
            icon: "🫘"
        },
        {
            id: 11,
            name: "Biryani Rice",
            description: "Fragrant basmati rice with aromatic spices",
            price: 100,
            icon: "🍚"
        },
        {
            id: 49,
            name: "Palak Paneer",
            description: "Cottage cheese in creamy spinach gravy",
            price: 170,
            icon: "🥬"
        },
        {
            id: 50,
            name: "Mushroom Masala",
            description: "Fresh mushrooms in spicy onion-tomato gravy",
            price: 160,
            icon: "🍄"
        },
        {
            id: 51,
            name: "Baingan Bharta",
            description: "Smoky roasted eggplant with spices",
            price: 140,
            icon: "🍆"
        },
        {
            id: 52,
            name: "Jeera Rice",
            description: "Fragrant basmati rice with cumin seeds",
            price: 80,
            icon: "🍚"
        },
        {
            id: 53,
            name: "Veg Biryani",
            description: "Aromatic rice with mixed vegetables and spices",
            price: 160,
            icon: "🍚"
        },
        {
            id: 54,
            name: "Kadai Paneer",
            description: "Cottage cheese in spicy kadai masala",
            price: 190,
            icon: "🧀"
        },
        {
            id: 55,
            name: "Dal Tadka",
            description: "Tempered yellow lentils with spices",
            price: 110,
            icon: "🫘"
        },
        {
            id: 56,
            name: "Mix Veg Curry",
            description: "Mixed vegetables in creamy tomato gravy",
            price: 130,
            icon: "🥕"
        }
    ],
    nonveg: [
        {
            id: 12,
            name: "Chicken Curry",
            description: "Tender chicken in rich onion and tomato gravy",
            price: 220,
            icon: "🍗"
        },
        {
            id: 13,
            name: "Mutton Biryani",
            description: "Fragrant rice with tender mutton and spices",
            price: 280,
            icon: "🍖"
        },
        {
            id: 14,
            name: "Fish Curry",
            description: "Fresh fish in coconut and tamarind gravy",
            price: 250,
            icon: "🐟"
        },
        {
            id: 15,
            name: "Chicken Biryani",
            description: "Aromatic basmati rice with spiced chicken",
            price: 200,
            icon: "🍗"
        },
        {
            id: 16,
            name: "Egg Curry",
            description: "Hard-boiled eggs in spicy onion-tomato gravy",
            price: 120,
            icon: "🥚"
        },
        {
            id: 17,
            name: "Prawn Curry",
            description: "Fresh prawns in coconut milk and spices",
            price: 300,
            icon: "🦐"
        },
        {
            id: 57,
            name: "Butter Chicken",
            description: "Tender chicken in rich tomato and cream sauce",
            price: 240,
            icon: "🍗"
        },
        {
            id: 58,
            name: "Mutton Rogan Josh",
            description: "Aromatic mutton curry with Kashmiri spices",
            price: 320,
            icon: "🍖"
        },
        {
            id: 59,
            name: "Chicken Tikka Masala",
            description: "Grilled chicken in creamy tomato sauce",
            price: 230,
            icon: "🍗"
        },
        {
            id: 60,
            name: "Fish Biryani",
            description: "Fragrant rice with spiced fish and herbs",
            price: 260,
            icon: "🐟"
        },
        {
            id: 61,
            name: "Chicken Korma",
            description: "Mild chicken curry with cashew and cream",
            price: 250,
            icon: "🍗"
        },
        {
            id: 62,
            name: "Mutton Keema",
            description: "Spiced minced mutton with peas",
            price: 200,
            icon: "🍖"
        },
        {
            id: 63,
            name: "Chicken Chettinad",
            description: "Spicy South Indian chicken curry",
            price: 220,
            icon: "🍗"
        },
        {
            id: 64,
            name: "Crab Masala",
            description: "Fresh crab in spicy masala gravy",
            price: 350,
            icon: "🦀"
        }
    ],
    snacks: [
        {
            id: 18,
            name: "Vada Pav",
            description: "Spicy potato fritter in soft bread bun",
            price: 35,
            icon: "🍞"
        },
        {
            id: 19,
            name: "Pav Bhaji",
            description: "Spiced vegetable curry with buttered bread",
            price: 80,
            icon: "🍞"
        },
        {
            id: 20,
            name: "Dosa",
            description: "Crispy rice crepe with potato filling",
            price: 60,
            icon: "🥞"
        },
        {
            id: 21,
            name: "Idli Sambar",
            description: "Steamed rice cakes with lentil curry",
            price: 50,
            icon: "🥞"
        },
        {
            id: 22,
            name: "Pakora",
            description: "Mixed vegetable fritters with mint chutney",
            price: 40,
            icon: "🥬"
        },
        {
            id: 23,
            name: "Chicken Lollipop",
            description: "Spicy chicken wings with tangy sauce",
            price: 150,
            icon: "🍗"
        },
        {
            id: 65,
            name: "Masala Dosa",
            description: "Crispy dosa with spiced potato filling",
            price: 80,
            icon: "🥞"
        },
        {
            id: 66,
            name: "Uttapam",
            description: "Thick rice pancake with vegetables",
            price: 70,
            icon: "🥞"
        },
        {
            id: 67,
            name: "Medu Vada",
            description: "Crispy lentil fritters with sambar",
            price: 45,
            icon: "🥯"
        },
        {
            id: 68,
            name: "Chicken Momos",
            description: "Steamed chicken dumplings with spicy sauce",
            price: 120,
            icon: "🥟"
        },
        {
            id: 69,
            name: "Veg Momos",
            description: "Steamed vegetable dumplings with chutney",
            price: 100,
            icon: "🥟"
        },
        {
            id: 70,
            name: "Chicken Burger",
            description: "Grilled chicken patty with fresh vegetables",
            price: 140,
            icon: "🍔"
        },
        {
            id: 71,
            name: "Veg Burger",
            description: "Vegetable patty with cheese and sauce",
            price: 110,
            icon: "🍔"
        },
        {
            id: 72,
            name: "Chicken Sandwich",
            description: "Grilled chicken with mayo and vegetables",
            price: 90,
            icon: "🥪"
        }
    ],
    cooldrinks: [
        {
            id: 24,
            name: "Lassi",
            description: "Sweet yogurt drink with cardamom",
            price: 60,
            icon: "🥛"
        },
        {
            id: 25,
            name: "Nimbu Pani",
            description: "Fresh lemonade with mint and spices",
            price: 40,
            icon: "🍋"
        },
        {
            id: 26,
            name: "Coca Cola",
            description: "Classic carbonated soft drink",
            price: 30,
            icon: "🥤"
        },
        {
            id: 27,
            name: "Thums Up",
            description: "Strong cola drink",
            price: 30,
            icon: "🥤"
        },
        {
            id: 28,
            name: "Sprite",
            description: "Lemon-lime carbonated drink",
            price: 30,
            icon: "🥤"
        },
        {
            id: 29,
            name: "Fresh Juice",
            description: "Seasonal fresh fruit juice",
            price: 80,
            icon: "🍹"
        },
        {
            id: 73,
            name: "Mango Lassi",
            description: "Sweet mango yogurt drink",
            price: 70,
            icon: "🥭"
        },
        {
            id: 74,
            name: "Rose Lassi",
            description: "Creamy yogurt drink with rose flavor",
            price: 65,
            icon: "🌹"
        },
        {
            id: 75,
            name: "Pepsi",
            description: "Refreshing cola drink",
            price: 30,
            icon: "🥤"
        },
        {
            id: 76,
            name: "Fanta",
            description: "Orange flavored carbonated drink",
            price: 30,
            icon: "🥤"
        },
        {
            id: 77,
            name: "Mint Lemonade",
            description: "Fresh mint and lemon drink",
            price: 45,
            icon: "🍋"
        },
        {
            id: 78,
            name: "Coconut Water",
            description: "Fresh tender coconut water",
            price: 50,
            icon: "🥥"
        },
        {
            id: 79,
            name: "Jaljeera",
            description: "Spiced cumin water drink",
            price: 35,
            icon: "🧊"
        },
        {
            id: 80,
            name: "Aam Panna",
            description: "Raw mango drink with spices",
            price: 55,
            icon: "🥭"
        }
    ],
    milkshakes: [
        {
            id: 30,
            name: "Mango Shake",
            description: "Creamy mango milkshake with ice cream",
            price: 120,
            icon: "🥭"
        },
        {
            id: 31,
            name: "Chocolate Shake",
            description: "Rich chocolate milkshake with whipped cream",
            price: 100,
            icon: "🍫"
        },
        {
            id: 32,
            name: "Strawberry Shake",
            description: "Fresh strawberry milkshake",
            price: 110,
            icon: "🍓"
        },
        {
            id: 33,
            name: "Vanilla Shake",
            description: "Classic vanilla milkshake",
            price: 90,
            icon: "🍦"
        },
        {
            id: 34,
            name: "Banana Shake",
            description: "Creamy banana milkshake",
            price: 80,
            icon: "🍌"
        },
        {
            id: 35,
            name: "Oreo Shake",
            description: "Milkshake with crushed Oreo cookies",
            price: 130,
            icon: "🍪"
        },
        {
            id: 81,
            name: "Pista Shake",
            description: "Creamy pistachio milkshake",
            price: 140,
            icon: "🥜"
        },
        {
            id: 82,
            name: "Rose Shake",
            description: "Delicate rose flavored milkshake",
            price: 110,
            icon: "🌹"
        },
        {
            id: 83,
            name: "KitKat Shake",
            description: "Milkshake with crushed KitKat bars",
            price: 135,
            icon: "🍫"
        },
        {
            id: 84,
            name: "Butterscotch Shake",
            description: "Rich butterscotch flavored milkshake",
            price: 125,
            icon: "🍯"
        },
        {
            id: 85,
            name: "Coffee Shake",
            description: "Creamy coffee flavored milkshake",
            price: 115,
            icon: "☕"
        },
        {
            id: 86,
            name: "Kesar Shake",
            description: "Saffron flavored premium milkshake",
            price: 150,
            icon: "🌺"
        },
        {
            id: 87,
            name: "Chikoo Shake",
            description: "Sweet chikoo fruit milkshake",
            price: 95,
            icon: "🍈"
        },
        {
            id: 88,
            name: "Dry Fruit Shake",
            description: "Milkshake with mixed dry fruits",
            price: 160,
            icon: "🥜"
        }
    ],
    icecreams: [
        {
            id: 36,
            name: "Kulfi",
            description: "Traditional Indian ice cream with pistachios",
            price: 60,
            icon: "🍦"
        },
        {
            id: 37,
            name: "Falooda",
            description: "Vermicelli dessert with ice cream and rose syrup",
            price: 100,
            icon: "🍧"
        },
        {
            id: 38,
            name: "Chocolate Ice Cream",
            description: "Rich chocolate ice cream",
            price: 50,
            icon: "🍫"
        },
        {
            id: 39,
            name: "Vanilla Ice Cream",
            description: "Classic vanilla ice cream",
            price: 45,
            icon: "🍦"
        },
        {
            id: 40,
            name: "Strawberry Ice Cream",
            description: "Fresh strawberry ice cream",
            price: 50,
            icon: "🍓"
        },
        {
            id: 41,
            name: "Butterscotch Ice Cream",
            description: "Creamy butterscotch flavored ice cream",
            price: 55,
            icon: "🍯"
        },
        {
            id: 89,
            name: "Mango Ice Cream",
            description: "Creamy mango flavored ice cream",
            price: 55,
            icon: "🥭"
        },
        {
            id: 90,
            name: "Pista Ice Cream",
            description: "Pistachio flavored premium ice cream",
            price: 65,
            icon: "🥜"
        },
        {
            id: 91,
            name: "Rose Ice Cream",
            description: "Delicate rose flavored ice cream",
            price: 60,
            icon: "🌹"
        },
        {
            id: 92,
            name: "Kesar Pista Ice Cream",
            description: "Saffron and pistachio ice cream",
            price: 70,
            icon: "🌺"
        },
        {
            id: 93,
            name: "Tutti Frutti Ice Cream",
            description: "Mixed fruit flavored ice cream",
            price: 50,
            icon: "🍒"
        },
        {
            id: 94,
            name: "Black Currant Ice Cream",
            description: "Rich black currant flavored ice cream",
            price: 55,
            icon: "🫐"
        },
        {
            id: 95,
            name: "Cookies & Cream Ice Cream",
            description: "Ice cream with cookie pieces",
            price: 60,
            icon: "🍪"
        },
        {
            id: 96,
            name: "Choco Chip Ice Cream",
            description: "Vanilla ice cream with chocolate chips",
            price: 55,
            icon: "🍫"
        }
    ]
};

// Global variables
let cart = [];
let currentCategory = 'all';
let currentFilter = 'all';
let currentSort = 'default';
let searchQuery = '';
let allMenuItems = [];
let filteredItems = [];

// Cart configuration constants
const MAX_CART_ITEMS = 15; // Increased from 10 to 15 for better user experience
const MAX_ITEM_QUANTITY = 10; // Maximum quantity per individual item
const CART_WARNING_THRESHOLD = 12; // Show warning when approaching limit

// Transaction tracking variables
let currentCartTransactionId = null;
let currentOrderTransactionId = null;
let currentSearchTransactionId = null;

// Currency formatting helper
function formatCurrency(amount) {
    return `₹${Number(amount).toFixed(2)}`;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Log page initialization
    if (window.restaurantLogger) {
        window.restaurantLogger.log('INFO', 'PAGE_INIT', 'Page initialization started', {
            timestamp: Date.now(),
            url: window.location.href
        });
    }
    
    // Initialize menu data first
    initializeMenuData();
    console.log('Menu data initialized, items:', allMenuItems.length);
    
    // Setup event listeners
    setupEventListeners();
    
    // Render initial menu
    renderMenu();
    console.log('Initial menu rendered');
    
    // Setup other features
    updateCartDisplay();

    // INTENTIONAL WARNING: Simulate slow page load warning
    const loadTime = performance.now();
    if (loadTime > 2000) {
        if (window.restaurantLogger) {
            window.restaurantLogger.log('WARN', 'PERFORMANCE', 'Slow page load detected', {
                loadTime: loadTime,
                threshold: 2000,
                timestamp: Date.now()
            });
        }
    }

    // INTENTIONAL ERROR: Simulate memory usage warning
    if (allMenuItems.length > 50) {
        if (window.restaurantLogger) {
            window.restaurantLogger.log('WARN', 'PERFORMANCE', 'Large menu dataset may impact performance', {
                menuItemsCount: allMenuItems.length,
                recommendation: 'Consider pagination or lazy loading',
                timestamp: Date.now()
            });
        }
    }

    // Log successful initialization
    if (window.restaurantLogger) {
        window.restaurantLogger.log('INFO', 'PAGE_INIT', 'Page initialization completed successfully', {
            menuItemsCount: allMenuItems.length,
            categories: Object.keys(menuData),
            timestamp: Date.now()
        });
    }
    animateStats();
    setupSearchAndFilter();
    
    // Test category buttons
    setTimeout(() => {
        console.log('Menu data categories:', Object.keys(menuData));
        console.log('All menu items count:', allMenuItems.length);
        console.log('Filtered items count:', filteredItems.length);
        
        // Force render if no items
        if (filteredItems.length === 0) {
            console.log('No items found, forcing re-initialization...');
            initializeMenuData();
            renderMenu();
        }
    }, 1000);
});

// Initialize menu data
function initializeMenuData() {
    allMenuItems = [];
    console.log('Initializing menu data...');
    console.log('Menu data object:', menuData);
    
    Object.values(menuData).forEach(category => {
        console.log('Processing category with', category.length, 'items');
        allMenuItems = allMenuItems.concat(category);
    });
    
    filteredItems = [...allMenuItems];
    console.log('Total menu items:', allMenuItems.length);
    console.log('Filtered items:', filteredItems.length);
}

// Setup event listeners
function setupEventListeners() {
    // Category navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    
    if (navButtons.length === 0) {
        console.error('No navigation buttons found!');
        return;
    }
    
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current category
            currentCategory = this.dataset.category;
            // Update menu title
            updateMenuTitle();
            // Re-render menu
            applyFiltersAndRender();
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Log filter selection
            if (window.restaurantLogger) {
                window.restaurantLogger.log('INFO', 'FILTER_SELECTION', 'Filter button clicked', {
                    filter: this.dataset.filter,
                    buttonText: this.textContent.trim(),
                    timestamp: Date.now()
                });
            }

            // Remove active class from all filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current filter
            currentFilter = this.dataset.filter;
            // Re-render menu
            applyFiltersAndRender();
        });
    });
}

// Search debouncing variables
let searchTimeout;
const SEARCH_DEBOUNCE_DELAY = 300; // 300ms delay for search debouncing

// Setup search and filter functionality
function setupSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.querySelector('.clear-search');
    const searchIcon = document.querySelector('.search-bar i.fa-search');

    searchInput.addEventListener('input', function() {
        const inputValue = this.value.trim();
        
        // Start search transaction
        if (currentSearchTransactionId) {
            window.restaurantLogger.completeTransaction(currentSearchTransactionId);
        }
        currentSearchTransactionId = window.restaurantLogger.startTransaction('SEARCH_OPERATION', {
            query: inputValue
        });
        
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Input validation and sanitization
        if (inputValue.length > 100) {
            alert('Search query too long. Please keep it under 100 characters.');
            this.value = inputValue.substring(0, 100);
            return;
        }
        
        // Sanitize input to prevent XSS
        const sanitizedInput = inputValue.replace(/[<>\"'&]/g, function(match) {
            const escapeMap = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return escapeMap[match];
        });
        
        searchQuery = sanitizedInput.toLowerCase();
        clearButton.classList.toggle('show', searchQuery.length > 0);
        
        // INTENTIONAL WARNING: Simulate search performance warning
        if (searchQuery.length > 20) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'SEARCH', 'Very long search query detected', {
                    queryLength: searchQuery.length,
                    query: searchQuery,
                    timestamp: Date.now()
                });
            }
        }

        // INTENTIONAL ERROR: Simulate search service error
        if (searchQuery.includes('error')) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('ERROR', 'SEARCH', 'Search service error triggered', {
                    query: searchQuery,
                    errorCode: 'SEARCH_001',
                    message: 'Search service temporarily unavailable',
                    timestamp: Date.now()
                });
            }
            alert('Search service temporarily unavailable. Please try again.');
            return;
        }
        
        // Debounced search execution
        searchTimeout = setTimeout(() => {
            // Log search input with transaction ID
            if (window.restaurantLogger) {
                window.restaurantLogger.logSearch(searchQuery, [], {}, currentSearchTransactionId);
                window.restaurantLogger.completeTransaction(currentSearchTransactionId, {
                    resultsCount: filteredItems.length,
                    query: searchQuery
                });
                currentSearchTransactionId = null;
            }
            
            applyFiltersAndRender();
        }, SEARCH_DEBOUNCE_DELAY);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchQuery = this.value.toLowerCase();
            applyFiltersAndRender();
        }
    });

    // Treat the search icon as a clickable search button
    if (searchIcon) {
        searchIcon.style.cursor = 'pointer';
        searchIcon.addEventListener('click', function() {
            searchQuery = searchInput.value.toLowerCase();
            applyFiltersAndRender();
        });
    }
}

// Clear search
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchQuery = '';
    document.querySelector('.clear-search').classList.remove('show');
    
    // Complete search transaction if active
    if (currentSearchTransactionId) {
        window.restaurantLogger.completeTransaction(currentSearchTransactionId, {
            action: 'search_cleared',
            query: ''
        });
        currentSearchTransactionId = null;
    }
    
    applyFiltersAndRender();
}

// Update menu title
function updateMenuTitle() {
    const menuTitle = document.getElementById('menuTitle');
    const categoryNames = {
        'all': 'All Menu Items',
        'starters': 'Starters',
        'veg': 'Vegetarian Items',
        'nonveg': 'Non-Vegetarian Items',
        'snacks': 'Snacks',
        'cooldrinks': 'Cool Drinks',
        'milkshakes': 'Milk Shakes',
        'icecreams': 'Ice Creams'
    };
    menuTitle.textContent = categoryNames[currentCategory] || 'Menu Items';
}

// Apply filters and render menu
function applyFiltersAndRender() {
    let items = [];

    // Filter by category - use direct menuData access
    if (currentCategory === 'all') {
        items = [...allMenuItems];
    } else {
        items = menuData[currentCategory] ? [...menuData[currentCategory]] : [];
    }
    
    // Filter by search query
    if (searchQuery) {
        items = items.filter(item => 
            item.name.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery)
        );
    }

    // Apply additional filters
    if (currentFilter !== 'all') {
        items = items.filter(item => {
            switch (currentFilter) {
                case 'popular':
                    return item.price > 150; // Higher priced items as popular
                case 'spicy':
                    return item.name.toLowerCase().includes('spicy') || 
                           item.name.toLowerCase().includes('tikka') ||
                           item.name.toLowerCase().includes('masala') ||
                           item.name.toLowerCase().includes('chilli');
                case 'sweet':
                    return item.name.toLowerCase().includes('sweet') ||
                           item.name.toLowerCase().includes('shake') ||
                           item.name.toLowerCase().includes('ice cream') ||
                           item.name.toLowerCase().includes('kulfi') ||
                           item.name.toLowerCase().includes('lassi');
                default:
                    return true;
            }
        });
    }

    // Sort items
    items = sortItems(items, currentSort);
    
    // Limit results for performance (max 50 items)
    const MAX_SEARCH_RESULTS = 50;
    if (items.length > MAX_SEARCH_RESULTS) {
        items = items.slice(0, MAX_SEARCH_RESULTS);
        
        // Log performance warning
        if (window.restaurantLogger) {
            window.restaurantLogger.log('WARN', 'PERFORMANCE', 'Search results limited for performance', {
                totalResults: items.length,
                maxResults: MAX_SEARCH_RESULTS,
                searchQuery,
                timestamp: Date.now()
            });
        }
    }

    filteredItems = items;
    renderMenu();
}

// Sort items
function sortItems(items, sortType) {
    switch (sortType) {
        case 'price-low':
            return items.sort((a, b) => a.price - b.price);
        case 'price-high':
            return items.sort((a, b) => b.price - a.price);
        case 'name':
            return items.sort((a, b) => a.name.localeCompare(b.name));
        case 'popular':
            return items.sort((a, b) => b.price - a.price); // Higher price as more popular
        default:
            return items;
    }
}

// Sort menu
function sortMenu() {
    const sortSelect = document.getElementById('sortSelect');
    currentSort = sortSelect.value;
    applyFiltersAndRender();
}

// Animate stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target % 1 === 0) {
                stat.textContent = Math.floor(current);
            } else {
                stat.textContent = current.toFixed(1);
            }
        }, 20);
    });
}

// Render menu items
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const noResults = document.getElementById('noResults');
    
    if (!menuGrid) {
        console.error('Menu grid element not found!');
        return;
    }
    
    menuGrid.innerHTML = '';
    console.log('Rendering menu with', filteredItems.length, 'items');

    if (filteredItems.length === 0) {
        if (noResults) {
            noResults.style.display = 'block';
        }
        console.log('No items to display');
        return;
    }

    if (noResults) {
        noResults.style.display = 'none';
    }

    filteredItems.forEach((item, index) => {
        const menuItem = createMenuItem(item);
        menuItem.style.animationDelay = `${index * 0.1}s`;
        menuGrid.appendChild(menuItem);
    });

    console.log('Added', filteredItems.length, 'menu items to grid');

    // Trigger animation
    setTimeout(() => {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.add('animate-in');
        });
    }, 100);
}

// Create menu item element
function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
        <div class="menu-item-image">
            <span style="font-size: 3rem;">${item.icon}</span>
        </div>
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-item-footer">
                <span class="price">${formatCurrency(item.price)}</span>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
        </div>
    `;
    return menuItem;
}

// Add item to cart
function addToCart(itemId) {
    try {
        // Start transaction if not already started
        if (!currentCartTransactionId) {
            currentCartTransactionId = window.restaurantLogger.startTransaction('CART_OPERATION', {
                operation: 'add_to_cart',
                itemId
            });
        }
        
        // Log the start of add to cart operation
        if (window.restaurantLogger) {
            window.restaurantLogger.log('DEBUG', 'CART_OPERATION', 'Starting add to cart operation', {
                itemId,
                transactionId: currentCartTransactionId,
                timestamp: Date.now()
            });
        }

        // INTENTIONAL ERROR: Simulate invalid item ID
        if (itemId === 999) {
            throw new Error('Simulated error: Invalid item ID for testing');
        }

        // INTENTIONAL WARNING: Simulate low stock warning
        if (itemId === 1) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'INVENTORY', 'Low stock warning for Paneer Tikka', {
                    itemId,
                    stockLevel: 2,
                    threshold: 5,
                    timestamp: Date.now()
                });
            }
        }

        // Find the item in menu data
        let item = null;
        Object.values(menuData).forEach(category => {
            const found = category.find(i => i.id === itemId);
            if (found) item = found;
        });

        if (!item) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'CART_OPERATION', 'Item not found in menu data', {
                    itemId,
                    timestamp: Date.now()
                });
            }
            return;
        }

        // Check cart limit before adding item
        const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItemsInCart >= MAX_CART_ITEMS) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'CART_OPERATION', 'Cart limit exceeded', {
                    itemId,
                    currentCartSize: totalItemsInCart,
                    maxAllowed: MAX_CART_ITEMS,
                    transactionId: currentCartTransactionId,
                    timestamp: Date.now()
                });
            }
            
            // Show user-friendly message with option to manage cart
            const shouldManageCart = confirm(
                `Cart limit reached! Maximum ${MAX_CART_ITEMS} items allowed.\n\n` +
                `Current items: ${totalItemsInCart}\n` +
                `Would you like to manage your cart to remove some items?`
            );
            
            if (shouldManageCart) {
                toggleCart(); // Open cart for user to manage
            }
            return;
        }
        
        // Show warning when approaching limit
        if (totalItemsInCart >= CART_WARNING_THRESHOLD && totalItemsInCart < MAX_CART_ITEMS) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'CART_OPERATION', 'Approaching cart limit', {
                    itemId,
                    currentCartSize: totalItemsInCart,
                    warningThreshold: CART_WARNING_THRESHOLD,
                    maxAllowed: MAX_CART_ITEMS,
                    transactionId: currentCartTransactionId,
                    timestamp: Date.now()
                });
            }
        }

        // Check if item already exists in cart
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        
        if (existingItem) {
            // Check individual item quantity limit
            if (existingItem.quantity >= MAX_ITEM_QUANTITY) {
                if (window.restaurantLogger) {
                    window.restaurantLogger.log('WARN', 'CART_OPERATION', 'Item quantity limit reached', {
                        itemId,
                        itemName: item.name,
                        currentQuantity: existingItem.quantity,
                        maxQuantity: MAX_ITEM_QUANTITY,
                        timestamp: Date.now()
                    });
                }
                alert(`Maximum quantity of ${MAX_ITEM_QUANTITY} allowed for "${item.name}". Please remove some items first.`);
                return;
            }
            
            existingItem.quantity += 1;
            if (window.restaurantLogger) {
                window.restaurantLogger.logTransaction('QUANTITY_INCREASED', item, existingItem.quantity, item.price, getCartTotal(), currentCartTransactionId);
            }
        } else {
            cart.push({
                ...item,
                quantity: 1
            });
            if (window.restaurantLogger) {
                window.restaurantLogger.logTransaction('ITEM_ADDED', item, 1, item.price, getCartTotal(), currentCartTransactionId);
            }
        }

        updateCartDisplay();
        showAddToCartAnimation();

        // Log successful completion
        if (window.restaurantLogger) {
            window.restaurantLogger.log('INFO', 'CART_OPERATION', 'Add to cart completed successfully', {
                itemId,
                itemName: item.name,
                newQuantity: existingItem ? existingItem.quantity : 1,
                cartTotal: getCartTotal(),
                transactionId: currentCartTransactionId,
                timestamp: Date.now()
            });
        }
    } catch (error) {
        if (window.restaurantLogger) {
            window.restaurantLogger.logError(error, {
                operation: 'addToCart',
                itemId,
                transactionId: currentCartTransactionId,
                timestamp: Date.now()
            });
        }
        console.error('Error in addToCart:', error);
    }
}

// Helper function to get cart total
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// INTENTIONAL ERROR TESTING FUNCTIONS
function triggerTestErrors() {
    console.log('Triggering test errors for logging demonstration...');
    
    // Test 1: Add invalid item (ID 999)
    addToCart(999);
    
    // Test 2: Search with error keyword
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = 'error test';
        searchInput.dispatchEvent(new Event('input'));
    }
    
    // Test 3: Try to add too many items to cart
    for (let i = 0; i < MAX_CART_ITEMS + 3; i++) {
        addToCart(1); // Paneer Tikka
    }
    
    // Test 4: Try negative quantity
    updateQuantity(1, -50);
    
    // Test 5: Search with very long query
    if (searchInput) {
        searchInput.value = 'this is a very long search query that should trigger a warning';
        searchInput.dispatchEvent(new Event('input'));
    }
    
    console.log('Test errors triggered! Check the log viewer to see the results.');
}

// Make test function available globally
window.triggerTestErrors = triggerTestErrors;

// Show add to cart animation
function showAddToCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    cartIcon.style.background = '#27ae60';
    
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        cartIcon.style.background = 'rgba(255,255,255,0.1)';
    }, 300);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add visual indicator for cart status
    const cartIcon = document.querySelector('.cart-icon');
    if (totalItems >= CART_WARNING_THRESHOLD) {
        cartIcon.style.background = totalItems >= MAX_CART_ITEMS ? '#e74c3c' : '#f39c12';
        cartIcon.title = totalItems >= MAX_CART_ITEMS ? 
            `Cart is full (${totalItems}/${MAX_CART_ITEMS} items)` : 
            `Cart is almost full (${totalItems}/${MAX_CART_ITEMS} items)`;
    } else {
        cartIcon.style.background = 'rgba(255,255,255,0.1)';
        cartIcon.title = `Cart has ${totalItems} items`;
    }

    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${formatCurrency(item.price)} each</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(itemId, change) {
    try {
        // Use existing cart transaction or start new one
        if (!currentCartTransactionId) {
            currentCartTransactionId = window.restaurantLogger.startTransaction('CART_OPERATION', {
                operation: 'update_quantity',
                itemId,
                change
            });
        }
        
        const item = cart.find(cartItem => cartItem.id === itemId);
        if (!item) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'CART_OPERATION', 'Item not found for quantity update', {
                    itemId,
                    transactionId: currentCartTransactionId,
                    timestamp: Date.now()
                });
            }
            return;
        }

        const newQuantity = item.quantity + change;
        
        // Validate quantity limits
        if (newQuantity > MAX_ITEM_QUANTITY) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'CART_OPERATION', 'Item quantity limit exceeded', {
                    itemId,
                    itemName: item.name,
                    requestedQuantity: newQuantity,
                    maxQuantity: MAX_ITEM_QUANTITY,
                    transactionId: currentCartTransactionId,
                    timestamp: Date.now()
                });
            }
            alert(`Maximum quantity of ${MAX_ITEM_QUANTITY} allowed for "${item.name}".`);
            return;
        }
        
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
            
            // Log quantity change
            if (window.restaurantLogger) {
                window.restaurantLogger.logTransaction('QUANTITY_UPDATED', item, newQuantity, item.price, getCartTotal(), currentCartTransactionId);
            }
        }
    } catch (error) {
        if (window.restaurantLogger) {
            window.restaurantLogger.logError(error, {
                operation: 'updateQuantity',
                itemId,
                change,
                transactionId: currentCartTransactionId,
                timestamp: Date.now()
            });
        }
        console.error('Error updating quantity:', error);
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    try {
        // Use existing cart transaction or start new one
        if (!currentCartTransactionId) {
            currentCartTransactionId = window.restaurantLogger.startTransaction('CART_OPERATION', {
                operation: 'remove_from_cart',
                itemId
            });
        }
        
        // Log the start of remove from cart operation
        if (window.restaurantLogger) {
            window.restaurantLogger.log('DEBUG', 'CART_OPERATION', 'Starting remove from cart operation', {
                itemId,
                transactionId: currentCartTransactionId,
                timestamp: Date.now()
            });
        }

        // Find the item being removed for logging
        const itemToRemove = cart.find(item => item.id === itemId);
        
        cart = cart.filter(item => item.id !== itemId);
        updateCartDisplay();

        // Log successful removal
        if (window.restaurantLogger && itemToRemove) {
            window.restaurantLogger.logTransaction('ITEM_REMOVED', itemToRemove, 0, itemToRemove.price, getCartTotal(), currentCartTransactionId);
            window.restaurantLogger.log('INFO', 'CART_OPERATION', 'Item removed from cart successfully', {
                itemId,
                itemName: itemToRemove.name,
                cartTotal: getCartTotal(),
                transactionId: currentCartTransactionId,
                timestamp: Date.now()
            });
        }
    } catch (error) {
        if (window.restaurantLogger) {
            window.restaurantLogger.logError(error, {
                operation: 'removeFromCart',
                itemId,
                transactionId: currentCartTransactionId,
                timestamp: Date.now()
            });
        }
        console.error('Error in removeFromCart:', error);
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
}

// Checkout process
function checkout() {
    try {
        // Start order transaction
        currentOrderTransactionId = window.restaurantLogger.startTransaction('ORDER_PROCESSING', {
            cartItems: cart.length,
            cartTotal: getCartTotal()
        });
        
        // Log checkout attempt
        if (window.restaurantLogger) {
            window.restaurantLogger.log('INFO', 'CHECKOUT', 'Checkout process started', {
                cartItems: cart.length,
                cartTotal: getCartTotal(),
                transactionId: currentOrderTransactionId,
                timestamp: Date.now()
            });
        }

        // INTENTIONAL ERROR: Simulate network connectivity issues
        if (Math.random() < 0.1) { // 10% chance of network error
            if (window.restaurantLogger) {
                window.restaurantLogger.log('ERROR', 'NETWORK', 'Network connectivity error during checkout', {
                    errorCode: 'NET_001',
                    message: 'Unable to connect to payment gateway',
                    timestamp: Date.now()
                });
            }
            alert('Network error! Please check your connection and try again.');
            return;
        }

        // INTENTIONAL WARNING: Simulate high order value warning
        const total = getCartTotal();
        if (total > 1000) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'CHECKOUT', 'High value order detected', {
                    orderValue: total,
                    threshold: 1000,
                    timestamp: Date.now()
                });
            }
        }

        if (cart.length === 0) {
            if (window.restaurantLogger) {
                window.restaurantLogger.log('WARN', 'CHECKOUT', 'Checkout attempted with empty cart', {
                    timestamp: Date.now()
                });
            }
            alert('Your cart is empty!');
            return;
        }

        // Show loading state
        const checkoutBtn = document.querySelector('.checkout-btn');
        const originalText = checkoutBtn.innerHTML;
        checkoutBtn.innerHTML = '<div class="loading"></div> Processing...';
        checkoutBtn.disabled = true;

        // Log order processing start
        if (window.restaurantLogger) {
            window.restaurantLogger.log('INFO', 'ORDER_PROCESSING', 'Order processing started', {
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: getCartTotal(),
                timestamp: Date.now()
            });
        }

        // Simulate order processing
        setTimeout(() => {
            try {
                // INTENTIONAL ERROR: Simulate payment processing failure
                if (Math.random() < 0.05) { // 5% chance of payment failure
                    if (window.restaurantLogger) {
                        window.restaurantLogger.log('ERROR', 'PAYMENT', 'Payment processing failed', {
                            errorCode: 'PAY_001',
                            message: 'Card declined or insufficient funds',
                            orderTotal: getCartTotal(),
                            timestamp: Date.now()
                        });
                    }
                    alert('Payment failed! Please try a different payment method.');
                    checkoutBtn.innerHTML = originalText;
                    checkoutBtn.disabled = false;
                    return;
                }

                // INTENTIONAL WARNING: Simulate slow processing warning
                if (getCartTotal() > 500) {
                    if (window.restaurantLogger) {
                        window.restaurantLogger.log('WARN', 'PERFORMANCE', 'Large order processing may take longer', {
                            orderValue: getCartTotal(),
                            estimatedTime: '3-5 minutes',
                            timestamp: Date.now()
                        });
                    }
                }

                // Generate order data for logging
                const orderData = {
                    orderId: Math.floor(Math.random() * 10000) + 1000,
                    items: [...cart],
                    total: getCartTotal(),
                    customerInfo: {
                        timestamp: new Date().toISOString(),
                        userAgent: navigator.userAgent
                    },
                    transactionId: currentOrderTransactionId
                };

                // Log successful order
                if (window.restaurantLogger) {
                    window.restaurantLogger.logOrderPlaced(orderData);
                    window.restaurantLogger.completeTransaction(currentOrderTransactionId, {
                        orderId: orderData.orderId,
                        totalAmount: orderData.total
                    });
                }

                // Complete cart transaction
                if (currentCartTransactionId) {
                    window.restaurantLogger.completeTransaction(currentCartTransactionId, {
                        finalCartTotal: getCartTotal(),
                        finalItemCount: cart.length
                    });
                    currentCartTransactionId = null;
                }

                showOrderConfirmation();
                cart = [];
                updateCartDisplay();
                toggleCart();
                
                // Reset button
                checkoutBtn.innerHTML = originalText;
                checkoutBtn.disabled = false;
            } catch (error) {
                if (window.restaurantLogger) {
                    window.restaurantLogger.logError(error, {
                        operation: 'checkout_processing',
                        timestamp: Date.now()
                    });
                }
                console.error('Error during checkout processing:', error);
            }
        }, 2000);
    } catch (error) {
        if (window.restaurantLogger) {
            window.restaurantLogger.logError(error, {
                operation: 'checkout',
                timestamp: Date.now()
            });
        }
        console.error('Error in checkout:', error);
    }
}

// Show order confirmation
function showOrderConfirmation() {
    const modal = document.getElementById('orderModal');
    const orderDetails = document.getElementById('orderDetails');
    
    // Generate order summary
    const orderNumber = Math.floor(Math.random() * 10000) + 1000;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const estimatedTime = Math.floor(Math.random() * 10) + 15; // 15-25 minutes
    
    orderDetails.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
            <h4>Order #${orderNumber}</h4>
            <p><strong>Total: ${formatCurrency(total)}</strong></p>
            <p>Estimated ready time: ${estimatedTime} minutes</p>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <h5>Order Summary:</h5>
            <ul style="list-style: none; padding: 0;">
                ${cart.map(item => `
                    <li style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${item.quantity}x ${item.name}</span>
                        <span>${formatCurrency(item.price * item.quantity)}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Handle escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate menu items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe menu items
    setTimeout(() => {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const cartSidebar = document.getElementById('cartSidebar');
        if (diff > 0 && cartSidebar.classList.contains('open')) {
            // Swipe left to close cart
            toggleCart();
        } else if (diff < 0 && !cartSidebar.classList.contains('open')) {
            // Swipe right to open cart
            toggleCart();
        }
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #3498db !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);
