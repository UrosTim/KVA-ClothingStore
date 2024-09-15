import {CartItem} from "./cartItem";

export interface Order {
  _id?: string,
  userId?: string,
  items: CartItem[],
  address: any,
  payment: string,
  date: Date,
  status?: string
}
