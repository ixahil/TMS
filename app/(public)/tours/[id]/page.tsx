import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTourById } from "@/lib/api/queries/tour";
import Image from "next/image";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import SectionLayout from "../../_components/layouts/section-layout";
import { RiCheckDoubleFill } from "react-icons/ri";
import { jsPDF } from "jspdf";
import Itinerary from "./itinerary-section";

type Props = {
  params: Promise<{ id: string }>;
};

const TourLandingPage = async ({ params }: Props) => {
  const id = (await params).id;

  // Fetch tour details by ID
  const { data } = await getTourById(id);

  const itinerary = data?.itinerary ? JSON.parse(data?.itinerary) : [];

  return (
    <div>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-2">
          {data.images.map((image, index) => (
            <div
              key={image}
              className={` ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={image}
                alt={image}
                width={500}
                height={500}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <SectionLayout className="py-0">
        {/* Carousel for tour images */}

        {/* Tour Details */}
        <div className="space-y-4">
          <div className="flex justify-between text-3xl">
            <h3 className="">{data?.title}</h3>
            <p className="flex items-center gap-2 text-primary">
              <span>₹ {data?.price}-/</span>
              <span className="text-sm">{"Per Person"}</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-4 w-full">
              <div className="flex gap-2 text-xl">
                <Badge>
                  {data.state}, {data.country}
                </Badge>
                <p className="text-gray-500">{data?.duration}</p>
              </div>
              <div className="">
                <p>Group Size: {data?.groupSize}</p>
              </div>

              <div className="text-xl flex items-center gap-2">
                <Badge className="rounded-sm text-base">Departure Dates</Badge>
                <p>{data?.departureDate}</p>
              </div>
              <div className="flex justify-between items-center w-2/3 text-blue-950">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-2">
                    <MdOutlineFlightTakeoff />
                    <p>Departure Cities: {data?.groupSize}</p>
                  </div>
                  <p className="text-gray-500 pl-6">Cities todo..</p>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-2">
                    <RiCheckDoubleFill />
                    <p>Inclusions: {data?.groupSize}</p>
                  </div>
                  <p className="text-gray-500 pl-6">
                    Hotels, Meals, Sighseeing, todo..
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <Button size={"lg"}>Book Now</Button>
              <div className="text-blue-950 font-semibold">
                <p className="text-lg font-semibold">
                  Tour Operator:{" "}
                  <span>
                    {data.agent.name
                      .split("")
                      .map((char, index) =>
                        index === 0 || index === data.agent.name.length - 1
                          ? char
                          : "x"
                      )
                      .join("")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Static Itinerary Section */}
        <Itinerary itinerary={itinerary} title={data?.title} />
      </SectionLayout>
    </div>
  );
};

export default TourLandingPage;
