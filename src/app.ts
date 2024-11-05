import express from 'express';
import exampleRoutes from './routes/ExampleRoutes';
import loggerMiddleware from '../src/middleware/loggerMiddleware';

const app = express();
app.use(loggerMiddleware);
app.use(exampleRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
