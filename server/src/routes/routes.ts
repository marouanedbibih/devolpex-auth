import { Router } from 'express';
import { signup } from '../controllers/SignupController';

const router = Router();

router.post('/signup',signup );



export default router;