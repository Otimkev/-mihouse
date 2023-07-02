"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";

import { IRenders } from "@/app/actions/listings";

interface ListingCardProps {
  data: IRenders;
  reservation?: [];
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  // const price = useMemo(() => {
  //   if (reservation) {
  //     return reservation.totalPrice;
  //   }

  //   return data.price;
  // }, [reservation, data.price]);

  // const reservationDate = useMemo(() => {
  //   if (!reservation) {
  //     return null;
  //   }

  //   const start = new Date(reservation.startDate);
  //   const end = new Date(reservation.endDate);

  //   return `${format(start, "PP")} - ${format(end, "PP")}`;
  // }, [reservation]);

  return (
    <div
      //onClick={() => console.log("Not implemented!!")}
      className="col-span-1"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2  gap-2">
          <div>
            <div
              onClick={() => router.push(`/listings/${data.id}`)}
              className="
            aspect-square 
            w-full
            relative 
            overflow-hidden 
            rounded-xl
            cursor-pointer group
          "
            >
              <Image
                fill
                className="
              object-cover  
              w-full 
              group-hover:scale-110 
              transition
            "
                src={data?.originalImageUrl || "/images/image_placeholder.jpg"}
                alt="Listing"
              />

              <div
                className="
            absolute
            top-3
            right-3
          "
              >
                {/* <HeartButton listingId="listingId" currentUser={currentUser} /> */}
              </div>
            </div>
            <div className="pt-2">
              {/* <div className="font-medium text-lg">{`Original ${data.roomType} ${data.roomStyle}`}</div> */}
              <div className="font-light text-neutral-500">Original Image</div>
            </div>
          </div>
          <div>
            <div
              onClick={() => router.push(`/listings/${data.id}`)}
              className="
            aspect-square 
            w-full
            relative 
            overflow-hidden 
            rounded-xl
            cursor-pointer group
          "
            >
              <Image
                fill
                className="
              object-cover 
              w-full 
              group-hover:scale-110 
              transition
            "
                src={data?.renderedImageUrl || "/images/image_placeholder.jpg"}
                alt="Listing"
              />
              <div
                className="
            absolute
            top-3
            right-3
          "
              >
                {/* <HeartButton listingId="listingId" currentUser={currentUser} /> */}
              </div>
            </div>
            <div className="pt-2">
              {/* <div className="font-medium text-lg">Rendered Image, Kampala</div> */}
              <div className="font-light text-neutral-500">Rendered Image</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">{/* $ {price} */}</div>
          {/* {!reservation && (
            <div className="font-light">night</div>
          )} */}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
