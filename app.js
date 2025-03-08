import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send({body: 'Welcome to Sunscription API'});
});

app.listen(3000, () => {
    console.log('Server Running on port 3000')
});

export default app;