import {
  Calendar,
  CameraIcon,
  Globe,
  Plane,
  Settings,
  ShieldUserIcon,
  User2,
  UsersRoundIcon,
} from "lucide-react";

export const adminMenu = {
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

  "Agents/Users": {
    items: [
      {
        title: "All Agents",
        url: "agents",
        isActive: false,
        icon: ShieldUserIcon,
      },
      {
        title: "All Users",
        url: "users",
        isActive: false,
        icon: UsersRoundIcon,
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
