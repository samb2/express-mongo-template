import express from 'express';
import { v1Router } from './v1';
import { NotFoundError, ErrorHandlerMiddleware } from 'irolegroup';

const router = express.Router();

router.use('/api/v1', v1Router);

// Error 404
router.all('*', () => {
    throw new NotFoundError();
});
router.use(ErrorHandlerMiddleware);

export { router };
