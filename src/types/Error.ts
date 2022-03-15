type Error = {
  message: string;
};

type Message = {
  message?: string;
  error?: Error;
};

type Response = {
  data?: Message;
};

export type ErrorData = {
  response?: Response;
  message: string;
};
