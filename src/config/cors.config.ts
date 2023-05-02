import cors from 'cors';

const allowedOrigins: string[] = ['*'];

const corsConfig: cors.CorsOptions = {
    origin: allowedOrigins,
};
export { corsConfig as cors };
