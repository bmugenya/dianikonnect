import Navbar from  '../components/navbar/Navbar'
import LoginModal from  '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal';
import RentModal from '../components/modals/RentModal';
 import ToasterProvider from '../providers/ToasterProvider';
 import Listing from "../components/Listing";
  import ListingPage from "../pages/listing";
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom'
 import Categories from "../components/navbar/Categories";
import { useSelector } from 'react-redux'


function Router() {
const { user } = useSelector((state) => state.user)
  return (
    <>
       <BrowserRouter>
           <ToasterProvider />
    <LoginModal />
      <RegisterModal />
        <RentModal />
   <Navbar currentUser={user} />
   <div className="pb-20 pt-28">
      <Routes>

      <Route path='/' element={
        <>
         <Categories />
        <Listing />
        </>


    } />
       <Route path='/listing/:id' element={<ListingPage />} />
        </Routes>
        </div>
        </BrowserRouter>
        </>

  )
}

export default Router
