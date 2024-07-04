import { Button } from "flowbite-react";
import bgHome from '../../../assets/home.png';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="mb-72 ">
                <div className='absolute w-full container mx-auto'>
                    <img className='w-full rounded-lg' src={bgHome} alt="" />
                </div>
                <div className="space-y-3 relative text-black top-32 left-5 lg:w-1/2 lg:p-10 p-4">
                    <h2 className='lg:text-5xl md:text-3xl text-2xl font-bold'>Want a pet for your loved ones?</h2>
                    <p className="mr-3">Welcome to Pawfect, the ultimate destination <br /> for pet adoption!</p>
                    <Link to='/pet-list'><Button className="bg-[#FA524F] rounded-full flex items-center mt-3">Adopt Now
                    </Button></Link>
                </div>
        </section>
    );
};

export default Home;