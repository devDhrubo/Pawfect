"use client";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import JoditEditor from 'jodit-react';
import { useContext, useRef } from 'react';
import { Controller, useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

export function AddPet() {

    const editor = useRef(null);
    const { register, handleSubmit, control } = useForm();
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
                category: data.category,
                age: data.age,
                location: data.location,
                shortDes: data.shortDes,
                longDes: data.content,
                adopted: 'Not Adopted',
                email: user.email,
                date: new Date()
            }
            const petRes = await axiosSecure.post('/pet', info)
            console.log(petRes.data);
            if (petRes.data.insertedId) {
                Swal.fire({
                    title: "Pet Added Successfully!",
                    text: "Click Ok to Go Back",
                    icon: "success"
                });
                
            }
        }
        console.log('with image url', res.data);
    }


    const joditConfig = {
        readonly: false
    }

    return (
        <div>
            <h2 className='text-2xl text-center font-bold underline'>Add Pet</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-xl flex-col gap-4 mx-auto mt-5">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="img" value="Pet Image" />
                    </div>
                    <FileInput {...register('image')} id="file-upload" />
                </div>
                <div className="flex w-full gap-5">
                    <div className="w-3/4">
                        <div className="mb-2 block">
                            <Label htmlFor="petName" value="Pet Name" />
                        </div>
                        <TextInput {...register("name")} id="petName" type="text" required />
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="petAge" value="Pet Age" />
                        </div>
                        <TextInput {...register("age")} id="petAge" type="number" required />
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="petAge" value="Pet Category" />
                        </div>
                        <select {...register("category")}>
                            <option disabled selected>Select A Category</option>
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                            <option value="Fish">Fish</option>
                            <option value="Horse">Horse</option>
                            <option value="Parrot">Parrot</option>
                            <option value="Hamster">Hamster</option>
                            <option value="Rabbit">Rabbit</option>
                            <option value="Snake">Snake</option>
                            <option value="Chicken">Chicken</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="petLocation" value="Pet Location" />
                        </div>
                        <TextInput {...register("location")} id="petLocation" type="text" required />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="shortDes" value="Pet Short Description" />
                    </div>
                    <Textarea {...register("shortDes")} id="comment" placeholder="Leave a comment..." required rows={2} />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="petAge" value="Pet Long Description" />
                    </div>
                    <Controller
                        name="content"
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                            <JoditEditor
                                config={joditConfig}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                ref={field.ref}
                            />
                        )}
                    />
                </div>
                <Button className='bg-[#FA524F]' type="submit">Submit</Button>
            </form>
        </div>
    )
}




export default AddPet;