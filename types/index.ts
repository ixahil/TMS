import { LucideIcon } from "lucide-react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "AGENT";
  isEmailVerified: boolean;
  status: string;
  phone?: string | null | undefined;
  slug?: string | null | undefined;
  profile?: string | null | undefined;
}

export interface IMedia {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  asset_id: string;
  resource_type: string;
  folder: string;
  filename: string;
  url: string;
  thumbnail: string;
  user?: string;
}

export interface ITour {
  _id: string;
  title: string;
  description: string;
  price: number;
  comparePrice: number;
  city: string;
  state: string;
  country: string;
  itinerary: itinerary[];
  tags: string[];
  duration?: string;
  departureDate?: string;
  groupSize?: string;
  status: "DRAFT" | "ACTIVE" | "PENDING";
  isFeatured: boolean;
  images: string[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface itinerary {
  label: string;
  description: string;
}

export interface IMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive: boolean;
  items?: IMenuItem[];
}

export interface IMenu {
  [key: string]: {
    items: IMenuItem[];
  };
}

export type MediaData = {
  images: IMedia[];
};

export type UserData = {
  users: IUser[];
};
export type TourData = {
  tour: ITour;
};

export type TourWithPagination = {
  tours: ITour[];
  pagination: IPagination;
};

export interface IPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface TourFields {
  _id: string; // MongoDB usually uses a string as the ObjectId
  title: string;
  description: string;
  price: number;
  comparePrice: number;
  images: string[];
  city: string;
  state: string;
  country: string;
  status: "ACTIVE" | "DRAFT";
  itinerary: {
    title: string;
    description: string;
  }[];
  isFeatured: boolean;
  groupSize?: string;
  departureDate?: string;
  duration?: string;
}

export type CommonFormGroup = {
  left: {
    groupLabel: string;
    items: CommonFormItem[];
  }[];
  right: {
    groupLabel: string;
    items: CommonFormItem[];
  }[];
};

export type CommonFormItem = {
  label: string;
  name: string;
  componentType:
    | "input"
    | "checkbox"
    | "textarea"
    | "select"
    | "number"
    | "media"
    | "blank"
    | "itinerary"
    | "select-specified"
    | "gallery";
  type: string;
  required: boolean;
  placeholder?: string;
  defaultValue?: string;
  options?: Array<{ handle: string; label: string }> | [];
  disabled?: boolean;
  min?: number;
  step?: number;
  default?: number;
  multiple?: boolean;
};
