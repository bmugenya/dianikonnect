import { useDispatch, useSelector } from 'react-redux'
import ListingCard from "./listing/ListingCard";
import Container from "./Container";
import Categories from "./navbar/Categories";
import Loader from "./Loader"

function Listing({listings,isLoading }) {
   console.log(isLoading)

 const { currentUser } = useSelector((state) => state.currentUser)

  return (
    <>
    <div  className="pt-24">
      <Categories />
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
         {isLoading === true ?

         <Loader />
:
              <>
    {listings?.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}

</>}
        </div>
      </Container>
    </div>
    </>
  )
}

export default Listing
