const fs = require('fs').promises;

async function getUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function addUser(name, age) {
  const users = await getUsers();
  users.push({ name, age });
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
  console.log(`User ${name} added!`);
}

async function listUsers() {
  const users = await getUsers();
  console.log("Users:", users);
}

module.exports = { addUser, listUsers };
