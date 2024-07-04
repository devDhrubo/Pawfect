import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Button, Table } from "flowbite-react";
import Skeleton from "react-loading-skeleton";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div className="flex justify-between mb-5">
                <h2 className="text-2xl">All User:</h2>
                <h2 className="text-2xl">Total User: {users.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>#</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Role</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {
                                users.map((user, index) =>
                                    <Table.Row key={user._id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{user.name || <Skeleton/>}</Table.Cell>
                                        <Table.Cell>{user.email || <Skeleton/>}</Table.Cell>
                                        <Table.Cell>
                                            {user.role === 'admin' ? 'Admin' : <Button onClick={() => handleMakeAdmin(user)} className="btn text-white bg-orange-500 btn-sm"><FaUser></FaUser></Button>
                                            }
                                        </Table.Cell>
                                    </Table.Row>)
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;