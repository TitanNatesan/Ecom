// utils/helpers.js - Common utility functions for the application
import AsyncStorage from '@react-native-async-storage/async-storage';

// Format currency values
export const formatCurrency = (amount, currency = '₹') => {
    if (amount === null || amount === undefined) return `${currency}0`;
    return `${currency}${parseFloat(amount).toFixed(2)}`;
};

// Format numbers with proper separators
export const formatNumber = (number) => {
    if (number === null || number === undefined) return '0';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, salePrice) => {
    if (!originalPrice || !salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Validate email format
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number (Indian format)
export const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// Validate password strength
export const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);

    return {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
        hasMinLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar: hasNonalphas,
    };
};

// Debounce function for search inputs
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Generate random ID
export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

// Capitalize first letter
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Deep clone object
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
    if (obj === null || obj === undefined) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    if (typeof obj === 'string') return obj.trim().length === 0;
    return false;
};

// Get image URL with fallback
export const getImageUrl = (imagePath, baseUrl = '') => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${baseUrl}${imagePath}`;
};

// Format date
export const formatDate = (date, format = 'DD/MM/YYYY') => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    switch (format) {
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        default:
            return d.toLocaleDateString();
    }
};

// Format time
export const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

// Get time ago string
export const getTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
};

// Sort array of objects by key
export const sortBy = (array, key, direction = 'asc') => {
    return array.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (direction === 'desc') {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
};

// Group array by key
export const groupBy = (array, key) => {
    return array.reduce((groups, item) => {
        const group = item[key];
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(item);
        return groups;
    }, {});
};

// Filter array by search term
export const filterBySearch = (array, searchTerm, searchKeys = []) => {
    if (!searchTerm) return array;

    const term = searchTerm.toLowerCase();
    return array.filter(item => {
        if (searchKeys.length === 0) {
            // Search in all string properties
            return Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(term)
            );
        }

        // Search in specified keys
        return searchKeys.some(key => {
            const value = item[key];
            return typeof value === 'string' && value.toLowerCase().includes(term);
        });
    });
};

// Calculate average rating
export const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return Math.round((sum / ratings.length) * 10) / 10; // Round to 1 decimal
};

// Generate star rating array
export const generateStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push('full');
    }

    if (hasHalfStar) {
        stars.push('half');
    }

    while (stars.length < 5) {
        stars.push('empty');
    }

    return stars;
};

// Storage helpers
export const storage = {
    setItem: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            return true;
        } catch (error) {
            console.error('Storage setItem error:', error);
            return false;
        }
    },

    getItem: async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Storage getItem error:', error);
            return null;
        }
    },

    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage removeItem error:', error);
            return false;
        }
    },

    clear: async () => {
        try {
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }
};

// API request helpers
export const apiHelpers = {
    handleResponse: (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(`API Error: ${response.status}`);
    },

    handleError: (error) => {
        if (error.response) {
            // Server responded with error status
            return {
                message: error.response.data?.message || 'Server error occurred',
                status: error.response.status,
                data: error.response.data
            };
        } else if (error.request) {
            // Request was made but no response received
            return {
                message: 'Network error - please check your connection',
                status: 0,
                data: null
            };
        } else {
            // Something else happened
            return {
                message: error.message || 'An unexpected error occurred',
                status: 0,
                data: null
            };
        }
    }
};

// Form validation helpers
export const validation = {
    required: (value) => {
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            return 'This field is required';
        }
        return null;
    },

    email: (value) => {
        if (!validateEmail(value)) {
            return 'Please enter a valid email address';
        }
        return null;
    },

    phone: (value) => {
        if (!validatePhone(value)) {
            return 'Please enter a valid phone number';
        }
        return null;
    },

    password: (value) => {
        const result = validatePassword(value);
        if (!result.isValid) {
            return 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
        }
        return null;
    },

    confirmPassword: (value, password) => {
        if (value !== password) {
            return 'Passwords do not match';
        }
        return null;
    },

    minLength: (value, length) => {
        if (!value || value.length < length) {
            return `Must be at least ${length} characters`;
        }
        return null;
    },

    maxLength: (value, length) => {
        if (value && value.length > length) {
            return `Must be no more than ${length} characters`;
        }
        return null;
    }
};

export default {
    formatCurrency,
    formatNumber,
    calculateDiscount,
    validateEmail,
    validatePhone,
    validatePassword,
    debounce,
    throttle,
    generateId,
    capitalize,
    truncateText,
    deepClone,
    isEmpty,
    getImageUrl,
    formatDate,
    formatTime,
    getTimeAgo,
    sortBy,
    groupBy,
    filterBySearch,
    calculateAverageRating,
    generateStarRating,
    storage,
    apiHelpers,
    validation,
};
