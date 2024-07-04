import { Button } from 'flowbite-react';
import cta from '../../../assets/ctaBanner.png';
import { Link } from 'react-router-dom';

const Cta = () => {
    return (
        <section>
            <div className='lg:absolute w-full container mx-auto'>
                <img className='w-full rounded-lg' src={cta} alt="" />
            </div>
            <div className="space-y-3 lg:relative lg:text-white lg:top-32 lg:left-5 lg:w-1/2 lg:p-10 p-5">
                <h2 className='lg:text-5xl text-3xl font-bold'>Want a pet for your loved ones?</h2>
                <p className="">Discover your new best friend today and make a difference in their life and yours.</p>
                <Link to='/pet-list'><Button className="bg-[#FA524F] rounded-full flex items-center mt-3">Adopt Now
                </Button></Link>
            </div>
        </section>
    );
};

export default Cta;