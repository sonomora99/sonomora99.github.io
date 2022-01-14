import { useContext } from "react";
import { AuthContext } from "./Auth.provider";

export default function useAuth(){

    return useContext(AuthContext)

}