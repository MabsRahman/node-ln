const { addUser, listUsers } = require('./userManager');

const args = process.argv.slice(2);

switch(args[0]) {
  case 'add':
    addUser(args[1], args[2]);
    break;
  case 'list':
    listUsers();
    break;
  default:
    console.log('Commands: add <name> <age> | list');
}
