"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ItineraryItem {
  label: string;
  description: string;
}

// interface Props {
//   name: string;
//   label: string;
// }

const ItineraryElement = () => {
  const { setValue, getValues } = useFormContext();
  const initialData: ItineraryItem[] = getValues("itinerary") || [];

  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>(
    initialData.length > 0
      ? initialData
      : [{ label: "Day 1", description: "Day 1 Todo" }]
  );

  const handleChange = (
    index: number,
    field: keyof ItineraryItem,
    value: string
  ) => {
    const updatedItems = [...itineraryItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItineraryItems(updatedItems);
    setValue("itinerary", updatedItems, { shouldValidate: true });
  };

  const addItineraryItem = () => {
    const nextDay = itineraryItems.length + 1;
    const newItem = {
      label: `Day ${nextDay}`,
      description: `Day ${nextDay} Todo`,
    };
    const updatedItems = [...itineraryItems, newItem];
    setItineraryItems(updatedItems);
    setValue("itinerary", updatedItems, { shouldValidate: true });
  };

  const removeItineraryItem = (index: number) => {
    const updatedItems = itineraryItems.filter((_, i) => i !== index);
    setItineraryItems(updatedItems);
    setValue("itinerary", updatedItems, { shouldValidate: true });
  };

  return (
    <div className="w-full space-y-4">
      {itineraryItems.map(
        (item: { label: string; description: string }, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-background p-4 rounded"
          >
            <div className="space-y-2 w-full">
              <Input
                value={item.label}
                onChange={(e) => handleChange(index, "label", e.target.value)}
                placeholder="Enter Title"
              />
              <Textarea
                value={item.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Enter Description"
              />
            </div>
            <div>
              <Button
                asChild
                variant={"ghost"}
                size={"icon"}
                onClick={() => removeItineraryItem(index)}
              >
                <Trash2 size={8} className="text-destructive" />
              </Button>
            </div>
          </div>
        )
      )}
      <Button variant={"outline"} type="button" onClick={addItineraryItem}>
        Add More
      </Button>
    </div>
  );
};

export default ItineraryElement;
