import cors from 'cors';

const allowedOrigins = ['*'];

const corsConfig: cors.CorsOptions = {
    origin: allowedOrigins,
};
export { corsConfig as cors };
