import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL: 'https://pawfect-server-gilt.vercel.app'
})
const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log("Request Stopped", token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
        function (error) {
            return Promise.reject(error);
        });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const response = error.response.status;
        // console.log("Error in interceptor", response);
        if (response === 401 || response === 403) {
            // await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });


    return axiosSecure;
};

export default useAxiosSecure;