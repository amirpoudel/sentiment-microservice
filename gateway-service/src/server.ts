import app from './app'
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
// Start the server
app.listen(3000, () => {
    console.log(`API Gateway running on port ${3000}`);
});