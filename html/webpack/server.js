let app = require('express')();

app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('localhost:3000'));
