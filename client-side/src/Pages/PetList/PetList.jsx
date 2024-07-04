import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const PetList = () => {
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    const { data: pets = [] } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pet');
            return res.data;
        }
    });


    return (
        <div>
            {/* search bar start*/}
            <div>
                <label className="input input-bordered flex items-center gap-2 max-w-md mx-auto mt-2 mb-5">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>
            {/* search bar end */}
            <div className="grid grid-cols-3 gap-5">
                {
                    pets?.filter((item) => {
                        return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                    })?.map(pet => <Card key={pet._id}
                        className="max-w-sm"
                        imgSrc={pet.image || <Skeleton />}
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {pet.name || <Skeleton />}
                        </h5>
                        <div className="flex items-center justify-between ">
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                <span className="font-bold">Age:</span> {pet.age || <Skeleton />}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                <span className="font-bold">Location:</span> {pet.location || <Skeleton />}
                            </p>
                        </div>
                        <Link to={`/pet-details/${pet._id}`}>
                            <Button className="bg-[#FA524F] text-white">View Details</Button>
                        </Link>
                    </Card>)
                }
            </div>
        </div>
    );
};

export default PetList;