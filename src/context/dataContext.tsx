import { createContext } from "react";
import { ContextInterface } from "../types/type";

const defaultContextValue: ContextInterface = {
    usersName: [],
    loading: true,
    error: false,
    updateSubgroup: async () => {},
    subgroups: []
}

export const DataContext = createContext<ContextInterface>(defaultContextValue)