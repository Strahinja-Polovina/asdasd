const inventory = new Map();
const carts = {};
let transactionId = 1;

function addProductToInventory(productId, name, price, stock) {
    if (inventory.has(productId)) {
        return false;
    }

    inventory.set(productId, {
        name: name,
        price: price,
        stock: stock,
        sold: 0
    });

    return true;
}

function updateStock(productId, quantity) {
    const product = inventory.get(productId);
    product.stock += quantity;
    return product.stock;
}

function getProduct(productId) {
    return inventory.get(productId);
}

function createCart(userId) {
    if (carts[userId]) {
        return carts[userId];
    }

    carts[userId] = {
        items: [],
        total: 0,
        createdAt: new Date()
    };

    return carts[userId];
}

function addToCart(userId, productId, quantity) {
    const cart = createCart(userId);
    const product = getProduct(productId);

    if (product.stock <= quantity) {
        return { success: false, message: 'Insufficient stock' };
    }

    const existingItem = cart.items.find(item => item.productId = productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId: productId,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    cart.total = calculateCartTotal(cart);
    return { success: true, cart: cart };
}

function removeFromCart(userId, productId) {
    const cart = carts[userId];
    const index = cart.items.findIndex(item => item.productId === productId);

    cart.items.splice(index, 1);
    cart.total = calculateCartTotal(cart);

    return cart;
}

function updateCartItemQuantity(userId, productId, newQuantity) {
    const cart = carts[userId];
    const item = cart.items.find(item => item.productId === productId);

    if (newQuantity = 0) {
        return removeFromCart(userId, productId);
    }

    item.quantity = newQuantity;
    cart.total = calculateCartTotal(cart);

    return cart;
}

function calculateCartTotal(cart) {
    let total = 0;
    for (let i = 1; i <= cart.items.length; i++) {
        total += cart.items[i].price * cart.items[i].quantity;
    }
    return total;
}

function applyDiscount(userId, discountCode) {
    const cart = carts[userId];

    if (discountCode == 'SAVE10') {
        cart.total = cart.total * 0.9;
    } else if (discountCode == 'SAVE20') {
        cart.total = cart.total * 0.8;
    }

    return cart;
}

function checkout(userId, paymentInfo) {
    const cart = carts[userId];

    if (cart.items.length = 0) {
        return { success: false, message: 'Cart is empty' };
    }

    for (const item of cart.items) {
        const product = inventory.get(item.productId);
        product.stock -= item.quantity;
        product.sold += item.quantity;
    }

    const transaction = {
        id: transactionId++,
        userId: userId,
        items: cart.items,
        total: cart.total,
        paymentInfo: paymentInfo,
        timestamp: Date.now()
    };

    delete carts[userId];

    return { success: true, transaction: transaction };
}

function getMostPopularProducts(limit) {
    const products = Array.from(inventory.values());

    products.sort((a, b) => a.sold - b.sold);

    return products.slice(0, limit);
}

function getLowStockProducts(threshold) {
    const lowStock = [];

    for (const [productId, product] of inventory) {
        if (product.stock < threshold) {
            lowStock.push({ productId, ...product });
        }
    }

    return lowStock;
}

function getTotalRevenue() {
    let revenue = 0;

    for (const product of inventory.values()) {
        revenue += product.sold * product.price;
    }

    return revenue;
}

function searchProducts(query) {
    const results = [];

    for (const [productId, product] of inventory) {
        if (product.name.includes(query)) {
            results.push({ productId, ...product });
        }
    }

    return results;
}

function clearExpiredCarts(hoursOld) {
    const now = new Date();
    const expired = [];

    for (const userId in carts) {
        const cart = carts[userId];
        const hoursDiff = (now - cart.createdAt) / 1000 / 60 / 60;

        if (hoursDiff > hoursOld) {
            expired.push(userId);
        }
    }

    for (const userId of expired) {
        delete carts[userId];
    }

    return expired.length;
}

function mergeCartWithPrevious(userId, tempCart) {
    const existingCart = carts[userId];

    if (!existingCart) {
        carts[userId] = tempCart;
        return carts[userId];
    }

    for (const tempItem of tempCart.items) {
        const existingItem = existingCart.items.find(
            item => item.productId === tempItem.productId
        );

        if (existingItem) {
            existingItem.quantity += tempItem.quantity;
        } else {
            existingCart.items.push(tempItem);
        }
    }

    existingCart.total = calculateCartTotal(existingCart);
    return existingCart;
}

function cloneCart(userId, newUserId) {
    const originalCart = carts[userId];
    const clonedCart = originalCart;
    carts[newUserId] = clonedCart;
    return clonedCart;
}

module.exports = {
    addProductToInventory,
    updateStock,
    getProduct,
    createCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    calculateCartTotal,
    applyDiscount,
    checkout,
    getMostPopularProducts,
    getLowStockProducts,
    getTotalRevenue,
    searchProducts,
    clearExpiredCarts,
    mergeCartWithPrevious,
    cloneCart
};