"use client";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import { useContext, useRef } from 'react';
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

export function DonationCampaign() {

    const editor = useRef(null);
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.data.success) {
            const info = {
                image: res.data.data.display_url,
                name: data.name,
                amount: data.amount,
                lastDate: data.date,
                shortDes: data.shortDes,
                longDes: data.longDes,
                date: new Date(),
                email: user.email
            }
            console.log(info)
            const petRes = await axiosSecure.post('/donation', info)
            console.log(petRes.data);
            if (petRes.data.insertedId) {
                Swal.fire({
                    title: "Campaign Added Successfully!",
                    text: "Click Ok to Go Back",
                    icon: "success"
                });

            }
        }
        console.log('with image url', res.data);
    }


    return (
        <div>
            <h2 className='text-2xl text-center font-bold underline'>Create Donation Campaign</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-xl flex-col gap-4 mx-auto mt-5">
                <div className="flex gap-5">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="img" value="Pet Image" />
                        </div>
                        <FileInput {...register('image')} id="file-upload" />
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="petName" value="Pet Name" />
                        </div>
                        <TextInput {...register("name")} id="petName" type="text" required />
                    </div>
                </div>
                <div className="flex w-full gap-5">
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="petName" value="Donation Amount" />
                        </div>
                        <TextInput {...register("amount")} id="petName" type="number" required />
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="petAge" value="Last Date of Donation" />
                        </div>
                        <TextInput {...register("date")} id="petAge" type="date" required />
                    </div>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="shortDes" value="Pet Short Description" />
                    </div>
                    <Textarea {...register("shortDes")} id="comment" placeholder="Leave a short Description..." required rows={2} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="longDes" value="Pet Long Description" />
                    </div>
                    <Textarea {...register("longDes")} id="comment" placeholder="Leave a Long Description..." required rows={4} />
                </div>


                <Button className='bg-[#FA524F]' type="submit">Submit</Button>
            </form>
        </div>
    )
}




export default DonationCampaign;