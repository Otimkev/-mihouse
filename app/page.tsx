import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
        pt-24
        grid
        grid-cols-1
        md:grid-cols-3 
        lg:grid-cols-3
        xl:grid-cols-3
        2xl:grid-cols-3
        gap-4
        max-h-screen"
        >
          <div className="rounded-lg">
            Start using Interior AI for free
          </div>
          <div className="rounded-lg col-span-2 p-4 overflow-y-auto max-h-screen">
          <div
              className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-2
            2xl:grid-cols-2
            gap-4
          "
            >
              {listings.map((listing: any) => (
                <ListingCard
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
