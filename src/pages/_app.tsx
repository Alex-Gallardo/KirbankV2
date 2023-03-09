// STYLES
import "@/styles/globals.css";

import { ChakraProvider, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect } from "react";

import type { AppProps } from "next/app";
// CONTEXT
import UserState from "@/context/UserState";
import { useRouter } from "next/router";

// WEB3

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const toast = useToast();

	console.log('- primera carga app -')
	// console.log('primera carga app 2', res)

	// Valida que el browser tenga instalado Metamask
	const checkIfMetamaskIsConnected = async () => {
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
			});

			// Si se encuentra en el login
			if (router.pathname === "/login") {
				// RED ESTABLECIDA
				if (ethereum.networkVersion == 5) {
					setTimeout(() => {
						toast({
							title: "Red correcta!",
							status: "success",
							duration: 1250,
							variant: "solid",
							position: "top-right"
						});
					}, 1000);
				} else {
					setTimeout(() => {
						toast({
							title: "Red incorrecta!",
							status: "warning",
							duration: 1250,
							variant: "solid",
							position: "top-right"
						});
					}, 1000);
				}

				// Metodo de Metamask cuando cambiamos de RED (Cadena)
				// ethereum.on()
				ethereum.on("chainChanged", (networkID: any) => {
					console.log("NetworkEthereum", networkID, parseInt(networkID));
					if (parseInt(networkID) == 5) {
						setTimeout(() => {
							toast({
								title: "Cambio red correcta!",
								status: "success",
								duration: 1250,
								variant: "solid",
								position: "top-right"
							});
						}, 1000);
					} else {
						toast({
							title: "Cambio red incorrecta!",
							status: "warning",
							duration: 1250,
							variant: "solid",
							position: "top-right"
						});
					}
				});
			}
		}
	};

	useEffect(()=>{
		checkIfMetamaskIsConnected()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<ChakraProvider>
			<UserState>
				<Component {...pageProps} />
			</UserState>
		</ChakraProvider>
	);
}
