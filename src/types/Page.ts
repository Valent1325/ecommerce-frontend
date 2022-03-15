import { Cart } from "./Cart";
import { User } from "./User";

export type PageProps = {
  user: User | null | undefined;
  cart?: Cart | null;
};
