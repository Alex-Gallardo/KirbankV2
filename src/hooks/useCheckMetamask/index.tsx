import UserContext from "@/context/UserContext/UserContext";
import { useCallback, useContext, useMemo } from "react";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

const useCheckMetamask = ()=>{
	const toast = useToast();

    console.log("useCheckMetamask");

    // CONTEXT
	const userContext = useContext(UserContext);
	const { user } = userContext;
    const { ethereum }: any = window;

    if (!ethereum) {
        toast({
            title: "Metamask no encontrado",
            status: "error",
            duration: 1250,
            variant: "solid",
            position: "top-right"
        });
        // router.push("/login");
        return;
    } else {
        toast({
            title: "Metamask habilitado!",
            status: "success",
            duration: 1250,
            variant: "solid",
            position: "top-right"
        });}
    
    console.log("User useMetamask: ( ", user, " )")
}

export default useCheckMetamask