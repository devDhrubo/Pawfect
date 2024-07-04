
"use client";

import { Button, Label, TextInput } from "flowbite-react";
// import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function SignUp() {
    const [registerError, setError] = useState();

    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        Swal.fire({
                            title: "Registration Successful!",
                            icon: "success"
                        });

                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("User Added");
                                    reset();
                                    toast.success('Registration successful');
                                }
                            })
                        logOut()
                            .then(() => {
                                navigate('/login')
                            })
                    })
                    .catch(errors => {
                        setError(errors)
                    })
            })
    }

    return (
        <div>
            <div className="h-20">
                <h2 className="text-4xl font-bold mb-4 text-center pt-10 underline">Register Here</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 mx-auto mt-6 bg-gray-100 p-10 rounded-lg">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput {...register("name", { required: true })} id="name" type="text" placeholder="Enter Your Name" required shadow />
                    {errors.email && <span className="text-red-500">Name is required</span>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Email" />
                    </div>
                    <TextInput {...register("email", { required: true })} id="email2" type="email" placeholder="Enter Your Email" required shadow />
                    {errors.email && <span className="text-red-500">Email is required</span>}

                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Photo URL" />
                    </div>
                    <TextInput {...register("photourl", { required: true })} id="email2" type="text" placeholder="Photo URL" required shadow />
                    {errors.email && <span className="text-red-500">Photo URL is required</span>}

                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput {...register("password", { required: true })} id="password" placeholder="Enter Your Password" type="password" required shadow />
                </div>
                {
                    registerError && <p className="text-red-500">{registerError}</p>
                }
                <Button className="bg-[#FA524F]" type="submit">Register new account</Button>
                
                <p>Already Registered <Link to='/login'><a className='underline text-blue-600' href="">Login</a></Link></p>
            </form>
        </div>
    );
}

export default SignUp;
