import { useContext, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Button, Card, Label, Modal, TextInput } from "flowbite-react";

const DonationDetails = () => {

    const { id } = useParams();
    const donations = useLoaderData();
    console.log(donations);
    const { user } = useContext(AuthContext);

    const { _id, name, image, amount, date } = donations;
    const donation = donations.find((donation) => donation._id === id);

    return (
        <div>
            <h2>Donation Details</h2>
            <Card className="max-w-full h-72 mx-auto mt-20" imgSrc={donation.image} horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {donation.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {donation.shortDes}
                </p>
                {/* modal */}

                <Link to='/dashboard/payment' amount={amount}> <Button>Donate</Button></Link>
                {/* <Button onClick={() => setOpenModal(true)}>Donate</Button> */}
            </Card>
        </div>
    );
};

export default DonationDetails;