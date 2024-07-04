import { FaBone } from 'react-icons/fa';
import chooseBg from '../../../assets/choose.png';
const ChooseUs = () => {
    return (
        <div>
            <section className="lg:flex bg-white items-center lg:px-32 p-4 lg:mt-52 min-h-screen lg:gap-10 rounded-lg dark:bg-gray-800 dark:text-white">

                <div className="space-y-3 lg:w-1/2">
                    <p className="text-[#FA524F]">----Why Choose Us</p>
                    <h2 className='lg:text-4xl text-3xl font-bold'>Our team of volunteers is truly committed</h2>
                    <p className="">Join us today and be a part of the Pawfect family! Together, we can ensure every pet finds a loving home.</p>
                <ol className='space-y-2'> 
                   <li className="flex items-center gap-2"><FaBone className="text-[#FA524F]"></FaBone>Assist local shelters with daily tasks, pet care, and socialization.</li>
                   <li className="flex items-center gap-2"><FaBone className="text-[#FA524F]"></FaBone> Help organize and run adoption events, fundraisers, and community outreach programs.</li>
                   <li className="flex items-center gap-2"><FaBone className="text-[#FA524F]"></FaBone> Aid in transporting pets to vet appointments, foster homes, and adoption events.</li>
                </ol>
                </div>
                <div>
                    <img className='w-[450px]' src={chooseBg} alt="" />
                </div>

            </section>
        </div>

    );
};

export default ChooseUs;