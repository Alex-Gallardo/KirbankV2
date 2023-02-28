import UserContext from "@/context/UserContext";
import { useCallback, useContext, useMemo } from "react";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

const useCheckMetamask = ()=>{
	const toast = useToast();

    console.log("useCheckMetamask");

    // CONTEXT
	const userContext = useContext(UserContext);
	const { usuario } = userContext;
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
    
    console.log("User useMetamask: ( ", usuario, " )")


    // Existe usuario
    if(usuario === undefined){
        // Si se encuentra en el login
        // if (router.pathname == "/login") {
        // 	// RED ESTABLECIDA
        // 	if (ethereum.networkVersion == 5) {
        // 		setTimeout(() => {
        // 			toast({
        // 				title: "Red correcta!",
        // 				status: "success",
        // 				duration: 1250,
        // 				variant: "solid",
        // 				position: "top-right"
        // 			});
        // 		}, 1000);
        // 	} else {
        // 		setTimeout(() => {
        // 			toast({
        // 				title: "Red incorrecta!",
        // 				status: "warning",
        // 				duration: 1250,
        // 				variant: "solid",
        // 				position: "top-right"
        // 			});
        // 		}, 1000);
        // 	}

        // 	// Metodo de Metamask cuando cambiamos de RED (Cadena)
        // 	// ethereum.on()
        // 	ethereum.on("chainChanged", (networkID: any) => {
        // 		console.log("NetworkEthereum", networkID, parseInt(networkID));
        // 		if (parseInt(networkID) == 5) {
        // 			setTimeout(() => {
        // 				toast({
        // 					title: "Cambio red correcta!",
        // 					status: "success",
        // 					duration: 1250,
        // 					variant: "solid",
        // 					position: "top-right"
        // 				});
        // 			}, 1000);
        // 		} else {
        // 			toast({
        // 				title: "Cambio red incorrecta!",
        // 				status: "warning",
        // 				duration: 1250,
        // 				variant: "solid",
        // 				position: "top-right"
        // 			});
        // 		}
        // 	});
        // }
    }else{
        console.log("Existe usuario useCheckMetamask", usuario)
    }
        
    // }, [])
    
    // return metamask
}

export default useCheckMetamask