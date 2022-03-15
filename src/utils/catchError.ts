import { ErrorData } from "../types/Error";

export const catchError = (error: ErrorData, context: string): string => {
  let message: string = `${context} Ошибка`;
  if (error.response) {
    message += " " + error.response.data?.message;

    if (error.response.data?.error) {
      message += " " + error.response.data.error.message;
    }
  } else {
    message += " " + error.message;
  }
  return message;
};
