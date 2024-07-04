import dog from '../../../../assets/dog.jpg'
import { FaBone } from "react-icons/fa";

const About = () => {
    return (
        <section className="lg:flex bg-white items-center lg:px-32 p-4 min-h-screen lg:gap-10 rounded-lg dark:bg-gray-800 dark:text-white">
            <div>
                <img src={dog} alt="" />
            </div>
            <div className="space-y-3 p-3 lg:w-3/4">
                <p className="text-[#FA524F]">----About Us</p>
                <h2 className='text-4xl font-bold'>The Best for Your Pet!</h2>
                <p className="">Our mission is to connect loving pets with caring families. At Pawfect, we believe every pet deserves a forever home.</p>
                <ol className='space-y-3'> 
                   <li className="flex items-center gap-2"><FaBone className="text-[#FA524F]"></FaBone> Ensuring every pet finds a loving and caring home.</li>
                   <li className="flex items-center gap-2"><FaBone className="text-[#FA524F]"></FaBone> Collaborations with reputable shelters, foster homes.</li>
                   <li className="flex items-center gap-2"><FaBone className="text-[#FA524F]"></FaBone> Opportunities to adopt, volunteer, donate, or spread the word.</li>
                </ol>
               
            </div>

        </section>
    );
};

export default About;