import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, MapPin, Clock, Star, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with verified accommodations and experienced guides.",
  },
  {
    icon: Users,
    title: "Expert Guides",
    description:
      "Local experts who know the hidden gems and cultural insights of each destination.",
  },
  {
    icon: MapPin,
    title: "Unique Destinations",
    description:
      "Carefully curated locations that offer authentic and memorable experiences.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance to ensure your journey is smooth and worry-free.",
  },
  {
    icon: Star,
    title: "Best Value",
    description:
      "Competitive pricing with no hidden costs and maximum value for your money.",
  },
  {
    icon: Headphones,
    title: "Customer Care",
    description:
      "Dedicated support team to help you before, during, and after your trip.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Perfect Travel Partner
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are committed to making your travel dreams come true with
            exceptional service and unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
