"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SearchComponent from "./_components/shared/search";
import SectionLayout from "./_components/layouts/section-layout";
import {
  getFeaturedTours,
  getInternationalTours,
  getTours,
} from "@/lib/api/queries/tour";
import Link from "next/link";
import { useQuery } from "@/lib/api/use-swr";

const HomePage = () => {
  const { data: topdestinations } = useQuery(
    "/api/v1/tours?state=Kerala&state=Goa&state=Himachal Pradesh&state=Tamil Nadu&state=Punjab",
    "/api/v1/tours"
  );

  const { data: featuredDestination } = useQuery(
    "/api/v1/tours/featured",
    "/api/v1/tours/featured"
  );
  // const { data: internationalDestination } = useQuery("/api/v1/tours/featured", "/api/v1/tours/featured")

  return (
    <>
      <div className="relative w-full min-h-screen bg-gray-100">
        <div className="relative min-h-screen">
          <Image
            src="/Darjeeling-Himalayan-Railway-Toy-Train.jpg"
            alt="Darjeeling"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <SearchComponent className="absolute inset-0" />
      </div>
      <SectionLayout
        title="Top Destinations By States"
        view={{ url: "/tours", label: "View All" }}
      >
        <DestinationTabs topDestinations={topdestinations?.tours} />
      </SectionLayout>
      <SectionLayout title="Popular Destinations">
        <HorizontalSlider data={featuredDestination?.tours} />
      </SectionLayout>
      <section>
        <div className="relative h-[75vh] w-full">
          <div className="">
            <Image
              src="/luxury-train-sec.webp"
              alt="Luxury Train"
              objectFit="cover"
              objectPosition="center"
              layout="fill"
            />
          </div>
          <div className="w-full h-full relative max-w-7xl mx-auto">
            <div className="absolute top-36 left-10">
              <div className="luxury-left-sec p-8">
                <div className="py-4">
                  <h4 className="text-black z-40 text-4xl mb-2">
                    Luxury Trains
                  </h4>
                  <strong className="z-40">Luxurious Rail Escapade</strong>
                </div>
                <hr className="border-4 border-primary w-12 mx-auto" />
                <div className="lux-p z-40 py-4">
                  <p>
                    Experience the epitome of luxury while traversing India’s
                    stunning landscapes.
                  </p>
                </div>
                <Button className="w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <SectionLayout
        title="Holidays by Interest"
        view={{ url: "/holidays", label: "View All" }}
      >
        <HorizontalSlider items={data.holidaysByInterest} />
      </SectionLayout> */}
      <SectionLayout
        title="Top Weekend Destinations"
        view={{ url: "/tours", label: "View All" }}
      >
        <HorizontalSlider data={featuredDestination?.tours} />
      </SectionLayout>
      {/* <SectionLayout
        title="International Holiday Packages"
        view={{ url: "/tours", label: "View All" }}
      >
        <GridContainer data={internationalDestination?.tours} />
      </SectionLayout> */}
      <SectionLayout
        title="Top India Tourism Experiences"
        view={{ url: "/tours", label: "View All" }}
      >
        <HorizontalSlider data={featuredDestination?.tours} />
      </SectionLayout>
      <SectionLayout title="Guest Satisfaction is Our Goal">
        <Tabs defaultValue={"Do Dham Yatra"} className="w-full">
          <TabsList className="gap-16 border-b-2 pb-4 border-primary-slate-100 rounded-none w-full justify-start">
            <TabsTrigger
              value={"Do Dham Yatra"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"Do Dham Yatra"}
            </TabsTrigger>
            <TabsTrigger
              value={"Kashmir Ladakh Trip"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"Kashmir Ladakh Trip"}
            </TabsTrigger>
            <TabsTrigger
              value={"Ranthambore Visit"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"Ranthambore Visit"}
            </TabsTrigger>
            <TabsTrigger
              value={"View All"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"View All"}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={"Do Dham Yatra"}
            className="pt-8"
            style={{ minHeight: "400px" }}
          >
            <div className="grid grid-cols-[2fr_1fr] items-center justify-center gap-8">
              <div className="w-full flex gap-8">
                <div className="relative h-0 pb-[40%] flex-1 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <Image
                    src={"/ladakh-customer.webp"}
                    alt={"ladakh-customer"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-0 pb-[40%] flex-1 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <Image
                    src={"/ladakh-customer.webp"}
                    alt={"ladakh-customer"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold">
                  Jammu and Kashmir along with Leh Ladakh
                </h4>
                <p>
                  We are Tour My Indias repeat customers. We just love to deal
                  with Manvendra and we find him and his suggestions really
                  genuine and trust worthy. We recently toured the entire of J
                  and K along with Leh Ladakh. It is tailor made for our
                  requirements. Manvendra ensured that the vacation stayed with
                  in our budget. There were absolutely no hiccups and we
                  thoroughly enjoyed the trip all along. I will definitely start
                  planning my next trip with Tour My India guided by Manvendra.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SectionLayout>
      <SectionLayout title="Why Choose Us ?">
        <div className="flex gap-4">
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>
    </>
  );
};

const DestinationTabs = ({ topDestinations }) => {
  const uniqueStates = topDestinations
    ? [...new Set(topDestinations.map((dest) => dest.state))]
    : [];

  return (
    <Tabs defaultValue={uniqueStates[0]} className="w-full">
      {/* Tabs List */}
      <TabsList className="gap-16 border-b-2 pb-4 border-primary-slate-100 rounded-none w-full justify-start">
        {uniqueStates.map((state) => (
          <TabsTrigger
            key={state}
            value={state}
            className="text-xl font-medium pb-4 
              data-[state=active]:border-b-4 border-primary rounded-none 
              data-[state=active]:shadow-none data-[state=active]:bg-none"
          >
            {state}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content */}
      {uniqueStates.map((state) => {
        // Filter tours by the current state
        const stateTours = topDestinations.filter(
          (dest) => dest.state === state
        );

        return (
          <TabsContent
            key={state}
            value={state}
            className="pt-8"
            style={{ minHeight: "400px" }}
          >
            <div className="w-full h-full flex flex-wrap gap-4">
              {/* Large Tour - First Tour */}
              {stateTours.length > 0 && (
                <div className="relative h-0 pb-[40%] flex-[2] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <Link href={`/tours/${stateTours[0].id}`}>
                    <Image
                      src={stateTours[0].images[0]?.url}
                      alt={stateTours[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute text-white font-bold text-xl bottom-5 left-5 flex flex-col">
                      <span>{stateTours[0].title}</span>
                      <span>{`₹${stateTours[0].price}`}</span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid for Remaining Tours */}
              <div className="grid grid-cols-2 flex-[3] gap-4">
                {stateTours.slice(1).map((tour) => (
                  <Link href={`/tours/${tour.id}`} key={tour.title}>
                    <div className="relative h-0 pb-[75%] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                      <Image
                        src={tour.images[0]?.url}
                        alt={`${tour.title} - Image`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute text-white font-bold text-lg bottom-5 left-5 flex flex-col">
                        <span>{tour.title}</span>
                        <span>{`₹${tour.price}`}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

const HorizontalSlider = ({ data }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {data?.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="p-0">
                  <Link
                    className="relative rounded-lg overflow-hidden flex aspect-square items-center justify-center shadow-lg transition-transform transform hover:scale-105"
                    href={`/tours/${item.id}`}
                    key={item.title}
                  >
                    <Image
                      src={item.images[0]?.url}
                      alt={item.title}
                      layout="fill"
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <span className="text-sm">{item.package}</span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const GridContainer = ({ data }) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {data.map((item) => (
        <div
          key={item.title}
          className="relative rounded-lg overflow-hidden flex aspect-square items-center justify-center shadow-lg transition-transform transform hover:scale-105"
        >
          <Image
            src={item.images[0].url}
            alt={item.title}
            layout="fill"
            className="object-cover"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <span className="text-sm">{item.package}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
