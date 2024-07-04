import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const usePet = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { refetch, data:pet=[]} = useQuery({
        queryKey: ['pet', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet?email=${user.email}`);
            return res.data;
        }
    })
    return [pet, refetch]
};

export default usePet;