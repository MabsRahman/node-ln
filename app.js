const fs = require('fs').promises;

async function run() {
  console.log("Waiting 2 seconds...");
  await new Promise(resolve => setTimeout(resolve, 2000));

  const data = await fs.readFile('data.json', 'utf8');
  const obj = JSON.parse(data);
  console.log("User:", obj.name);
}

run();
