import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import GenerateButton from "./components/GenerateButton";

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
        max-h-full"
        >
          <div className="rounded-lg">
            <div className="text-lg text-black font-bold">
              Start using mihouse AI for free
            </div>
            <div className="text-md text-black pt-4">
              Take a picture of your interior, then click to upload or drag&drop it above. Click on Generate Ideas button below to see a virtual preview of your house. Make sure the entire room is visible in the photo and that it is taken horizontally!
            </div>
            <div className="pt-4">
              <GenerateButton label="Generate Idea" />
            </div>
          </div>
          <div className="rounded-lg col-span-2 p-4 2xl:overflow-y-auto 2xl:max-h-screen">
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
            2xl:pb-60
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
