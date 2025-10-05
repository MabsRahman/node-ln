const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    try {
      const data = await fs.readFile('users.json', 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('[]');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
