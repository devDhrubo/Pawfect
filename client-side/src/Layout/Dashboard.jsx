
"use client";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoIosAddCircle, IoIosCreate } from "react-icons/io";
import { MdPets } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import { ListGroup } from "flowbite-react";
import logo from '../assets/pawfect logo.png'
import useAdmin from "../Hooks/useAdmin";


export function Dashboard() {

    const [isAdmin] = useAdmin();


    return (
        <div className="flex poppins">
            <div className="w-80 min-h-screen bg-[#1C2434]">
                {
                    isAdmin ?
                        <>

                            {/* ADMIN DASHBOARD */}
                            <Link to='/'>
                                <div className="flex items-center p-5 text-white">
                                    <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pawfect</span>
                                </div>
                            </Link>
                            <ListGroup className="p-4 text-white bg-[#1C2434]">
                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/all-user'>
                                        <div className="flex items-center gap-2"><AiFillDollarCircle />
                                            All Users</div></NavLink>
                                </ListGroup.Item>

                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/pet-list-admin'>
                                        <div className="flex items-center gap-2"><AiFillDollarCircle />
                                            All Pets</div></NavLink>
                                </ListGroup.Item>

                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/all-donation'>
                                        <div className="flex items-center gap-2"><AiFillDollarCircle />
                                            All Donation</div></NavLink>
                                </ListGroup.Item>
                            </ListGroup>

                        </>
                        :
                        <>
                            <ListGroup className="p-4 text-white bg-[#1C2434]">
                                <Link to='/'><div>
                                    <h2 className="text-white text-xl font-bold mb-8 mt-2 flex items-center ml-3 ">Pawfect <img src={logo} className="w-14" alt="" /></h2>
                                </div></Link>
                                <div className="divider"></div>
                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]" active>
                                    <NavLink to='/dashboard/add-pet'>
                                        <div className="flex items-center gap-2"><IoIosAddCircle />
                                            Add a Pet</div></NavLink>
                                </ListGroup.Item>

                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/added-pet'>
                                        <div className="flex items-center gap-2"><MdPets />
                                            My Added Pets</div></NavLink>
                                </ListGroup.Item>

                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/'>
                                        <div className="flex items-center gap-2"><BsFillQuestionSquareFill />
                                            Adoption Request</div></NavLink>
                                </ListGroup.Item>
                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/donation-campaign'>
                                        <div className="flex items-center gap-2"><IoIosCreate />
                                            Create Donation Campaign</div></NavLink>
                                </ListGroup.Item>
                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/my-donation'>
                                        <div className="flex items-center gap-2"><GoFileDirectoryFill />
                                            My Donation Campaign</div></NavLink>
                                </ListGroup.Item>
                                <ListGroup.Item className="flex p-2 rounded-lg hover:bg-[#333A48]">
                                    <NavLink to='/dashboard/all-donation'>
                                        <div className="flex items-center gap-2"><AiFillDollarCircle />
                                            My Donations</div></NavLink>
                                </ListGroup.Item>
                            </ListGroup>

                        </>
                }

            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
}


export default Dashboard;