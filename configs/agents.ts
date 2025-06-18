import { CommonFormGroup } from "@/types";
import {
  Calendar,
  CameraIcon,
  Globe,
  Plane,
  Settings,
  User2,
} from "lucide-react";

export const agentMenu = {
  Home: {
    items: [
      {
        title: "Home",
        url: "/",
        isActive: false,
        icon: User2,
      },
    ],
  },
  // Tours: {
  //   items: [
  //     {
  //       title: "Tours",
  //       url: "#",
  //       isActive: true,
  //       icon: Globe,
  //       items: [
  //         {
  //           title: "All Tours",
  //           url: "tours",
  //           isActive: false,
  //           icon: Globe,
  //         },
  //         {
  //           title: "Bookings",
  //           url: "bookings",
  //           isActive: false,
  //           icon: Plane,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Calendar",
  //       url: "#",
  //       isActive: false,
  //       icon: Calendar,
  //     },
  //     {
  //       title: "Settings",
  //       url: "#",
  //       isActive: false,
  //       icon: Settings,
  //     },
  //   ],
  // },
  Tours: {
    items: [
      {
        title: "All Tours",
        url: "tours",
        isActive: false,
        icon: Globe,
      },
      {
        title: "Bookings",
        url: "#",
        isActive: false,
        icon: Plane,
      },
      {
        title: "Calendar",
        url: "#",
        isActive: false,
        icon: Calendar,
      },
      {
        title: "Settings",
        url: "#",
        isActive: false,
        icon: Settings,
      },
    ],
  },

  Media: {
    items: [
      {
        title: "Media",
        url: "media",
        isActive: false,
        icon: CameraIcon,
      },
    ],
  },

  Apps: {
    items: [],
  },
  Settings: {
    items: [
      {
        title: "Account",
        url: "account",
        isActive: false,
        icon: User2,
      },
    ],
  },
};

export const TourFormControls: CommonFormGroup = {
  left: [
    {
      groupLabel: "Basic Info",
      items: [
        {
          label: "Title",
          name: "title",
          componentType: "input",
          type: "text",
          required: true,
          placeholder: "Enter the tour title",
        },
        {
          label: "Description",
          name: "description",
          componentType: "textarea",
          type: "textarea",
          required: true,
          placeholder: "Enter the tour description",
        },
      ],
    },
    {
      groupLabel: "Media",
      items: [
        {
          label: "Tour Images",
          name: "images",
          componentType: "gallery",
          type: "image",
          placeholder: "Enter the tour images",
          required: false,
          multiple: true,
        },
      ],
    },
    {
      groupLabel: "Itinerary Details",
      items: [
        {
          label: "Itinerary",
          name: "itinerary",
          componentType: "itinerary",
          type: "itinerary",
          required: false,
          placeholder: "Enter the tour itinerary details",
        },
      ],
    },
  ],

  right: [
    {
      groupLabel: "Status",
      items: [
        {
          label: "Featured",
          name: "isFeatured",
          componentType: "checkbox",
          type: "checkbox",
          required: false,
        },
        {
          label: "Tour Status",
          name: "status",
          componentType: "select",
          type: "select",
          defaultValue: "INACTIVE",
          required: true,
          placeholder: "Select Status",
          options: [
            { handle: "ACTIVE", label: "Active" },
            { handle: "DRAFT", label: "Draft" },
          ],
        },
      ],
    },
    {
      groupLabel: "Pricing",
      items: [
        {
          label: "Price",
          name: "price",
          componentType: "number",
          type: "number",
          default: 0,
          min: 0,
          placeholder: "Enter the tour price",
          required: true,
        },
        {
          label: "Compare price",
          name: "comparePrice",
          componentType: "number",
          type: "number",
          default: 0,
          min: 0,
          placeholder: "Enter the tour compare price",
          required: true,
        },
      ],
    },
    {
      groupLabel: "Location",
      items: [
        {
          label: "City",
          name: "city",
          componentType: "select-specified",
          type: "text",
          required: true,
          placeholder: "Enter City",
        },
        // {
        //   label: "State",
        //   name: "state",
        //   componentType: "select-specified",
        //   type: "text",
        //   required: true,
        //   placeholder: "Enter State",
        // },
        // {
        //   label: "Country",
        //   name: "country",
        //   componentType: "select-specified",
        //   type: "text",
        //   required: true,
        //   placeholder: "Enter Country",
        // },
      ],
    },
    {
      groupLabel: "Extra Details (Optional)",
      items: [
        {
          label: "Duration",
          name: "duration",
          componentType: "input",
          type: "text",
          required: false,
          placeholder: "e.g. 2 Days 3 Nights",
        },
        {
          label: "Departure Date",
          name: "departureDate",
          componentType: "input",
          type: "text",
          required: false,
          placeholder: "e.g. Leaves 23 March 24",
        },
        {
          label: "Group Size",
          name: "groupSize",
          componentType: "input",
          type: "text",
          required: false,
          placeholder: "e.g. Group of 20 Peoples",
        },
      ],
    },
  ],
};
