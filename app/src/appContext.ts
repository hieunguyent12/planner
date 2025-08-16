import { createContext } from "react";

export const AppContext = createContext<{ isUFView: boolean }>(undefined!);
