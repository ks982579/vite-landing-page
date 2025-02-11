import { JSX } from "react";

export * from "./result.ts";

export interface GenericResponseError {
  message: string;
}

export type JSXNode = JSX.Element | null;

// This is for the file 'secrets.ts' in root folder.
// NOTE: In production - Backend should hold this data.
export interface AppConfig {
  partnerId: string;
  apiKey: string;
  apiEndpoint: string;
}
