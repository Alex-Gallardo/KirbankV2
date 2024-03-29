import {
	Box,
	Button,
	Card,
	CardBody,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	VStack,
	useToast
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";

import CalculatorIcon from "@/icons/calculator";
import Link from "next/link";
import PersonalIcon from "@/icons/personal";
import UserContext from "@/context/UserContext/UserContext";
import { ethers } from "ethers";
import { googleLogin } from "@/utils/firebase/Auth";
import { useRouter } from "next/router";
import { getDataFromCollection, getFromCollection } from "@/utils/firebase/DB";

const LoginIndex = () => {
	// STATE
	const [stateModal, setStateModal] = useState<boolean>(false);
	const router = useRouter();
	const toast = useToast();

	// CONTEXT
	const userContext = useContext(UserContext);
	const { user, upUser, upNFT, upWallet, upRed } = userContext;

	const initialRef = useRef(null);
	const finalRef = useRef(null);

	// Funcion para conectar Metamask
	const connectMetamask = async () => {
		try {
			const { ethereum }: any = window;
			if (!ethereum) {
				toast({
					title: "Instala Metamask",
					description: "Crea una wallet para conectarte a la blockchain con nosotros",
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
			// console.log("- Signer", accounts);
			upWallet(accounts[0]);
			// let addressWallet: string = `${accounts[0]?.substr(0, 6)}...${accounts[0]?.substr(-4)}`;
			// setText(accounts[0]);
			// setText(addressWallet);
			// console.log("Account -wallet", addressWallet);

			// Establecimiento de red
			// RED ESTABLECIDA
			if (ethereum.networkVersion == 5) {
				upRed(true);
			} else {
				upRed(false);
			}

			// Redirect to
			router.push("/home");
		} catch (err: any) {
			toast({
				title: "Ha ocurrido un error de conexion con Metamask",
				description: err,
				status: "error",
				duration: 2000,
				isClosable: true,
				variant: "solid",
				position: "bottom"
			});
			console.error("Ha ocurrido un error", err);
		}
	};

	// Ingresar con Google
	const singInGoogle = async () => {
		let res = await googleLogin();
		if (res != undefined) {
			// Obtenemos/actualizamos el usuario
			let user = await getFromCollection(res.user.uid, 'users')
			upUser(user);
			// Obtenemos/actualizamos los tokens
			let tokens = await getDataFromCollection('tokens', 'owner', "==", res.user.uid)
			upNFT(tokens)
			// Si todo esta OK, redireccionamos
			router.push("/home");
		}
		console.log("Obtenemos login:", res);
	};

	// ENVIAR A REGISTER
	const sendToRegister = () => {
		router.push("/register");
	};

	return (
		<Stack direction={{ base: "column", lg: "row" }} justify="stretch" w="100vw" h="100vh">
			<Box w={{ base: "100vw", md: "100%", lg: "40%" }} h={{ base: "50%", lg: "100%" }} className="box-background">
				{/* <div className="background-pattern" style={{ width: "100%", height: "100%" }}></div> */}
				{/* divider={<StackDivider borderColor='gray.200' /> }  */}
				<VStack w="full" h="full" className="background-pattern" spacing={4} align="stretch" justify="space-between" p={8}>
					<Heading color="white"></Heading>
					<VStack align="center" mr={2} textAlign="center" spacing={6}>
						<Heading color="white" size={{ base: "2xl", md: "3xl" }}>
							<Image boxSize="500px" objectFit="cover" src="./images/Logotipo Kirbank blanco.svg" alt="Kirabank" 
									h={{ base: "200px", lg: "200px" }}
									/>
						</Heading>
						{/* CALCULADORA */}
						<Card direction="row" overflow="hidden" variant="elevated" mb="5" onClick={() => router.push("/calculator")}>
							<CardBody px={{ base: "4", md: "5" }} py={{ base: "3", md: "4" }} display="flex" flexDir="row" alignItems="center" justifyContent="start">
								<CalculatorIcon w={"25px"} h={"25px"} fill="gray.400" />
								<Text pl="4" color="gray.600" textAlign='start'>
									Perform investment calculations instantly
								</Text>
							</CardBody>
						</Card>
					</VStack>
					<Box></Box>
				</VStack>
			</Box>
			<VStack
				w={{ base: "100vw", md: "100%", lg: "60%" }}
				h={{ base: "auto", lg: "full" }}
				align="flex-start"
				justify={{ base: "start", lg: "center" }}
				px={{ base: 10, md: 20 }}
				py={5}
				spacing={6}
			>
				{/* <Center w='75px' h='75px' bg='yellow.200' borderRadius='full' ></Center> */}
				<Flex direction="column" textAlign={{ base: "start", md: "center" }}>
					<Flex direction='row' textAlign={{ base: "start", md: "center" }} justify={{base: 'start', md: 'center'}} align="center">
						<Heading size={{ base: "xl", md: "2xl" }}>Collection</Heading>
						<Image h={{ base: "30px", md: "60px"}} w={{ base: "30px", md: "60px"}} ml='20px' src="./images/png/nft-icon.png" alt='Kirbank Icon'/>
					</Flex>
					<Text fontSize={{ base: "md", md: "lg" }} maxW="5xl" color="gray.500" mt={{ base: "4", md: "8" }}>
						Join us and become part of the excitement of creating a unique and valuable NFT! We mint an NFT with an exclusive design and an opportunity to generate recurring
						income. Dont miss this opportunity to own a unique and valuable digital asset! Secure your NFT now!
					</Text>
				</Flex>
				<Flex w="100%" align="center" justify="center" mt={{ base: "0", md: "10" }}>
					<Flex w={{ base: "100%", lg: "50%" }} direction="column">
						{/* CARD #1 */}
						<Card direction="row" overflow="hidden" variant="elevated" w="full" maxW="4xl" mb="5" onClick={singInGoogle}>
							<CardBody px="4" py="3" display="flex" flexDir="row" alignItems="center" justifyContent="start">
								<Image
									src="https://cdn.icon-icons.com/icons2/836/PNG/512/Google_icon-icons.com_66793.png"
									alt="Google connect"
									borderRadius="lg"
									w={{ base: "20px", lg: "25px" }}
									h={{ base: "20px", lg: "25px" }}
								/>
								<Text pl="4" color="gray.600">
									Connect with gmail
								</Text>
							</CardBody>
						</Card>
						{/* CARD #2 */}
						{/* <Card direction="row" overflow="hidden" variant="elevated" w="full" maxW="4xl" mb="5" onClick={() => setStateModal(true)}>
							<CardBody px="4" py="3" display="flex" flexDir="row" alignItems="center" justifyContent="start">
								<PersonalIcon w= { { base: "20px", lg: "25px" }} h= { { base: "20px", lg: "25px" }} fill="gray.400" />
								<Text pl="4" color="gray.600">
									Connect your account
								</Text>
							</CardBody>
						</Card> */}
					</Flex>
				</Flex>
			</VStack>
			<Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={stateModal} onClose={() => setStateModal(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Connect with your account</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Mail:</FormLabel>
							<Input ref={initialRef} placeholder="@example.com" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Password</FormLabel>
							<Input placeholder="******" />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="gray" mr={3}>
							Create account
						</Button>
						<Button colorScheme="blue" mr={3}>
							Log in
						</Button>
						<Button onClick={() => setStateModal(false)}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Stack>
	);
};

export default LoginIndex;
