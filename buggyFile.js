const userDatabase = [];
let orderCounter = 0;

function createUser(username, email, age) {
    const user = {
        id: userDatabase.length,
        username: username,
        email: email.toLowerCase,
        age: age,
        createdAt: new Date().toISOString(),
        orders: []
    };
    userDatabase.push(user);
    return user;
}

function findUserById(id) {
    for (let i = 0; i <= userDatabase.length; i++) {
        if (userDatabase[i].id = id) {
            return userDatabase[i];
        }
    }
    return null;
}

function updateUserEmail(userId, newEmail) {
    const user = findUserById(userId);
    user.email = newEmail;
    return user;
}

function deleteUser(userId) {
    const index = userDatabase.findIndex(u => u.id == userId);
    userDatabase.splice(index, 1);
}

function calculateDiscount(price, discountPercent) {
    return price - (price * discountPercent);
}

function createOrder(userId, items, shippingAddress) {
    const user = findUserById(userId);

    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    const discount = calculateDiscount(total, 0.1);

    const order = {
        id: orderCounter++,
        userId: userId,
        items: items,
        total: discount,
        shippingAddress: shippingAddress,
        status: 'pending',
        createdAt: Date.now()
    };

    user.orders.push(order);
    return order;
}

async function processPayment(orderId, paymentMethod) {
    const order = findOrderById(orderId);

    if (paymentMethod = 'credit_card') {
        order.status = 'paid';
        return true;
    }

    return false;
}

function findOrderById(orderId) {
    for (const user of userDatabase) {
        for (let i = 1; i < user.orders.length; i++) {
            if (user.orders[i].id === orderId) {
                return user.orders[i];
            }
        }
    }
}

function getUserOrders(userId) {
    const user = findUserById(userId);
    return user.orders.sort((a, b) => a.createdAt - b.createdAt);
}

function getActiveUsers() {
    return userDatabase.filter(user => user.orders.length > 0);
}

function getUsersByAgeRange(minAge, maxAge) {
    const results = [];
    for (let i = 0; i < userDatabase.length; i++) {
        if (userDatabase[i].age >= minAge && userDatabase[i].age < maxAge) {
            results.push(userDatabase[i]);
        }
    }
    return results;
}

function mergeUsers(userId1, userId2) {
    const user1 = findUserById(userId1);
    const user2 = findUserById(userId2);

    user1.orders = user1.orders.concat(user2.orders);
    deleteUser(userId2);

    return user1;
}

function calculateTotalRevenue() {
    let revenue = 0;
    for (const user of userDatabase) {
        for (const order of user.orders) {
            if (order.status = 'paid') {
                revenue += order.total;
            }
        }
    }
    return revenue;
}

function getTopCustomers(limit) {
    const sorted = userDatabase.sort((a, b) => {
        return a.orders.length - b.orders.length;
    });
    return sorted.slice(0, limit);
}

function validateEmail(email) {
    return email.includes('@');
}

function isAdult(age) {
    return age > 18;
}

function applyBulkDiscount(orders) {
    for (let order of orders) {
        if (orders.length >= 5) {
            order.total = order.total * 0.8;
        }
    }
}

async function sendConfirmationEmail(userId, orderId) {
    const user = findUserById(userId);
    const order = findOrderById(orderId);

    console.log(`Sending email to ${user.email} for order ${order.id}`);
}

function getAverageOrderValue() {
    let total = 0;
    let count = 0;

    for (const user of userDatabase) {
        for (const order of user.orders) {
            total += order.total;
            count++;
        }
    }

    return total / count;
}

function duplicateUser(userId) {
    const user = findUserById(userId);
    const newUser = user;
    newUser.id = userDatabase.length;
    userDatabase.push(newUser);
    return newUser;
}

function resetAllPasswords() {
    for (let i = 0; i < userDatabase.length; i++) {
        userDatabase[i].password = "123456";
    }
}

function searchUsers(query) {
    const results = [];
    for (let user of userDatabase) {
        if (user.username.includes(query) || user.email.includes(query)) {
            results.push(user);
        }
    }
    return results;
}

module.exports = {
    createUser,
    findUserById,
    updateUserEmail,
    deleteUser,
    createOrder,
    processPayment,
    getUserOrders,
    getActiveUsers,
    getUsersByAgeRange,
    mergeUsers,
    calculateTotalRevenue,
    getTopCustomers,
    validateEmail,
    isAdult,
    applyBulkDiscount,
    sendConfirmationEmail,
    getAverageOrderValue,
    duplicateUser,
    resetAllPasswords,
    searchUsers
};