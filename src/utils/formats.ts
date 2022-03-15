import { CartItem } from "../types/Cart";
import { OrderStatus } from "../types/Order";

import { IMAGE_URL } from "./constants";

type Color =
  | "error"
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | undefined;

const imagePath = (path: string): string => {
  return `${IMAGE_URL}${path}`;
};

const price = (value: number): string => {
  return `${value} ₽`;
};

const propertyName = (key: string): string => {
  switch (key) {
    case "os":
      return "ОС";
    case "cpu":
      return "Процессор";
    case "memory":
      return "Объем памяти";
    case "ram":
      return "Оперативная память";
    case "color":
      return "Цвет";
    default:
      return key;
  }
};

const date = (value: string): string => {
  return new Date(value).toLocaleDateString("ru-RU");
};

const countTotalQuantity = (items: CartItem[]): string => {
  const total = items.reduce((acc: number, item: CartItem) => {
    acc += item.quantity;
    return acc;
  }, 0);
  return total.toString();
};

const countTotalPrice = (items: CartItem[]): string => {
  const total = items.reduce((acc: number, item: CartItem) => {
    acc += item.quantity * item.product.price;
    return acc;
  }, 0);
  return price(total);
};

const orderStatus = (value: OrderStatus): string => {
  switch (value) {
    case OrderStatus.CREATED:
      return "Создан";
    case OrderStatus.IN_PROGRESS:
      return "В процессе";
    case OrderStatus.COMPLETED:
      return "Выполнен";
    case OrderStatus.REJECTED:
      return "Отменен";
    default:
      return "";
  }
};

const orderStatusColor = (value: OrderStatus): Color => {
  switch (value) {
    case OrderStatus.CREATED:
      return "primary";
    case OrderStatus.IN_PROGRESS:
      return "secondary";
    case OrderStatus.COMPLETED:
      return "success";
    case OrderStatus.REJECTED:
      return "error";
    default:
      return undefined;
  }
};

export const formats = {
  imagePath,
  price,
  propertyName,
  date,
  countTotalQuantity,
  countTotalPrice,
  orderStatus,
  orderStatusColor,
};
