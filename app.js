import express from 'express'

import { PORT } from "./config/env.js";

const app = express();

app.get('/', (req, res) => {
    res.send({body: 'Welcome to Sunscription API'});
});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});

export default app;