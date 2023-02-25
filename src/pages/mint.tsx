import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	Container,
	Flex,
	HStack,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Spacer,
	StackDivider,
	Text,
	VStack
} from "@chakra-ui/react";

import Image from "next/image";
import { Inter } from "@next/font/google";
import Nav from "@/layouts/nav/nav";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function MintIndex() {
	// ESTADOS
	const [visible, setVisible] = useState(false);
	const [minting, setMinting] = useState(false);

	// Proceso de minteo
	const setMintingProcces = () => {
		setMinting(true);
		setTimeout(() => {
			setMinting(false);
			setVisible(true);
			setTimeout(() => {
				setVisible(false);
			}, 5000);
		}, 3000);
	};

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Box minWidth="full" maxWidth="container.xl" h="full" mt={12}>
				{/* HEADING */}
				<Flex flexDirection="column" align="cstart" justify="start">
					<Box>
						<Heading>Kirbank Minting</Heading>
						<Text>Join us and become part of the excitement of creating a unique and valuable NFT!</Text>
					</Box>
				</Flex>
				{/* BODY - CONTAINER */}
				<Container mt={12}>
					<VStack
						divider={<StackDivider borderColor="gray.400" />}
						spacing={0}
						align="stretch"
						w={{ base: "full" }}
						mt={{ base: 3, lg: 0 }}
						border="2px"
						borderColor="gray.500"
						rounded="lg"
						overflow="hidden"
					>
						<Box p="2">
							<InputGroup>
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
								<Input placeholder="Enter amount" />
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
						</Box>
						{/* ENTRADA DOBLE */}
						<HStack divider={<StackDivider borderColor="gray.400" />} spacing={0} align="stretch" w="full" overflow="hidden">
							<Box p="2" flex="1">
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="Y" />
									<Input placeholder="Enter years" />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
							</Box>
							<Box p="2" flex="1">
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="%" />
									<Input placeholder="Percentage" />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
							</Box>
						</HStack>
						{/* RESUMEN */}
						<VStack spacing={2} p="2" w="full">
							<Flex minWidth="full" alignItems="center" gap="2" justify="start">
								<Text color="gray.500">NFT</Text>
								{/* <Spacer /> */}
								<Text color="blue.900" as="b">
									KTB #32
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2" mt={3}>
								<Text color="blue.900"> $ 3,000.00</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									2 years
								</Text>
								<Spacer />
								<Text color="blue.900">$ 3,000.00</Text>
							</Flex>
						</VStack>
					</VStack>
				</Container>
				<Container mt={8}>
					<Button
						isLoading={minting}
						loadingText="Añadiendo a la blockchain..."
						bg="blue.900"
						variant="solid"
						color="white"
						spinnerPlacement="end"
						w="full"
						onClick={() => setMintingProcces()}
						colorScheme="facebook"
					>
						MINTING
					</Button>
				</Container>
				{/* ALERTA */}
				<Box mt={{ base: 8, lg: 10 }} mb={2} display="flex" alignItems="center">
					{visible && (
						<Alert status="success">
							<AlertIcon />
							<Box flex="1">
								<AlertTitle>NFT Minted!</AlertTitle>
								<AlertDescription>Your application has been received. We will review your application and respond within the next 48 hours.</AlertDescription>
							</Box>
							<CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={() => setVisible(false)} />
						</Alert>
					)}
				</Box>
			</Box>
			{/* </main> */}
		</Nav>
	);
}
