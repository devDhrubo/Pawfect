import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const AllDonation = () => {

    const axiosSecure = useAxiosSecure();
    const { data: donations = [] } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation');
            return res.data;
        }
    });

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                {
                    donations?.map(donation => <Card key={donation._id}
                        className="max-w-sm"
                        imgSrc={donation.image}
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {donation.name}
                        </h5>

                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            <span className="font-bold">Max Amount:</span> $ {donation.amount}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            <span className="font-bold">Donated Amount:</span> $ {donation.amount}
                        </p>
                        <Link to={`/donation-details/${donation._id}`}>
                            <Button className="bg-[#FA524F] text-white">View Details</Button>
                        </Link>
                    </Card>)
                }
            </div>
        </div>
    );
};

export default AllDonation;