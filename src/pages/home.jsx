import ListingCategory from "../components/listing/ListingCategory";
import { categories } from '../components/navbar/Categories';
import Button from "../components/Button";
import ListingCard from "../components/listing/ListingCard";
import { useDispatch, useSelector } from 'react-redux'
import { amenities } from "../utils/amenities"
import Loader from "../components/Loader"

function HomePage({listings ,isLoading}) {

 const { currentUser } = useSelector((state) => state.currentUser)

  return (
    <>
<div className="relative h-[600px] sm:h=[400px] lg:h=[500px] xl:h=[600px] 2xl:h-[700px]">
  <img
    className="w-full h-full object-cover"
    src="/images/banner.jpg"
    alt="Logo"
  />


<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
<p className="text-sm sm:text-lg">Not sure where to go? Perfect</p>
  <Button 
    label='Im flexible'
    small={true}
     />
 
</div>
</div>

<main className="max-w-7xl mx-auto px-8 sm:px-16">

<section className="pt-24">
<h2 className="text-4xl font-semibold pb-5">Explore Categories</h2>
    <div 
        className="
        pt-6
          grid 
          grid-cols-1 
          md:grid-cols-3 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
     {categories.map((item) => (
      <div key={item.label} className="col-span-1">
        <ListingCategory
          icon={item.icon} 
          label={item?.label}
          description={item?.description} 
        />
        </div>
      ))}
 </div>
 </section>


 <section className="pt-24">
<h2 className="text-4xl font-semibold pb-5">Live Anywhere</h2>
  
<div className="pt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
  {!listings ? (
    <Loader />
  ) : (
    <>
      {listings?.slice(0, 6).map((listing) => (
        <ListingCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
        />
      ))}
    </>
  )}
</div>

 </section>


 <section className="pt-24">
<h2 className="text-4xl font-semibold pb-5">Available Amenities</h2>
    <div 
        className="
        pt-6
          grid 
          grid-cols-1 
          md:grid-cols-3 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
     {amenities.map((item) => (
      <div key={item.label} className="col-span-1">
        <ListingCategory
          icon={item.icon} 
          label={item?.label}
          description={item?.description} 
        />
        </div>
      ))}
 </div>
 </section>


 <section className="pt-24">

       <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <img
          src='/images/jumb.jpg'
 
          className="object-cover w-full"
          alt="Image"
        />
        </div>

</section>

 </main>
    </>
  )
}

export default HomePage
