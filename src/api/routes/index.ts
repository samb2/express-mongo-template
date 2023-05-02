import express, { Router } from 'express';
import { v1Router } from './v1';
import { NotFoundError, ErrorHandlerMiddleware } from 'irolegroup';

const router: Router = express.Router();

router.use('/api/v1', v1Router);

// Error 404
router.all('*', (): void => {
    throw new NotFoundError();
});
router.use(ErrorHandlerMiddleware);

export { router };
