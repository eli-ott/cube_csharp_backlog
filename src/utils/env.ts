const requiredEnv = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL,
    API_KEY: process.env.REACT_APP_API_KEY,
};

Object.entries(requiredEnv).forEach(([key, value]) => {
    if (!value) {
        console.error(`Missing environment variable: ${key}`);
        throw new Error(`Missing environment variable: ${key}`);
    }
});

export const BASE_URL = requiredEnv.BASE_URL as string;
export const API_KEY = requiredEnv.API_KEY as string;