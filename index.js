import 'dotenv/config';
import Worker from './app/lib/worker.js';

(() => {
    Worker.start();
})()