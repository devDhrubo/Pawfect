import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footers";

const Root = () => {
    return (
        <div className="mx-auto px-10 poppins dark:bg-gray-800">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;