"use client";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { Controller, useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

export function UpdatePage() {
    // const { id } = useParams();
    // const [pets, setPets] = useState([]);

    // useEffect(() => {
    //     fetch('https://pawfect-server-gilt.vercel.app/pet')
    //         .then(res => res.json())
    //         .then(data => {
    //             setPets(data);
    //         })
    // }, [])

    // const { _id, name, image, age, category, location, shortDes, longDes } = pets;
    // const pet = pets.find((pet) => pet._id === id);
    // console.log(pet);

    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const image = form.image.value;
    //     const name = form.name.value;
    //     const author = form.author.value;
    //     const category = form.category.value;
    //     const rating = form.rating.value;

    //     const info = { image, name, author, category, rating };

    //     fetch(`https://readio-server.vercel.app/bookList/${_id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(info)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.modifiedCount > 0) {
    //                 Swal.fire({
    //                     title: "Updated!",
    //                     text: "Your Spot has been updated.",
    //                     icon: "success"
    //                 });
    //             }
    //         })
    // }



    const editor = useRef(null);
    const { register, control } = useForm();



    const joditConfig = {
        readonly: false
    }

    return (
        <div>
            <h2 className='text-2xl text-center font-bold underline'>Update Pet</h2>
            <form className="flex max-w-xl flex-col gap-4 mx-auto mt-5">
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
                        <TextInput id="petName" type="text" required />
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="petAge" value="Pet Age" />
                        </div>
                        <TextInput id="petAge" type="number" required />
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
                        <TextInput id="petLocation" type="text" required />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="shortDes" value="Pet Short Description" />
                    </div>
                    <Textarea id="comment" placeholder="Leave a comment..." required rows={2} />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="petAge" value="Pet Long Description" />
                    </div>
                    <Controller
                        name="content"
                        control={control}
                        defaultValue={''}
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




export default UpdatePage;