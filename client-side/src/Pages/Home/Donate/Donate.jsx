import { Button } from "flowbite-react";
import donateBg from '../../../assets/donate.png';
const Donate = () => {
    return (
        <div>
            <section>
                <div className='absolute w-full container mx-auto'>
                    <img className='w-full rounded-lg' src={donateBg} alt="" />
                </div>
                <div className="space-y-3 relative lg:text-white lg:w-3/4 lg:top-14 top-32 lg:p-10 mx-auto">
                    <div className="lg:text-center space-y-2 p-4">
                        <h2 className='lg:text-4xl text-3xl font-bold'>Your Support, Their Second Chance at a Happier, Healthier Life</h2>
                        <p className="">Join our community of pet lovers and experience the joy of finding the perfect companion.</p>
                        <Button className="bg-[#FA524F] rounded-full flex items-center lg:mx-auto">Donate Now
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Donate;