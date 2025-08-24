import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const axiosInstance = axios.create({
    baseURL: 'https://assignment-11-server-self-psi.vercel.app/'
})

const useAxiosSecure = () => {
    const { user, signOutUser } = useContext(AuthContext);

    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    });

    // response interceptor
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.status === 401 || error.status === 403) {
            signOutUser()
                .then(() => {
                })
                .catch(err => {
                })
        }
        return Promise.reject(error)
    })

    return axiosInstance;
};

export default useAxiosSecure;