const API_HOST_LIST = {
    development: 'http://localhost:9004',
    production: '/'
};
export const CLIENT_ENV = process.env.NODE_ENV || 'development';
export const API_HOST = API_HOST_LIST[CLIENT_ENV];
window.DEV = CLIENT_ENV === 'development';