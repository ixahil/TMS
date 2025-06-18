import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type State = {
  name: string;
  cities: string[];
};

import IndiaData from "./india-city-state.json";

const CountryCityStateSelect = () => {
  const { control, watch, setValue } = useFormContext();

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const selectedState = watch("state");

  useEffect(() => {
    setStates(IndiaData.states);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const found = IndiaData.states.find((s) => s.name === selectedState);
      setCities(found?.cities || []);
    }
  }, [selectedState, setValue]);

  return (
    <div className="space-y-4 w-full">
      {/* Country is always India */}
      <FormItem>
        <FormLabel>Country</FormLabel>
        <FormControl>
          <Select disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="India" />
            </SelectTrigger>
          </Select>
        </FormControl>
      </FormItem>

      {/* State Select */}
      <FormField
        control={control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s.name} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City Select */}
      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CountryCityStateSelect;
