import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import MainHome from "../Layout/MainHome";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import Dashboard from "../Layout/Dashboard";
import AddPet from "../Dashboard/AddPet";
import AddedPetList from "../Dashboard/AddedPetList";
import UpdatePage from "../Dashboard/UpdatePage";
import PetList from "../Pages/PetList/PetList";
import BookDetails from "../Pages/BookDetails/PetDetails";
import AllUsers from "../Dashboard/AllUsers";
import DonationCampaign from "../Dashboard/DonationCampaign";
import MyDonation from "../Dashboard/MyDonation";
import AllDonation from "../Dashboard/AllDonation";
import DonationDetails from "../Dashboard/DonationDetails";
import Payment from "../Payment/Payment";
import PetlistForAdmin from "../Dashboard/PetlistForAdmin";
import UpdateDonation from "../Dashboard/UpdateDonation";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <MainHome></MainHome>
      },
      {
        path: '/pet-list',
        element: <PetList></PetList>
      },
      {
        path: '/pet-details/:id',
        element: <BookDetails></BookDetails>,
        loader: () => fetch('https://pawfect-server-gilt.vercel.app/pet')
      },
      {
        path: '/donation-details/:id',
        element: <DonationDetails></DonationDetails>,
        loader: () => fetch('https://pawfect-server-gilt.vercel.app/donation')
      }

    ]

  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <SignUp></SignUp>
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'add-pet',
        element: <AddPet></AddPet>
      },
      {
        path: 'added-pet',
        element: <AddedPetList></AddedPetList>
      },
      {
        path: 'update-pet/:id',
        element: <UpdatePage></UpdatePage>
      },
      {
        path: 'update-donation/:id',
        element: <UpdateDonation></UpdateDonation>
      },
      {
        path: 'donation-campaign',
        element: <DonationCampaign></DonationCampaign>
      },
      {
        path: 'my-donation',
        element: <MyDonation></MyDonation>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },


      // admin route
      {
        path: 'all-user',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'all-donation',
        element: <AllDonation></AllDonation>
      },
      {
        path: 'pet-list-admin',
        element: <PetlistForAdmin></PetlistForAdmin>
      }
    ]
  }
]);

export default router;