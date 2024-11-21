import path from 'node:path'
import { fileURLToPath } from 'node:url';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import helmet from 'helmet';
import health from './routes/health.mjs';
import api from './routes/api.mjs';
import environments from './configs/environments.mjs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(environments.NODE_ENV === 'production' ? (
  morgan(
    'tiny', {
      // In production mode to reduce logs size, only errors are logged
      skip: function (req, res) { return res.statusCode < 400 },
    },
  )) : morgan('tiny'),
)

app.use(express.static(path.join(__dirname, '../public')));
app.use(health);
app.use('/api', api);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
})

export default app;
