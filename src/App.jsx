import Router from "./helpers/router"
import { getListingsAsync } from "./features/listings/listingsActions";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'

function App() {
    const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getListingsAsync())
  },[])

  return (
    <>
    <Router />
    </>
  )
}

export default App
