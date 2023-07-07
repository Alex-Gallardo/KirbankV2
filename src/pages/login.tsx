import {
	Box,
	Button,
	Card,
	CardBody,
	Center,
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
	StackDivider,
	Text,
	VStack,
	useToast
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";

import CalculatorIcon from "@/icons/calculator";
import Link from "next/link";
import PersonalIcon from "@/icons/personal";
import UserContext from "@/context/UserContext";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { googleLogin } from "@/utils/firebase/Auth";
const LoginIndex = () => {
	// STATE
	const [stateModal, setStateModal] = useState<boolean>(false);
	const router = useRouter();
	const toast = useToast();

	// CONTEXT
	const userContext = useContext(UserContext);
	const { user, agregarUsuario, actualizarRed } = userContext;

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
			router.push("/");
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
			agregarUsuario(res.user);
			router.push("/");
		}
		console.log("Obtenemos login:", res);
	};

	// ENVIAR A REGISTER
	const sendToRegister = () => {
		router.push("/register");
	};

	return (
		<Stack direction={{ base: "column", lg: "row" }} justify="stretch" w="100vw" h="100vh">
			<Box w={{ base: "100vw", md: "100%", lg: "30%" }} h={{ base: "30%", lg: "100%" }}>
				{/* <div className="background-pattern" style={{ width: "100%", height: "100%" }}></div> */}
				{/* divider={<StackDivider borderColor='gray.200' /> }  */}
				<VStack w="full" h="full" className="background-pattern" spacing={4} align="stretch" justify="space-between" p={8}>
					<Heading color="white">Kirbank</Heading>
					{/* <VStack align='start' mr={2}>
							<Heading color='white'>Kirbank NFT</Heading>
							<Text color='white' fontSize={{base: "md", md:'lg'}}>
								Join us and become part of the excitement of creating a unique and valuable NFT!
							</Text>
						</VStack> */}
					<Text color="white" as="b">
						1 KBTK = $1.24
					</Text>
				</VStack>
			</Box>
			<VStack w="full" h={{ base: "auto", lg: "full" }} align="flex-start" justify={{ base: "start", lg: "center" }} px={10} py={5} spacing={6}>
				{/* <Center w='75px' h='75px' bg='yellow.200' borderRadius='full' ></Center> */}
				<Flex direction="column">
					<Heading>NFT Collection</Heading>
					<Text fontSize={{ base: "sm", md: "md" }} maxW="5xl" color="gray.500">
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
						<Card direction="row" overflow="hidden" variant="elevated" w="full" maxW="4xl" mb="5" onClick={() => setStateModal(true)}>
							<CardBody px="4" py="3" display="flex" flexDir="row" alignItems="center" justifyContent="start">
								<PersonalIcon w={{ base: "20px", lg: "25px" }} h={{ base: "20px", lg: "25px" }} fill="gray.300" />
								<Text pl="4" color="gray.600">
									Connect your account
								</Text>
							</CardBody>
						</Card>
						{/* CARD #3 */}
						<Card direction="row" overflow="hidden" variant="elevated" w="full" maxW="4xl" mb="5" onClick={() => router.push("/calculator")}>
							<CardBody px="4" py="3" display="flex" flexDir="row" alignItems="center" justifyContent="start">
								<CalculatorIcon w={{ base: "20px", lg: "25px" }} h={{ base: "20px", lg: "25px" }} fill="gray.300" />
								<Text pl="4" color="gray.600">
									Make your investment calculations in real time
								</Text>
							</CardBody>
						</Card>
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
