import { Button, Icon, Text, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import UserContext from "@/context/UserContext";
import { ethers } from "ethers";
import useCheckMetamask from "@/hooks/useCheckMetamask";
import { useRouter } from "next/router";
import useTruncatedAddress from '@/hooks/useTruncatedAddress';
import WalletIcon from "@/icons/wallet";

const WalletButton = ({ ...props }: any) => {
	// STATE
	const [text, setText] = useState("0xd123...45F");
	const router = useRouter();
	const toast = useToast();
	
	// CONTEXT
	const userContext = useContext(UserContext);
	const { usuario, agregarUsuario, actualizarRed } = userContext;
	let dirWallet = useTruncatedAddress(usuario)

	// console.log("primera carga wallet", usuario)
	useEffect(()=>{
		if(usuario) setText(dirWallet)
		else setText("Connect your wallet")
	},[usuario, dirWallet])

	// Funcion para conectar Metamask
	const connectMetamask = async () => {
		try {
			const { ethereum }: any = window;
			if (!ethereum) {
				toast({
					title: "Conecta Metamask.",
					description: "Crea una wallet para conectarte con nosotros",
					status: "error",
					duration: 2000,
					isClosable: true,
					variant: "left-accent",
					position: "top"
				});
				return;
			}

			// eth_requestAccounts: Solicita las cuentas Metamask
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			const provider = new ethers.providers.Web3Provider(ethereum);
			// const signer = provider.getSigner();
			// console.log("Signer", signer);
			agregarUsuario(accounts[0]);
			// let addressWallet: string = `${accounts[0]?.substr(0, 6)}...${accounts[0]?.substr(-4)}`;
			// setText(accounts[0]);
			// setText(addressWallet);
			// console.log("Account -wallet", addressWallet);

			// Establecimiento de red
			// RED ESTABLECIDA
			if (ethereum.networkVersion == 5) {
				actualizarRed(true);
			} else {
				actualizarRed(false);
			}

			// Redirect to
			if (router.pathname == "/login") router.push("/");
		} catch (err: any) {
			console.error("Ha ocurrido un error", err);
			toast({
				title: "Ha ocurrido un error",
				description: err,
				status: "error",
				duration: 2000,
				isClosable: true,
				variant: "solid",
				position: "bottom"
			});
		}
	};

	return (
		<Button leftIcon={<WalletIcon/>} onClick={connectMetamask} background="#DBF227" {...props}>
			<Text noOfLines={1} fontSize={{ base: "sm", lg: "md" }}>
				{text}
			</Text>
		</Button>
	);
};

export default WalletButton;
