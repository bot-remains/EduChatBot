import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import responseRoute from './routes/response.route.js';

const app = express();
try {
  app
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

  app.use('/api/v1/response', responseRoute);
} catch (err) {
  console.log(err);
}
