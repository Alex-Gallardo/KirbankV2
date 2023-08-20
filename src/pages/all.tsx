import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Badge,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Flex,
	Heading,
	Image,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	StackDivider,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { getAllFromCollection, getDataFromCollection, saveInCollection, upDataFromCollection } from "@/utils/firebase/DB";
import { useContext, useEffect, useRef, useState } from "react";

// import Image from "next/image";
import { Inter } from "@next/font/google";
import KirbankToken from "@/utils/abi/KirbankToken.json";
import Nav from "@/layouts/nav/nav";
import { TokenSchema } from "@/schemas/TokenSchema";
import UserContext from "@/context/UserContext/UserContext";
import VerifiedCheck from "@/icons/verifiedCheck";
import VerifiedUncheck from "@/icons/verifiedUncheck";
import { abiKirbankTokenAddress } from "config";
import { ethers } from "ethers";

export default function All() {
	// ESTADOS
	const [tokens, setTokens] = useState<TokenSchema[]>([]);
	const [total, setTotal] = useState(0);

	// MODAL
	const [isModal, setOptModal] = useState(false);
	const [isAlert, setOptAlert] = useState(false);
	const [isApproveAlert, setOptApproveAlert] = useState(false);
	// TOKEN SELECCIONADO
	const [isToken, setToken] = useState<any>({});

	const initialRef = useRef(null);
	const finalRef = useRef(null);
	const cancelRef = useRef(null);
	const approveRef = useRef(null);

	// CONTEXT
	const userContext = useContext(UserContext);
	const { nfts, upNFT } = userContext;

	// BLOCKCHAIN
	// // Obtener tokens
	// const getAllTokens = async ()=>{
	// 	const provider = new ethers.providers.JsonRpcBatchProvider("https://eth-goerli.g.alchemy.com/v2/3LjxKHUHH-Vylm2-tRJTs2OR1hgyIp4k");
	// 	const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, provider)
	// 	const getTokens = await contract.getAllKirbankTokens()
	// 	setTokens(getTokens)
	// 	console.log("tokens", getTokens, abiKirbankTokenAddress, process)

	// 	let costTotal: number = 0
	// 	getTokens.forEach((token: any) => {
	// 		let t: number = parseInt(token.cost, 10)
	// 		costTotal += t
	// 	});
	// 	console.log("costTotal", costTotal)
	// 	setTotal(costTotal)
	// }

	// useEffect(()=>{
	// 	getAllTokens()
	// }, [])

	// Computa los calculos
	const computeTableValues = (amount: number, year: number) => {
		let a: number = 0;
		let b: number = 0;

		// Cantidad
		if (amount > 0 && amount <= 1000) {
			a = 0.001;
		} else if (amount > 1000 && amount <= 10000) {
			a = 0.002;
		} else if (amount > 10000 && amount <= 50000) {
			a = 0.004;
		} else if (amount > 50000 && amount <= 100000) {
			a = 0.006;
		} else if (amount > 100000 && amount <= 500000) {
			a = 0.008;
		} else if (amount > 500000 && amount <= 1000000) {
			a = 0.01;
		} else {
			a = 0;
		}

		// Años
		if (year <= 1) {
			b = 0.001;
		} else if (year > 1 && year <= 2) {
			b = 0.002;
		} else if (year > 2 && year <= 3) {
			b = 0.004;
		} else if (year > 3 && year <= 4) {
			b = 0.006;
		} else if (year > 4 && year <= 5) {
			b = 0.008;
		} else if (year > 5 && year <= 10) {
			b = 0.01;
		} else if (year > 10 && year <= 15) {
			b = 0.012;
		} else if (year > 15 && year <= 20) {
			b = 0.014;
		} else {
			b = 0;
		}

		let percent: number = a + b;
		let profit: number = amount * percent;
		let final: number = amount * percent + amount;
		return { percent, profit, final };
	};

	const getTokens = async () => {
		let respuesta = await getAllFromCollection("tokens");
		setTokens(respuesta as any);
	};

	useEffect(() => {
		getTokens();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Aprueba el token
	const aproveToken = async (id: number) => {
		// await upDataFromCollection({ applicationStatus: "approved", verified: true }, id + '', 'tokens')

		let tmpTokens = [...tokens].map(token => {
			let ntoken = {...token}
			if(token._id === id){
				ntoken.applicationStatus = "approved"
				ntoken.verified = true
			}
			return ntoken
		})
		setTokens(tmpTokens)

		// Actualizamos en el context
		let tmpContextTokens = [...nfts].map((token: TokenSchema) => {
			let ntoken = {...token}
			if(token._id === id){
				ntoken.applicationStatus = "approved"
				ntoken.verified = true
			}
			return ntoken
		})
		upNFT(tmpContextTokens)
		setOptModal(false)
		setOptApproveAlert(false)
	}

	// Elimina el token
	const deleteToken = async (id: number) => {
		alert(`Token deleted: ${id}`)
		setOptAlert(false)
		setOptModal(false)
	}

	// Activa el modal
	const activeModal = (token: any) => {
		setToken(token);
		setOptModal(true);
	};

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="max-content" mt={12} px={10}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column" }} align="center" justify="start" w="full" mb={12}>
					<Box mb={10} w="full">
						<Heading>Kirbank Tokens ({tokens.length}/500)</Heading>
						<Text>All KirbankTokens</Text>

						<Text mt={5} fontSize="2xl">
							Total: $ <Text as="b">{total}</Text>
						</Text>
					</Box>

					{/* LISTADO #2 */}
					<Wrap spacing="10px">
						{[...tokens].reverse().map((token: TokenSchema, i: number) => {
							let dateToken: any = new Date(token.dateCreate);
							return (
								<WrapItem key={i} w='full'>
									<Card direction='row' variant="outline" w='full' align='center' p='3'>
										<Image maxW='200px' maxH='200px' src={token.imageUrl} alt="Kirbank NFT Token" borderRadius="md" />
										<Stack spacing="2" w='full' ml='7'>
											<Heading size="md">Kirbank Token #KBT</Heading>
											<Text noOfLines={1}>
												investment: <Badge colorScheme="green">$ {token.amount}</Badge>
											</Text>
											<Text noOfLines={1}>
												time: <Badge colorScheme="blue">{token.yearsSet} years</Badge>
											</Text>
											<Text noOfLines={1}>
												created:{" "}
												<Badge colorScheme="orange">{`${dateToken.getHours()}:${dateToken.getMinutes()} - ${dateToken.getDate()}/${dateToken.getMonth() + 1}/${dateToken.getFullYear()}`}</Badge>
											</Text>
											<Text noOfLines={1}>
												percentage:{" "}
												<Badge colorScheme="purple">{computeTableValues(token.amount, token.yearsSet).percent.toFixed(3)}%</Badge>
											</Text>
											{/* <Text  noOfLines={1}>time: <Badge colorScheme='purple'>{token.yearsSet} years</Badge></Text> */}
											<Text>
												mail: <Text as="b">{token.ownerMail}</Text>
											</Text>
										</Stack>
										<Divider />
										<CardFooter>
											<Stack direction='column' justify='start'>
												<Stack direction='row' spacing='3' justify='center' align='center'>
													{token.verified ? (
														<VerifiedCheck w='70px' h='70px' />
													) : (
														<VerifiedUncheck w='70px' h='70px' />
													)}
													<Button variant="outline" colorScheme="linkedin" onClick={() => activeModal(token)}>
														Actions
													</Button>
												</Stack>
											</Stack>
											<ButtonGroup spacing="2">
											</ButtonGroup>
										</CardFooter>
									</Card>
								</WrapItem>
							)
						})}
					</Wrap>
					{/* MODAL */}
					<Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isModal} onClose={() => setOptModal(false)} size='2xl' variant='unstyled' isCentered>
						<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
						<ModalContent>
							<ModalHeader>NFT information</ModalHeader>
							<ModalCloseButton />

							<ModalBody pb={6}>
								<Stack direction="row" gap="6" align="start" justify="center">
									<Image w='300px' h='300px' src={isToken.voucherURL} alt="Kirbank NFT Token" borderRadius="lg" />
									<Stack direction="column" gap="1" align="start" justify="start" h='full'>
										<Text>Status:</Text>
										<Text><Badge colorScheme={isToken.applicationStatus == 'pending' ? "orange" : "green"}>{isToken.applicationStatus}</Badge></Text>
										<Text><Badge colorScheme={isToken.verified ? "green" : "red"}>{isToken.verified == true ? "verified" : "unverified"}</Badge></Text>
									</Stack>
								</Stack>
							</ModalBody>

							<ModalFooter>
								<Link href={isToken.voucherURL} isExternal mx={5}>
									Expand image
								</Link>
								<Button variant="solid" colorScheme="green" isDisabled={isToken.verified ? true : false} onClick={() => setOptApproveAlert(true)} mr={3}>
									Approve
								</Button>
								<Button variant="solid" colorScheme="red" onClick={() => setOptAlert(true)} mr={3}>
									Delete
								</Button>
								<Button onClick={() => setOptModal(false)}>Cancel</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
					{/* ALERTA APPROVED */}
					<AlertDialog
						isOpen={isApproveAlert}
						leastDestructiveRef={approveRef}
						onClose={() => setOptApproveAlert(false)}
						motionPreset='slideInBottom'>
						<AlertDialogOverlay>
							<AlertDialogContent>
								<AlertDialogHeader fontSize='lg' fontWeight='bold'>
									Approve Token
								</AlertDialogHeader>

								<AlertDialogBody>
									The token will be verified and the owner will receive an email confirming the approval and requesting personal financial data.
								</AlertDialogBody>

								<AlertDialogFooter>
									<Button ref={approveRef} onClick={() => setOptApproveAlert(false)}>
										Cancel
									</Button>
									<Button colorScheme='green' onClick={() => aproveToken(isToken._id)} ml={3}>
										Approve
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog>
					{/* ALERTA DELETE */}
					<AlertDialog
						isOpen={isAlert}
						leastDestructiveRef={cancelRef}
						onClose={() => setOptAlert(false)}
						motionPreset='slideInBottom'>
						<AlertDialogOverlay>
							<AlertDialogContent>
								<AlertDialogHeader fontSize='lg' fontWeight='bold'>
									Delete Token
								</AlertDialogHeader>

								<AlertDialogBody>
									Are you sure? You cant undo this action afterwards.
								</AlertDialogBody>

								<AlertDialogFooter>
									<Button ref={cancelRef} onClick={() => setOptAlert(false)}>
										Cancel
									</Button>
									<Button colorScheme='red' onClick={() => deleteToken(isToken._id)} ml={3}>
										Delete
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog>
				</Flex>
			</Box>
		</Nav>
	);
}
