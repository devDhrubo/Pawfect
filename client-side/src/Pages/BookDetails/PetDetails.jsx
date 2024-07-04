import { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import Swal from "sweetalert2";

const PetDetails = () => {

    const { id } = useParams();
    const pets = useLoaderData();
    console.log(pets);
    const { user } = useContext(AuthContext);

    const { _id, name, age, location, shortDes } = pets;
    const pet = pets.find((pet) => pet._id === id);

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    const handleAddPet = e => {
        e.preventDefault();
        const form = e.target;
        const username = user?.displayName;
        const userEmail = user?.email;
        const petName = pet.name;
        const petImg = pet.image;
        const userPhone = form.phoneNumber.value;
        const address = form.address.value;


        const info = { username, userEmail, petName, petImg, userPhone, address };
        console.log(info)

        fetch('https://pawfect-server-gilt.vercel.app/adoption', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                form.reset();
                if (data.insertedId) {
                    Swal.fire("Pet Adopt Successfully");
                }
            })

        console.log(info);
    }

    return (
        <div>
            <Card className="max-w-full h-72 mx-auto mt-20" imgSrc={pet.image} horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {pet.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {pet.shortDes}
                </p>
                {/* modal */}

                <Button onClick={() => setOpenModal(true)}>Adopt</Button>
                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <form onSubmit={handleAddPet}>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{pet.name}</h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="Username" />
                                    </div>
                                    <TextInput defaultValue={user.displayName} readOnly />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email" value="Email" />
                                    </div>
                                    <TextInput
                                        id="email"
                                        defaultValue={user.email}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="Phone" />
                                    </div>
                                    <TextInput name="phoneNumber" type="number" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="Address" />
                                    </div>
                                    <TextInput name="address" type="text" />
                                </div>


                                <div className="w-full">
                                    <Button type="submit">Submit</Button>
                                </div>

                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </Card>
        </div>
    );
};

export default PetDetails;