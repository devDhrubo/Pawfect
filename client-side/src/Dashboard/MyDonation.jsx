import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Avatar, Button, Label, Modal, Progress, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure, { axiosSecure } from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyDonation = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState();
    console.log(data)

    const [isOn, setIsOn] = useState(false);

    const toggle = () => setIsOn(!isOn);

    useEffect(() => {
        fetch(`https://pawfect-server-gilt.vercel.app/donation/${user?.email}`)
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
                axiosSecure.delete(`/donation/${_id}`)
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

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
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
                        <Table.HeadCell>Amount</Table.HeadCell>
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
                                    <Table.Cell>{item.amount}</Table.Cell>
                                    <Table.Cell>
                                        <Progress
                                            progress={45}
                                            progressLabelPosition="inside"
                                            textLabel="Donation"
                                            textLabelPosition="outside"
                                            size="lg"
                                            labelProgress
                                            labelText
                                        />
                                    </Table.Cell>
                                    <Table.Cell className="flex gap-3">
                                        <Link to={`/dashboard/update-donation/${item._id}`}>
                                            <Button className="font-medium text-white dark:text-cyan-500 bg-blue-600">
                                                Update
                                            </Button>
                                        </Link>

                                        <Button onClick={toggle} className="text-xl bg-green-500">{isOn ? 'PAUSED' : 'RUNNING'}</Button>

                                        <Button onClick={() => setOpenModal(true)}>View Donator</Button>
                                        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                            <Modal.Header />
                                            <Modal.Body>
                                                <Table>
                                                    <Table.Head>
                                                        <Table.HeadCell>Donator name</Table.HeadCell>
                                                        <Table.HeadCell>Email</Table.HeadCell>
                                                    </Table.Head>
                                                    <Table.Body className="divide-y">
                                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                {'Dolan Dhrubo Ray'}
                                                            </Table.Cell>
                                                            <Table.Cell>dolandhruboray@gmail.com</Table.Cell>
                                                        </Table.Row>
                                                        
                                                    </Table.Body>
                                                </Table>
                                            </Modal.Body>
                                        </Modal>



                                    </Table.Cell>
                                </Table.Row>)
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default MyDonation;