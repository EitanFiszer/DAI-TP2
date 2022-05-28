import { Router } from 'express';
import { AuthService } from '../services/authService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const authService = new AuthService();

router.get('/logIn', async (req, res) => {
    console.log(`This is a get operation`);

    const token = await authService.getToken();
  
    return res.status(200).json(token);
  });

  export default router;