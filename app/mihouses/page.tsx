
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import FavoritesClient from "./mihousesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (true) {
    return (
      <ClientOnly>
        <EmptyState
          title="No houses found"
          subtitle="Looks like you have not made any houses yet. Start generating houses for free!"
        />
      </ClientOnly>
    );
  }

  // return (
  //   <ClientOnly>
  //     <FavoritesClient
  //       listings={listings}
  //       currentUser={currentUser}
  //     />
  //   </ClientOnly>
  // );
}
 
export default ListingPage;
