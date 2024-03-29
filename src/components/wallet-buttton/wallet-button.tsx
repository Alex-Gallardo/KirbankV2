import { Button, Icon, Text, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import UserContext from "@/context/UserContext/UserContext";
import WalletIcon from "@/icons/wallet";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import useTruncatedAddress from "@/hooks/useTruncatedAddress";

const WalletButton = ({ ...props }: any) => {
	// STATE
	const [text, setText] = useState(" ");
	const router = useRouter();
	const toast = useToast();

	// CONTEXT
	const userContext = useContext(UserContext);
	const { wallet, upRed, upWallet } = userContext;
	let dirWallet = useTruncatedAddress("");

	// console.log("primera carga wallet", usuario)
	useEffect(() => {
		if (wallet) {
			let addressWallet: string = `${wallet.substr(0, 6)}...${wallet.substr(-4)}`;
			setText(addressWallet);
		}
	}, [wallet]);

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
			upWallet(accounts[0]);
			let addressWallet: string = `${accounts[0]?.substr(0, 6)}...${accounts[0]?.substr(-4)}`;
			setText(addressWallet);

			// Establecimiento de red
			if (ethereum.networkVersion == 5) {
				upRed(true);
			} else {
				upRed(false);
			}

			// Redirect to
			if (router.pathname == "/login") router.push("/home");
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
		<Button leftIcon={<WalletIcon />} onClick={connectMetamask} background={text === " " ? "#EDF2F7" : "#DBF227"} {...props}>
			<Text noOfLines={1} fontSize={{ base: "sm", lg: "md" }}>
				{text === " " ? "Conecta tu wallet" : text}
			</Text>
		</Button>
	);
};

export default WalletButton;
