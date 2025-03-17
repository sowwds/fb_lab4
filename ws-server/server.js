const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

const clients = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'join':
        clients.set(ws, { userType: data.userType, userId: data.userId });
        break;
      case 'message':
        const sender = clients.get(ws);
        if (sender.userType === 'customer') {
          wss.clients.forEach(client => {
            const info = clients.get(client);
            if (info?.userType === 'admin') {
              client.send(JSON.stringify({
                type: 'message',
                from: sender.userId,
                content: data.content,
                timestamp: new Date().toISOString()
              }));
            }
          });
        } else if (sender.userType === 'admin' && data.to) {
          wss.clients.forEach(client => {
            const info = clients.get(client);
            if (info?.userId === data.to) {
              client.send(JSON.stringify({
                type: 'message',
                from: 'admin',
                content: data.content,
                timestamp: new Date().toISOString()
              }));
            }
          });
        }
        break;
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

console.log('WebSocket server is running on ws://localhost:4000');
