import { JSX } from "react";

export * from "./result.ts";

export interface GenericResponseError {
  message: string;
}

export type JSXNode = JSX.Element | null;
