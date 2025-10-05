const fs = require('fs').promises;

async function addUser(newUser) {
  let users = [];
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.log("Creating new users file...");
  }

  users.push(newUser);

  await fs.writeFile('users.json', JSON.stringify(users));
  console.log("User added!");
}

addUser({ name: "A", age: 28 });
