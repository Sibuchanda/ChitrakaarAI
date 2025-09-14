import express from 'express'
import {registerUser, loginUser, userCredit, paymentRazorpay, verifyRazorpay} from '../controlers/userControler.js'
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredit);
userRouter.post('/pay-razor', userAuth, paymentRazorpay);
userRouter.post('/verify-razor', userAuth, verifyRazorpay);

export default userRouter;