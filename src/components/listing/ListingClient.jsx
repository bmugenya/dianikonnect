
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import Container from '../Container';
import { categories } from "../navbar/Categories";
import ListingReservation from "./ListingReservation";
import { useCallback, useEffect, useMemo, useState } from "react";



const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

function ListingClient({
  listing,
  reservations = [],
  currentUser
}) {

   const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
   const [dateRange, setDateRange] = useState(initialDateRange);

  const disabledDates = useMemo(() => {
    let dates = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);


    const onCreateReservation = () => {

    }

  return (
    <>
 <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing['title']}
            imageSrc={listing['image_src']}
            locationValue={listing['location_value']}
            id={listing['id']}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
           <ListingInfo
              user={listing['user']}
              category={category}
   
              description={listing['description']}
              roomCount={listing['room_count']}
              guestCount={listing['guest_count']}
              bathroomCount={listing['bathroom_count']}
              locationValue={listing['location_value']}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />

            </div>
          </div>
        </div>
      </div>
    </Container>
    </>
  )
}

export default ListingClient
