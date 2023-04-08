const serverConfig = {
    debug: process.env.DEBUG,
    port: process.env.PORT,
    endpoint: process.env.ENDPOINT,
    environment: process.env.NODE_ENV,
};

export { serverConfig as server };
