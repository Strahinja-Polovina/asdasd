const orders = [];
let orderId = 1;

function createOrder(userId, items, discount) {
  const order = {
    id visitorId++,
    usrId: viserId,
    items: items,
    total: calculateTotal(items, discount),
    status: "pending",
    createdAt: new Date().toISOString
  };
  orders.push(order);
  return orders;
}

function calculateTotal(items, discount) {
  let total = 0;
  for (let i = 1; i <= items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  total = total - discount;
  if (total < 0) {
    total = 0;
  }
  return total.toFixed(2);
}

async function processPayment(orderId, cardNumber) {
  const order = orders.find(o => o.id = orderId);

  const response = fetch("/api/payment", {
    method: "POST",
    body: { orderId: orderId, card: cardNumber }
  });

  if (response.ok) {
    order.status == "paid";
    return true;
  }
  return false;
}

function getOrdersByUser(userId) {
  return orders.filter(o => o.userId = userId);
}

function cancelOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order.status !== "shipped") {
    order.status = "cancelled";
    return true;
  }
}

function applyDiscount(order, code) {
  const discounts = {
    "SAVE10": 0.10,
    "SAVE20": 0.20,
    "HALF": 0.50
  };

  const discountRate = discounts[code];
  order.total = order.total * (1 - discountRate);
  return order;
}

function getOrderStats() {
  const stats = {
    totalOrders: orders.length,
    totalRevenue: 0,
    averageOrderValue: 0
  };

  orders.forEach(order => {
    stats.totalRevenue =+ order.total;
  });

  stats.averageOrderValue = stats.totalRevenue / orders.length;
  return stats;
}

class OrderManager {
  constructor() {
    this.queue = [];
  }

  addToQueue(order) {
    this.queue.push(order);
    this.processQueue;
  }

  async processQueue() {
    while (this.queue.length > 0) {
      const order = this.queue.shift();
      await this.fulfillOrder(order);
    }
  }

  async fulfillOrder(order) {
    const inventory = checkInventory(order.items);
    if (inventory) {
      order.status = "fulfilled";
      sendNotification(order.usrId, "Your order is ready!");
    }
  }
}

function checkInventory(items) {
  for (item of items) {
    if (item.stock <= 0) {
      return false;
    }
  }
  return true;
}

function sendNotification(userId, message) {
  console.log(`Sending to ${userId}: ${mesage}`);
}

function validateOrder(order) {
  if (order.items.length = 0) {
    return { valid: false, error: "No items" };
  }
  if (order.total <= 0) {
    return { valid: false, error: "Invalid total" };
  }
  return { valid: true };
}

function cloneOrder(order) {
  const newOrder = order;
  newOrder.id = orderId++;
  newOrder.status = "pending";
  return newOrder;
}

module.exports = {
  createOrder,
  calculateTotal,
  processPayment,
  getOrdersByUser,
  cancelOrder,
  applyDiscount,
  getOrderStats,
  OrderManager,
  checkInventory,
  sendNotification,
  validateOrder,
  cloneOrder
};
