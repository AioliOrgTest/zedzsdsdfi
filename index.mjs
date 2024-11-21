import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('newrelic');

import start from './app/server.mjs';

start();
