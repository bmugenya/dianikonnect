import { configureStore  } from '@reduxjs/toolkit'
import user from './features/user/userSlice'
import listings from './features/listings/listingsSlice'
import listing from './features/listing/listingSlice'

const store = configureStore({
  reducer: {
    user,
    listings,
    listing
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export default store