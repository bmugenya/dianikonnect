import HeartButton from "../HeartButton";
import Button from "../Button";
import useCountries from "../../hooks/useCountries";
import Heading from "../Heading";

function ListingHead({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) {
 
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  console.log(location)
  

  return (
    <>
 <Heading
        title={title}
        subtitle={`${locationValue?.region}, ${locationValue?.label}`}
   
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <img
          src={imageSrc}
 
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>

    </>
  )
}

export default ListingHead
