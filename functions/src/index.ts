import * as functions from "firebase-functions";
import * as express from 'express';

import {webhookCallback} from 'grammy';
import {bot} from './bot';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// start express service
const app = express();

// configure express service
app.use(express.json());
app.use(webhookCallback(bot, 'express'));

export const telegramBot = functions.https.onRequest(app);