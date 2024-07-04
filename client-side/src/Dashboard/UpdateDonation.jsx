import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateDonation = () => {

        const donations = useLoaderData();
        // const { name } = donations;
        console.log(donations)

        const { register } = useForm();


        return (
            <div>
                <div>
                    <h2 className='text-2xl text-center font-bold underline'>Update Donation : {donations.name}</h2>
                    <form className="flex max-w-xl flex-col gap-4 mx-auto mt-5">
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
                                <TextInput defaultValue={name} id="petName" type="text" required />
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
            </div>
        );
    };

    export default UpdateDonation;