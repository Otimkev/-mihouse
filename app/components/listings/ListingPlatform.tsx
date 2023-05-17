"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { fetchListings, selectListings } from "@/app/slices/listingsSlice";
import { useEffect, useRef } from "react";
import ListingCard from "./ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ListingPlatformProps {
    data?: boolean;
}

const ListingPlatform: React.FC<ListingPlatformProps> = ({data}) => {
  const dispatch = useAppDispatch();
  const { listings, pending, error } = useAppSelector(selectListings);

  //const currentUser = await getCurrentUser();

  const listingRef = useRef(false);

  useEffect(() => {
    if(listingRef.current === false) {
        dispatch(fetchListings("food"));
    }

    return () => {
      listingRef.current = true;
    };
  }, []);

  return (
    <>
      {listings && listings.map((listing: any) => (
        <ListingCard
          key={listing.id}
          data={listing}
        />
      ))}
    </>
  );
};

export default ListingPlatform;
