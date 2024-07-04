import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Avatar, Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AddedPetList = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState();

    const axiosSecure = useAxiosSecure();
    const { refetch, data: pets = [] } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pet');
            return res.data;
        }
    });

    const handleMakeAdmin = pets => {
        axiosSecure.patch(`pet/adopt/${pets._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Good job!",
                        text: `${pets.name} is Adopted`,
                        icon: "success"
                    });
                }
            })
    }


    useEffect(() => {
        fetch(`https://pawfect-server-gilt.vercel.app/pet/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [user])

    const handleDelete = _id => {
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/added-pet/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Pet Deleted Successfully.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }


    return (
        <div>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className="p-4">
                            #
                        </Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Adoption Status</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            data?.map((item, index) =>
                                <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="p-4">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </Table.Cell>
                                    <Table.Cell>{item.category}</Table.Cell>
                                    <Table.Cell><Avatar img={item.image} /></Table.Cell>
                                    <Table.Cell>{item.adopted}</Table.Cell>
                                    <Table.Cell className="flex gap-3">
                                        <Link to={`/dashboard/update-pet/${item._id}`}>
                                            <Button className="font-medium text-white dark:text-cyan-500 bg-blue-600">
                                                Update
                                            </Button>
                                        </Link>
                                        <Link>
                                            <Button onClick={() => handleDelete(item._id)} href="#" className="font-medium text-white bg-red-600 dark:text-cyan-500">
                                                Delete
                                            </Button>
                                        </Link>

                                        {
                                            item.adopted === 'Adopted' ? < Button disabled className="bg-green-500 text-white"> Adopted</Button>
                                                :
                                                < Button className="bg-green-500 text-white" onClick={() => handleMakeAdmin(item)} > Adopt</Button>
                                        }



                                    </Table.Cell>
                                </Table.Row>)
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default AddedPetList;