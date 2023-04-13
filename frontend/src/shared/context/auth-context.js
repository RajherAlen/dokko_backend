import { createContext } from "react";

const authContext = createContext({
    isLogged: false,
    login: () => {},
    logout: () => {},
});

export default authContext;
