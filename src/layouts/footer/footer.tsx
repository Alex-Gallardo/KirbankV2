import * as React from "react";

import { Box, Container,  Flex, Spacer,  Text, useToast } from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useCallback, useContext, useEffect } from "react";

import UserContext from "@/context/UserContext/UserContext";

export default function Footer() {
	const toast = useToast();

	// CONTEXT
	const userContext = useContext(UserContext);
	const { user, red, upRed } = userContext;

	// Evalua las circustancias de la red
	const checkRedIsRunning = useCallback(() => {
		const { ethereum }: any = window;

		if (!ethereum) {
			toast({
				title: "Metamask no encontrado",
				status: "error",
				duration: 1250,
				variant: "solid",
				position: "bottom-right"
			});
			// router.push("/login");
			return;
		} else {
			// RED ESTABLECIDA
			if (ethereum.networkVersion == 5) {
				toast({
					title: "Conectado a la red",
					status: "success",
					duration: 1250,
					variant: "solid",
					position: "bottom-right"
				});
			} else {
				toast({
					title: "Desconectado de la red",
					status: "warning",
					duration: 1250,
					variant: "solid",
					position: "bottom-right"
				});
			}

			// Metodo de Metamask cuando cambiamos de RED (Cadena)
			// ethereum.on()
			ethereum.on("chainChanged", (networkID: any) => {
				console.log("NetworkEthereum", networkID, parseInt(networkID));
				if (parseInt(networkID) == 5) {
					upRed(true);
					toast({
						title: "Cambio a red correcta! Home",
						status: "success",
						duration: 1250,
						variant: "solid",
						position: "bottom-right"
					});
				} else {
					upRed(false);
					toast({
						title: "Cambio a red incorrecta! Home",
						status: "warning",
						duration: 1250,
						variant: "solid",
						position: "bottom-right"
					});
				}
			});
		}
	},[ upRed, toast]);

	useEffect(() => {
		checkRedIsRunning()
	}, [checkRedIsRunning]);

	return (
		<Container minWidth="full" h="auto" p={4} borderTop={"2px"} borderColor="gray.200">
			<Flex flexDirection="row" justify="space-between" align="center" width="full" px={{ base: "0",  lg: "5" }}>
				<Text color="gray.300" fontSize={{ base: "sm", lg: "md" }} noOfLines={1} >
					© {new Date().getFullYear()} Kirbank all rights reserved
				</Text>
				<Flex justify="space-between" align="center" px={{ sm: "0", md: "1", lg: "5" }}>
					<Box px="2" display="flex" alignItems="center" color={red ? "gray.800" : "red.500"}>
						{red ? <CheckIcon mr={2} /> : <SmallCloseIcon mr={2} />}
						<Text fontSize={{ base: "sm", lg: "md" }} noOfLines={1}>{red ? "Network connected" : "Network offline"}</Text>
					</Box>
					<Spacer />
					<Box px="2" display="flex" alignItems="center" color={user ? "gray.800" : "red.500"}>
						{user ? <CheckIcon mr={2} /> : <SmallCloseIcon mr={2} />}
						<Text fontSize={{ base: "sm", lg: "md" }} noOfLines={1}>{user ? "Wallet connected" : "Wallet offline"}</Text>
					</Box>
				</Flex>
			</Flex>
		</Container>
	);
}
