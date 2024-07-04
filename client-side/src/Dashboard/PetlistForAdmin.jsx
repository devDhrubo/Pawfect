import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Avatar, Button, Table } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

const PetlistForAdmin = () => {

    const axiosSecure = useAxiosSecure();
    const { data: pets = [], refetch } = useQuery({
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

    return (
        <div>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            pets.map((pet, index) =>
                                <Table.Row key={pet._id}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{pet.name || <Skeleton />}</Table.Cell>
                                    <Table.Cell><Avatar img={pet.image || <Skeleton />} bordered /></Table.Cell>
                                    <Table.Cell>{pet.adopted}</Table.Cell>
                                    <Table.Cell>
                                        {
                                            pets.adopted === 'Adopted' ? < Button disabled className="bg-green-500 text-white"> Adopted</Button>
                                                :
                                                < Button className="bg-green-500 text-white" onClick={() => handleMakeAdmin(pet)} > Adopt</Button>
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

export default PetlistForAdmin;