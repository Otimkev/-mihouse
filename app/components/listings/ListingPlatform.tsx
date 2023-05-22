"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { fetchListings, selectListings } from "@/app/slices/listingsSlice";
import { useEffect, useRef } from "react";
import ListingCard from "./ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Loading from "@/app/loading";

interface ListingPlatformProps {
  data?: boolean;
}

const ListingPlatform: React.FC<ListingPlatformProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { listings, pending, error } = useAppSelector(selectListings);

  //const currentUser = await getCurrentUser();

  const listingRef = useRef(false);

  useEffect(() => {
    if (listingRef.current === false) {
      dispatch(fetchListings("food"));
    }
    return () => {
      listingRef.current = true;
    };
  }, []);

  return (
    <>
      {listings.length !== 0 ? (
        listings.map((listing: any) => (
          <ListingCard key={listing.id} data={listing} />
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ListingPlatform;
