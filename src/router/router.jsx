import {  useEffect } from "react";
import Navbar from  '../components/navbar/Navbar'
import LoginModal from  '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal';
import RentModal from '../components/modals/RentModal';
 import ToasterProvider from '../providers/ToasterProvider';
 import Listing from "../components/Listing";
  import ListingPage from "../pages/listing";
    import TripsPage from "../pages/trips";
    import FavoritePage from "../pages/favorite";
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom'
 import Categories from "../components/navbar/Categories";
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUserAsync } from '../features/user/userActions'
import useAuthListener from '../hooks/use-auth-listener'
import { getListingsAsync } from "../features/listings/listingsActions";
function Router() {

const { user, loading } = useAuthListener()


 const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser)
const { listings } = useSelector((state) => state.listings)

  useEffect(() => {
    dispatch(getListingsAsync())
    if (user?.user_id) {
      dispatch(getCurrentUserAsync(user.user_id));
    }
  }, [dispatch, user]);

  return (
    <>
       <BrowserRouter>
           <ToasterProvider />
    <LoginModal />
      <RegisterModal />
        <RentModal />
   <Navbar currentUser={currentUser}/>
   <div className="pb-20 pt-28">
      <Routes>

      <Route path='/' element={
        <>
         <Categories />
        <Listing listings={listings}/>
        </>


    } />
       <Route path='/listing/:id' element={<ListingPage />} />
       <Route path='/trips' element={<TripsPage />} />
       <Route path='/favorites' element={<FavoritePage />} />
        </Routes>
        </div>
        </BrowserRouter>
        </>

  )
}

export default Router
