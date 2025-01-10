import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

export type Profile = {
  _id?: string;
  userId?: string;
  first?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
};

export type ProfileUpdateModel = Omit<Profile, "_id">;
