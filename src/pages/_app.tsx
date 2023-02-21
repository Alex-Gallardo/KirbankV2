import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
// WEB3
import { ethers } from "ethers";
// CONTEXT
import UserState from "./../context/UserState";
import { ChakraProvider } from "@chakra-ui/react";
// STYLES
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const [walletAccount, setWalletAccount] = useState("");
	const [connected, setConnected] = useState(false);

	const router = useRouter();

	// Valida que el browser tenga instalado Metamask
	const checkIfMetamaskIsConnected = async () => {
		const { ethereum }: any = window;

		if (!ethereum) {
			console.log("Metamask NO se encuentra instalado");
			router.push("/login");
			return;
		} else {
			console.log("Metamask habilitado!");
			// Metodo de Metamask cuando cambiamos de RED (Cadena)
			// ethereum.on()
			if (ethereum.networkVersion == 5) setConnected(true);

			ethereum.on("chainChanged", (networkID: any) => {
				console.log("NetworkEthereum", networkID, parseInt(networkID));
				if (parseInt(networkID) == 5) setConnected(true);
			});
		}

		// eth_accounts : Verifica si existen cuentas
		const accounts = await ethereum.request({ method: "eth_accounts" });
		// Obtenemos el contenido
		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner();
		// Validamos
		if (accounts.length != 0) {
			setWalletAccount(accounts[0]);
		} else {
			console.log("No se encuentra una cuenta autorizada");
		}
	};

	useEffect(() => {
		checkIfMetamaskIsConnected();
	}, []);

	// Funcion para conectar Metamask
	const connectMetamask = async () => {
		try {
			const { ethereum }: any = window;
			if (!ethereum) {
				alert("Conecta Metamask");
				return;
			}

			// eth_requestAccounts: Solicita las cuentas Metamask
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log(accounts[0]);
			setWalletAccount(accounts[0]);
		} catch (err) {
			console.log("Ha ocurrido un error", err);
		}
	};

	return (
		<ChakraProvider>
			<UserState>
				<Component {...pageProps} />
			</UserState>
		</ChakraProvider>
	);
}
