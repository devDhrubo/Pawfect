import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: "https://pawfect-server-gilt.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;