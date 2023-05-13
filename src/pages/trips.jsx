import { useEffect } from "react";
import TripsClient from "../components/listing/TripClient";
import { useDispatch, useSelector } from 'react-redux'
import { getTripsAsync } from "../features/trips/tripsActions";
import { useParams } from "react-router-dom";


function TripsPage() {

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.currentUser)


  useEffect(() => {
    dispatch(getTripsAsync(1))
    },[])

  return (
    <>
      <TripsClient
        currentUser={currentUser}
        
      />
    </>
  )
}

export default TripsPage
