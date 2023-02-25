import { Button, Icon, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";

import UserContext from "@/context/UserContext";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const WalletButton = ({ ...props }: any) => {
	// STATE
	const [text, setText] = useState("Connect your wallet");
	const router = useRouter();
	const toast = useToast();

	// CONTEXT
	const userContext = useContext(UserContext);
	const { usuario, agregarUsuario, actualizarRed } = userContext;

	useEffect(() => {
		if (usuario.length > 0) {
			let addressWallet: string = `${usuario.substr(0, 6)}...${usuario.substr(-4)}`;
			setText(addressWallet);
		} else router.pathname != "/login" ? router.replace("/login") : "";
	}, []);

	// Truncar (acortar) la dirección de la wallet
	const useTruncatedAddress = (account: any) => {
		const truncated = useMemo(() => `${account?.substr(0, 6)}...${account?.substr(-4)}`, [account]);
		return truncated;
	};

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
			const signer = provider.getSigner();
			// console.log("Signer", signer);
			agregarUsuario(accounts[0]);
			let addressWallet: string = `${accounts[0]?.substr(0, 6)}...${accounts[0]?.substr(-4)}`;
			setText(addressWallet);
			console.log("Account -wallet", addressWallet);

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

	let icon: any = (
		<Icon viewBox="0 0 200 200">
			<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
				<rect width="200" height="200" fill="url(#pattern0)" />
				<defs>
					<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
						<use xlinkHref="#image0_146_409" transform="scale(0.00195312)" />
					</pattern>
					<image
						id="image0_146_409"
						width="512"
						height="512"
						xlinkHref="data:image/png;base64,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"
					/>
				</defs>
			</svg>
		</Icon>
	);

	return (
		<Button rightIcon={icon} onClick={connectMetamask} background="#DBF227" {...props}>
			<Text noOfLines={1} fontSize={{ base: "sm", lg: "md" }}>
				{text}
			</Text>
		</Button>
	);
};

export default WalletButton;