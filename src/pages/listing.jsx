import { useEffect } from "react";
import ListingClient from "../components/listing/ListingClient";
import useAuthListener from '../hooks/use-auth-listener'
import { useDispatch, useSelector } from 'react-redux'
import { getListingAsync } from "../features/listing/listingActions";
import { useParams } from "react-router-dom";


function ListingPage() {

  let { id } = useParams()
const dispatch = useDispatch();

    const { listing } = useSelector((state) => state.listing)

 const { user, loading } = useAuthListener()

    useEffect(() => {
       
        dispatch(getListingAsync(id))
    },[])




  return (
    <>
      <ListingClient
        listing={listing}
        currentUser={user}
      />
    </>
  )
}

export default ListingPage
