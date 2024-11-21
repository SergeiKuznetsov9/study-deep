import { User } from "@/entities/User";

export interface Comment {
  _id: string;
  user: User;
  text: string;
}
