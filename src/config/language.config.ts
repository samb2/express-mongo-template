import path from 'path';

const localesConfig = {
    locales: ['en', 'de', 'fr'],
    directory: path.resolve('./resource/locales'),
    defaultLocale: 'en',
    objectNotation: true,
    updateFiles: true,
    queryParameter: 'accept-language',
    register: global,
};

export { localesConfig as language };
