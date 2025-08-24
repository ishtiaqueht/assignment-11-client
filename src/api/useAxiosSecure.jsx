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
        console.log(error)
        if (error.status === 401 || error.status === 403) {
            signOutUser()
                .then(() => {
                    console.log('sign out user for 401 status code')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        return Promise.reject(error)
    })

    return axiosInstance;
};

export default useAxiosSecure;