import express from 'express'

import { PORT } from "./config/env.js";

import userRouter from './config/routes/user.routes.js';
import authRouter from './config/routes/auth.routes.js';
import subscriptionRouter from './config/routes/subscriptions.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
    res.send({body: 'Welcome to Sunscription API'});
});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});

export default app;