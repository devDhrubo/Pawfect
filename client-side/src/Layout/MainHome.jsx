import ChooseUs from "../Pages/Home/ChooseUs/ChooseUs";
import Cta from "../Pages/Home/Cta/Cta";
import Donate from "../Pages/Home/Donate/Donate";
import About from "../Pages/Home/Home/About/About";
import Home from "../Pages/Home/Home/Home";
import PetCategory from "../Pages/Home/PetCategory/PetCategory";

const MainHome = () => {
    return (
        <div>
            <Home></Home>
            <PetCategory></PetCategory>
            <About></About>
            <Cta></Cta>
            <ChooseUs></ChooseUs>
            <Donate></Donate>
        </div>
    );
};

export default MainHome;