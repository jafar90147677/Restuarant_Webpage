/**
 * Comprehensive Logging System for Eat Well😋 Restaurant
 * Captures all user interactions, transactions, and system events
 */

class RestaurantLogger {
    constructor() {
        this.logLevels = {
            ERROR: 0,
            WARN: 1,
            INFO: 2,
            DEBUG: 3,
            TRACE: 4
        };
        
        this.currentLogLevel = this.logLevels.DEBUG;
        this.logFile = 'restaurant_logs.txt';
        this.sessionId = this.generateSessionId();
        this.userId = this.getOrCreateUserId();
        this.startTime = new Date();
        
        // Add transaction tracking
        this.activeTransactions = new Map(); // Track active transactions
        this.transactionCounter = 0; // Counter for unique transaction IDs
        
        // Initialize log file
        this.initializeLogFile();
        
        // Log session start
        this.log('INFO', 'SESSION_START', 'User session started', {
            sessionId: this.sessionId,
            userId: this.userId,
            timestamp: this.startTime.toISOString(),
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`
        });
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getOrCreateUserId() {
        let userId = localStorage.getItem('restaurant_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('restaurant_user_id', userId);
        }
        return userId;
    }

    // Add new method for generating transaction IDs
    generateTransactionId() {
        this.transactionCounter++;
        return `txn_${this.sessionId}_${this.transactionCounter}_${Date.now()}`;
    }

    // Add method to start a new transaction
    startTransaction(transactionType, initialData = {}) {
        const transactionId = this.generateTransactionId();
        const transaction = {
            id: transactionId,
            type: transactionType,
            startTime: Date.now(),
            actions: [],
            data: initialData
        };
        
        this.activeTransactions.set(transactionId, transaction);
        
        this.log('INFO', 'TRANSACTION_START', `Transaction started: ${transactionType}`, {
            transactionId,
            transactionType,
            initialData,
            timestamp: Date.now()
        });
        
        return transactionId;
    }

    // Add method to log action within a transaction
    logTransactionAction(transactionId, action, data = {}) {
        const transaction = this.activeTransactions.get(transactionId);
        if (!transaction) {
            console.warn(`Transaction ${transactionId} not found`);
            return;
        }
        
        transaction.actions.push({
            action,
            data,
            timestamp: Date.now()
        });
        
        this.log('INFO', 'TRANSACTION_ACTION', `Transaction action: ${action}`, {
            transactionId,
            action,
            data,
            timestamp: Date.now()
        });
    }

    // Add method to complete a transaction
    completeTransaction(transactionId, finalData = {}) {
        const transaction = this.activeTransactions.get(transactionId);
        if (!transaction) {
            console.warn(`Transaction ${transactionId} not found`);
            return;
        }
        
        const duration = Date.now() - transaction.startTime;
        
        this.log('INFO', 'TRANSACTION_COMPLETE', `Transaction completed: ${transaction.type}`, {
            transactionId,
            transactionType: transaction.type,
            duration,
            actionCount: transaction.actions.length,
            finalData,
            timestamp: Date.now()
        });
        
        this.activeTransactions.delete(transactionId);
    }

    initializeLogFile() {
        const header = `\n=== RESTAURANT LOG SESSION STARTED ===\n`;
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp} | SYSTEM | LOG_INIT | ${header}`;
        
        // Store in localStorage for persistence
        const existingLogs = localStorage.getItem('restaurant_logs') || '';
        localStorage.setItem('restaurant_logs', existingLogs + logEntry);
    }

    log(level, category, message, data = {}) {
        const timestamp = new Date().toISOString();
        const logLevel = this.logLevels[level] || this.logLevels.INFO;
        
        if (logLevel <= this.currentLogLevel) {
            const logEntry = {
                timestamp,
                level,
                category,
                message,
                sessionId: this.sessionId,
                userId: this.userId,
                data,
                url: window.location.href,
                userAgent: navigator.userAgent
            };

            // Format log entry
            const formattedLog = this.formatLogEntry(logEntry);
            
            // Store in localStorage
            this.storeLog(formattedLog);
            
            // Console output for development
            this.consoleLog(level, formattedLog);
        }
    }

    formatLogEntry(logEntry) {
        return `${logEntry.timestamp} | ${logEntry.level} | ${logEntry.category} | ${logEntry.message} | Session: ${logEntry.sessionId} | User: ${logEntry.userId} | Data: ${JSON.stringify(logEntry.data)}\n`;
    }

    storeLog(formattedLog) {
        const existingLogs = localStorage.getItem('restaurant_logs') || '';
        localStorage.setItem('restaurant_logs', existingLogs + formattedLog);
    }

    consoleLog(level, message) {
        const colors = {
            ERROR: 'color: red; font-weight: bold;',
            WARN: 'color: orange; font-weight: bold;',
            INFO: 'color: blue;',
            DEBUG: 'color: green;',
            TRACE: 'color: gray;'
        };
        
        console.log(`%c${message}`, colors[level] || 'color: black;');
    }

    // Transaction logging methods
    logTransaction(action, item, quantity, price, cartTotal, transactionId = null) {
        const logData = {
            action,
            itemId: item.id,
            itemName: item.name,
            quantity,
            unitPrice: price,
            totalPrice: price * quantity,
            cartTotal,
            timestamp: Date.now()
        };
        
        if (transactionId) {
            logData.transactionId = transactionId;
            this.logTransactionAction(transactionId, action, logData);
        }
        
        this.log('INFO', 'TRANSACTION', `Cart ${action}`, logData);
    }

    logOrderPlaced(orderData) {
        this.log('INFO', 'ORDER_PLACED', 'Order successfully placed', {
            orderId: orderData.orderId,
            totalItems: orderData.items.length,
            totalAmount: orderData.total,
            items: orderData.items,
            customerInfo: orderData.customerInfo,
            timestamp: Date.now()
        });
    }

    logUserInteraction(action, element, data = {}) {
        this.log('DEBUG', 'USER_INTERACTION', `User ${action}`, {
            action,
            element: element.tagName + (element.id ? '#' + element.id : ''),
            className: element.className,
            data,
            timestamp: Date.now()
        });
    }

    logError(error, context = {}) {
        this.log('ERROR', 'SYSTEM_ERROR', error.message, {
            error: error.toString(),
            stack: error.stack,
            context,
            timestamp: Date.now()
        });
    }

    logPerformance(operation, duration, data = {}) {
        this.log('DEBUG', 'PERFORMANCE', `Operation: ${operation}`, {
            operation,
            duration,
            data,
            timestamp: Date.now()
        });
    }

    logSearch(query, results, filters = {}, transactionId = null) {
        const logData = {
            query,
            resultsCount: results.length,
            filters,
            timestamp: Date.now()
        };
        
        if (transactionId) {
            logData.transactionId = transactionId;
        }
        
        this.log('INFO', 'SEARCH', `Search performed`, logData);
    }

    logPageNavigation(from, to) {
        this.log('INFO', 'NAVIGATION', `Page navigation`, {
            from,
            to,
            timestamp: Date.now()
        });
    }

    // Export logs for analysis
    exportLogs() {
        const logs = localStorage.getItem('restaurant_logs') || '';
        const blob = new Blob([logs], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `restaurant_logs_${this.sessionId}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Clear logs
    clearLogs() {
        localStorage.removeItem('restaurant_logs');
        this.log('INFO', 'SYSTEM', 'Logs cleared by user');
    }

    // Get log statistics
    getLogStats() {
        const logs = localStorage.getItem('restaurant_logs') || '';
        const logLines = logs.split('\n').filter(line => line.trim());
        
        const stats = {
            totalLogs: logLines.length,
            errorCount: logLines.filter(line => line.includes('| ERROR |')).length,
            warningCount: logLines.filter(line => line.includes('| WARN |')).length,
            infoCount: logLines.filter(line => line.includes('| INFO |')).length,
            debugCount: logLines.filter(line => line.includes('| DEBUG |')).length,
            sessionDuration: Date.now() - this.startTime.getTime()
        };

        this.log('INFO', 'LOG_STATS', 'Log statistics generated', stats);
        return stats;
    }
}

// Global logger instance
window.restaurantLogger = new RestaurantLogger();

// Enhanced error handling
window.addEventListener('error', function(event) {
    window.restaurantLogger.logError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        message: event.message
    });
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    window.restaurantLogger.logError(new Error(event.reason), {
        type: 'unhandled_promise_rejection',
        reason: event.reason
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    window.restaurantLogger.logPerformance('page_load', loadTime, {
        domContentLoaded: performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,
        loadComplete: performance.getEntriesByType('navigation')[0].loadEventEnd
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RestaurantLogger;
}
