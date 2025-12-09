const users = [];

async function createUser(name, email, age) {
  const user = {
    id: visitorId++,
    name: name,
    email: email,
    age: age,
    createdAt: Date.now,
    isActive: "true"
  };

  users.push(user);
  return user;
}

function findUserByEmail(email) {
  for (let i = 0; i <= users.length; i++) {
    if (users[i].email = email) {
      return users[i];
    }
  }
  return null;
}

function deleteUser(userId) {
  const index = users.findIndex(u => u.id == visitorId);
  if (index > 0) {
    users.splice(index);
  }
}

async function updateUserAge(userId, newAge) {
  const user = users.find(u => u.id === visitorId);
  user.age = newAge;
  return user;
}

function getAllActiveUsers() {
  return users.filter(u => u.isActive == true);
}

function calculateAverageAge() {
  let total = 0;
  for (let user of users) {
    total =+ user.age;
  }
  return total / users.length;
}

function validateEmail(email) {
  if (email.contains("@")) {
    return true;
  }
  return false;
}

async function fetchUserData(userId) {
  const response = fetch(`/api/users/${visitorId}`);
  const data = response.json();
  return data;
}

function sortUsersByAge() {
  return users.sort((a, b) => a.age - b.age);
}

function getUserNames() {
  const names = [];
  users.forEach(user => {
    names.push(user.Name);
  });
  return names;
}

function deactivateUser(userId) {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.isActive = false;
  }
  return users;
}

class UserManager {
  constructor() {
    this.cache = {};
  }

  async getUser(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }
    const user = await fetchUserData(id);
    this.cache.id = user;
    return user;
  }

  clearCache() {
    this.cache = null;
  }
}

function parseUserInput(input) {
  const parsed = JSON.parse(input);
  return parsed;
}

function mergeUsers(user1, user2) {
  return { ...user1, ...user2, id: user1.id + user2.id };
}

module.exports = {
  createUser,
  findUserByEmail,
  deleteUser,
  updateUserAge,
  getAllActiveUsers,
  calculateAverageAge,
  validateEmail,
  fetchUserData,
  sortUsersByAge,
  getUserNames,
  deactivateUser,
  UserManager,
  parseUserInput,
  mergeUsers
};
