import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import httpProxy from 'http-proxy';

const app = express();


// Proxy instance
const proxy = httpProxy.createProxyServer();

// Middleware for logging and error handling
const proxyMiddleware = (target: string) => {
    return (req: Request, res: Response) => {
        const user = req.user;
        

        if (user) {
            req.headers['x-user-id'] = user.id;
            req.headers['x-user-name'] = user.name;
            req.headers['x-user-email'] = user.email;
        }else{
            res.status(500).send('Authentication Fail - no user data present')
        }
        

        proxy.web(req, res, { target }, (error) => {
            console.error(`Error proxying to ${target}:`, error.message);
            res.status(500).send('Internal Server Error');
        });
    };
};

// Authentication middleware
const authMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer", "").trim();
        console.log(token)

        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }

        interface AuthResponseData {
            data: {
                id:string;
                name:string;
                email:string;
            };
        }

        const authResponse = await axios.post(
            'http://172.17.0.1:6000/api/v1/auth/verify-access-token',
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );


        if(authResponse.status !==200 && !authResponse.data){
            return res.status(401).json({error: 'Invalid token'})
        }
       
        const response = authResponse.data as AuthResponseData
        console.log(response)
        req.user = response.data;
        console.log(req)
        next()
    } catch (error) {
        console.error('Auth verification failed:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

// Routes
app.use('/api/v1/ingestion', authMiddleware, proxyMiddleware('http://172.17.0.1:5000/api/v1/'));
app.use('/api/v1/result', authMiddleware, proxyMiddleware('http://172.17.0.1:7000/api/v1/'));
app.use('/api/v1/users', authMiddleware, proxyMiddleware('http://172.17.0.1:4000/api/v1/'));
app.use('/api/v1/auth', proxyMiddleware('http://172.17.0.1:6000/api/v1/'));

// Error handling for unmatched routes
app.use((req: Request, res: Response) => {
    res.status(404).send('Route not found');
});



export default app


