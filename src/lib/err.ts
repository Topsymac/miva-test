import { response } from "./res";

export const errorResponse = (err: unknown | Error) => {
  if (err instanceof Error) {
    return response(500, err.message);
  }
  return response(500, "An unknown error occurred");
};