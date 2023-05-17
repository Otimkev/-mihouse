"use client";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import ViewListingModal from "@/app/components/modals/ViewListingModal";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { fetchListingById, selectListingById } from "@/app/slices/listingByIdSlice";
import { fetchListings, selectListings } from "@/app/slices/listingsSlice";

interface IParams {
  listingId?: any;
}
const ListingPage = ({ params }: { params: IParams }) => {

  const dispatch = useAppDispatch();
  const { listing, pending, error } = useAppSelector(selectListings);
  console.log("THE_STURBBON_LISTING",listing)
  return (
    <ClientOnly>
      <div>
        <ViewListingModal images={[{id: 1,image:`${params.listingId}`}, {id: 2,image:`${params.listingId}`}]} onClose={function (): void {
          dispatch(fetchListings("FOOD"))
        } } />
      </div>
    </ClientOnly>
  );
}
 
export default ListingPage;
