import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const PetCategory = () => {
    return (
        <div>
            <div className="text-center mt-5 space-y-2 text-black dark:bg-gray-800">
                <h2 className="text-4xl font-bold">Pet Category</h2>
                <p>Find Your Favourite Pet And Be the Guardian</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10 px-32 ml-20">
                <Card className="max-w-[200px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Cat
                    </h5>
                    <Link to='/pet-list'>
                        <Button className="bg-[#FA524F]">
                            Adopt Now
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </Link>
                </Card>
                <Card className="max-w-[200px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Dog
                    </h5>
                    <Link to='/pet-list'>
                        <Button className="bg-[#FA524F]">
                            Adopt Now
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </Link>
                </Card>
                <Card className="max-w-[200px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Parrot
                    </h5>
                    <Link to='/pet-list'>
                        <Button className="bg-[#FA524F]">
                            Adopt Now
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </Link>
                </Card>
                <Card className="max-w-[200px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Fish
                    </h5>
                    <Link to='/pet-list'>
                        <Button className="bg-[#FA524F]">
                            Adopt Now
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </Link>
                </Card>
                <Card className="max-w-[200px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Hamster
                    </h5>
                    <Link to='/pet-list'>
                        <Button className="bg-[#FA524F]">
                            Adopt Now
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </Link>
                </Card>
                <Card className="max-w-[200px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Horse
                    </h5>
                    <Link to='/pet-list'>
                        <Button className="bg-[#FA524F]">
                            Adopt Now
                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default PetCategory;