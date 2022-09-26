const app = require('./app');
const port = 3000;

// Actually start the server listening
app.listen(3000, () => {
    console.log(`Server now listening on port ${port}...`)
});
