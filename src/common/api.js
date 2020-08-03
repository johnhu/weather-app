// Base API Configuration

import axios from 'axios';

export const API = axios.create({
    baseURL: '//api.openweathermap.org/data/2.5/'
});

API.interceptors.request.use(function (config) {

    config.params.APPID = 'cadb942492f5c2c67512076c9cd5e63d';
    config.params.units = 'imperial';

    return config;
}, function (error) {
    return Promise.reject(error);
});