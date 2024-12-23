import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


const app = express();


// Define the allowed origins from the environment variable CORS_ORIGIN
console.log("CORS_ORIGIN", process.env.CORS_ORIGIN);
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];

// Configure CORS options
console.log("Allowed Origins", allowedOrigins);

const corsOptions = {
  origin: function (origin:any, callback:Function) {
    // Check if the origin is in the allowedOrigins array or if it's undefined
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { 
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Allow sending cookies
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(cookieParser());

// Serve static files
app.use('/api/v1/storage',express.static('./storage'));


//import routes


import { expressErrorHandler } from './lib/error/handler.error';

import uploadFileRoutes from './presentation/express/routes/upload-file.route';

app.use('/api/v1/upload-file',uploadFileRoutes);









//Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  expressErrorHandler(err, req, res, next);
});


export default app;