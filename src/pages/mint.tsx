import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Spacer,
	Stack,
	StackDivider,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	Tag,
	TagLabel,
	Text,
	VStack,
	useToast
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import BitcoinIcon from "../icons/bitcoin";
import EthereumIcon from "@/icons/ethereum";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import KirbankToken from "@/utils/abi/KirbankToken.json";
import Nav from "@/layouts/nav/nav";
import { TokenSchema } from "@/schemas/TokenSchema";
import UserContext from "@/context/UserContext/UserContext";
import { abiKirbankTokenAddress } from "config";
import { ethers } from "ethers";
import { saveInCollection } from "@/utils/firebase/DB";
import { addToStorage, getURLFromStorage } from "@/utils/firebase/Storage";

interface KirbankToken {
	imageUrl: string;
	cost: string;
	yearsSet: string;
	dateCreate: string;
}

// IMAGENES
const tokenImages: string[] = [
	"https://i.ibb.co/mCgph2x/NFT-Kirbank-1.png",
	"https://i.ibb.co/QCnCz1k/NFT-Kirbank-2.png",
	"https://i.ibb.co/BNrmy8n/NFT-Kirbank-3.png",
	"https://i.ibb.co/XbHkWYc/NFT-Kirbank-4.png",
	"https://i.ibb.co/M90PDpL/NFT-Kirbank-5.png",
	"https://i.ibb.co/WsHXzWn/NFT-Kirbank-6.png",
	"https://i.ibb.co/GW00q5N/NFT-Kirbank-7.png",
	"https://i.ibb.co/sH3ch3f/NFT-Kirbank-8.png",
	"https://i.ibb.co/ySH8xNf/NFT-Kirbank-9.png",
	"https://i.ibb.co/m5MZpPK/NFT-Kirbank-10.png",
	"https://i.ibb.co/5kymnCQ/NFT-Kirbank-11.png",
	"https://i.ibb.co/Y2BBY7S/NFT-Kirbank-12.png",
	"https://i.ibb.co/99jQ79T/NFT-Kirbank-13.png",
	"https://i.ibb.co/hWLMrzL/NFT-Kirbank-14.png",
	"https://i.ibb.co/Ph6Pbv4/NFT-Kirbank-15.png",
	"https://i.ibb.co/Z2hmmcD/NFT-Kirbank-16.png",
	"https://i.ibb.co/yRSKcDM/NFT-Kirbank-17.png",
	"https://i.ibb.co/KNcfyqH/NFT-Kirbank-18.png",
	"https://i.ibb.co/TPqpmPB/NFT-Kirbank-19.png",
	"https://i.ibb.co/YXgN2DB/NFT-Kirbank-20.png"
];

// PASOS
const steps = [
	{ title: "Payment method", description: "Choose how you will pay" },
	{ title: "Calculator", description: "Calculate your investment" },
	{ title: "Verify information", description: "Check that everything is in order" }
];

export default function MintIndex() {
	// ESTADOS
	// Nuevo token
	const [newToken, setNewToken] = useState<TokenSchema>({
		_id: new Date().getTime(),
		owner: "-",
		ownerMail: "",
		ownerWallet: "",
		imageUrl: "https://media4.giphy.com/media/pn1e1I4nAVtSMo1h7y/giphy.gif?cid=ecf05e47ryp98dwo8ttimovuonlp970vmz9xwzpjbnywvolf&rid=giphy.gif&ct=g",
		amount: 0,
		percent: 0,
		yearsSet: 0,
		paymentMethod: "",
		dateCreate: Date.now(),
		applicationStatus: "",
		dataUri: "",
		collection: "dogs",
		verified: false,
		voucherURL: ''
	});
	//  - - - -  ESTADOS DE CALCULADORA - - - - - - - - - - -
	const [calc, setCalc] = useState<{ amount: number; year: number; percent: number; profit: number; final: number }>({
		amount: 0,
		year: 1,
		percent: 0,
		profit: 0,
		final: 0
	});
	const [price, setPrice] = useState<{ ethereum: number; bitcoin: number }>({ ethereum: 0, bitcoin: 0 });
	const [priceAct, setPriceAct] = useState(0);
	const [coin, setCoin] = useState("TSS");
	const [visible, setVisible] = useState(false);
	// - - - -  ESTADOS DE LOS PASOS - - - - - - - - - - -
	const [stepIndex, setStepIndex] = useState<number>(0);
	const [methodBuy, setMethodBuy] = useState<boolean>(false);
	const [minting, setMinting] = useState(false);
	//  - - - -  ESTADOS GENERALES - - - - - - - - - - -
	const [tokens, setTokens] = useState([]);
	const [voucherURL, setVoucherURL] = useState<string>('')

	// CONTEXT
	const userContext = useContext(UserContext);
	const { user, nfts, red, upNFT } = userContext;

	// TOAST
	const toast = useToast();
	const router = useRouter();

	// Computa los calculos
	const computeTableValues = () => {
		const { amount, year } = calc;

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
		setCalc({ ...calc, percent, final, profit });
	};

	// Precios ETH, BTC, MATIC
	async function getEthPrice() {
		const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd");
		const data = await response.json();
		// const ethPrice = data.ethereum.usd;
		return data;
	}

	// Cambios select criptomoneda
	const handleChangeSelect = (event: any) => {
		const val = event.target.value;

		switch (val) {
			case "ETH":
				//@ts-ignore
				setPriceAct(price.ethereum.usd);
				setCoin("ETH");
				break;
			case "BTC":
				//@ts-ignore
				setPriceAct(price.bitcoin.usd);
				setCoin("BTC");
				break;
			default:
				//@ts-ignore
				setPriceAct(price.ethereum.usd);
				setCoin("ETH");
		}
	};

	// Cambios input
	const handleChange = (event: any, op: string) => {
		let valor: any = 0;
		if (op != "year") valor = event.target.value;
		if (valor == "") valor = 0;

		switch (op) {
			case "amount":
				setCalc({ ...calc, amount: parseInt(valor, 10) });
				setNewToken({ ...newToken, amount: valor });
				break;
			case "year":
				setCalc({ ...calc, year: parseInt(event) });
				setNewToken({ ...newToken, yearsSet: event });
				break;
			case "link":
				setNewToken({ ...newToken, imageUrl: valor + "" });
				break;
			default:
				setCalc({ ...calc });
				break;
		}
	};

	// CAMBIOS EN EL SELECT DE METODO DE PAGO
	const handleChangeSelectMethod = (event: any) => {
		const val = event.target.value;

		switch (val) {
			case "CRIPTO": // Criptomoneda
				setMethodBuy(true);
				setCoin("ETH");
				break;
			case "TSS": // Transferencia
				setMethodBuy(false);
				setCoin("TSS");
				break;
			default:
				setMethodBuy(false);
				setCoin("ETH");
				break;
		}
	};

	// Siguiente step y ordena el minteo
	const nextStep = async (indicator: boolean) => {
		let upStep: number = stepIndex;

		// Validamos el indicador
		if (indicator) {
			upStep = stepIndex + 1;
		} else {
			upStep = stepIndex - 1;
		}

		// Validamos los limites de los pasos
		if (upStep <= 0) upStep = 0;
		else if (upStep >= 3) upStep = 3;

		setStepIndex(upStep);
	};

	// Obtener tokens
	// const getAllTokens = async () => {
	// 	const provider = new ethers.providers.JsonRpcBatchProvider("https://eth-goerli.g.alchemy.com/v2/3LjxKHUHH-Vylm2-tRJTs2OR1hgyIp4k");
	// 	const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, provider);
	// 	const getTokens = await contract.getAllKirbankTokens();
	// 	setTokens(getTokens);
	// };

	// Elige una imagen para el NFT
	const selectImageUrl = () => {
		const indiceAleatorio = Math.floor(Math.random() * tokenImages.length);
		return tokenImages[indiceAleatorio];
	};

	// Proceso de minteo
	const setMintingProcces = () => {
		setMinting(false);
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 8000);
	};

	// Crear un nuevo NFT Firebase
	const createNewNft = async () => {
		const newNFT: TokenSchema = { ...newToken };

		// Agregamos los datos necesario
		// - - - - - Calculadora - - - - - -
		newNFT.amount = calc.amount;
		newNFT.yearsSet = calc.year;
		newNFT.percent = calc.percent;
		// - - - - - Owner blockchain - - - - - -
		// @ts-ignore
		newNFT.owner = user?._id || "not found";
		// @ts-ignore
		newNFT.ownerMail = user?.mail || "not found";
		// @ts-ignore
		newNFT.ownerWallet = user?.wallet || "not found";
		// - - - - - Metodo de pago - - - - - -
		newNFT.paymentMethod = methodBuy ? "cryptocurrency" : "transfer";
		newNFT.applicationStatus = "pending";
		// - - - - - Imagen - - - - - -
		newNFT.imageUrl = selectImageUrl();
		newNFT.voucherURL = voucherURL

		await saveInCollection(newNFT, newNFT._id + "", "tokens");

		// Actualizar en el contexto
		let nftsNew: any = [...nfts]
		nftsNew.push(newNFT)
		upNFT(nftsNew)
	};

	// Mintear token a la blockchain
	const addTokenBlockchain = async () => {
		const { ethereum }: any = window;

		// ESTOS DATOS SON PARA FIREBASE
		setMintingProcces();
		createNewNft();

		// Creacion en la blockchain
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, signer);
			const transaction = await contract.addKirbankToken(newToken.imageUrl, newToken.amount, newToken.yearsSet, newToken.dateCreate);
			setMinting(true);
			console.log("Transaction initalized");
			await transaction.wait();
			toast({
				title: "Successful request!",
				description: "You have just created an NFT with us, you will receive a confirmation notification shortly",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top-right"
			});
			console.log("Transaction fiinitalized");
			setMintingProcces();
		}
	};

	// Mintear token normal
	const mintToken = ()=>{
		setMinting(true);
		setTimeout(() => {
			toast({
				title: "Successful request!",
				description: "You have just created an NFT with us, you will receive a confirmation notification shortly",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top-right"
			});
			createNewNft()
			setTimeout(() => {
				setMintingProcces();
				setStepIndex(0)
				setVoucherURL('')
			}, 2000);	
		}, 3000);
	}

	// SUBIR IMAGEN STORAGE-FIREBASE
	const computeImg = (value: any) => {
		const files = value.target.files;
		console.log("file-input", files, files[0].name);

		if(!!files[0]){
			addToStorage("voucher", files[0].name, files[0])
				.then(async (_res) => {
					await getURLFromStorage("voucher", files[0].name).then((r) => {
						console.log("Respuesta:", _res, r);

						setNewToken({...newToken, voucherURL: r})
						setVoucherURL(r)

						toast({
							title: `La imagen "${files[0].name}" se ha subido correctamente!`,
							status: "success",
							duration: 5000,
							variant: "solid",
							position: "top-right"
						});
					});
				})
				.catch((err) => {
					toast({
						title: `Hubo un error en la subida de la imagen, intenta recargar la pagina e intentalo de nuevo`,
						status: "error",
						duration: 5000,
						variant: "solid",
						position: "top-right"
					});
					setStepIndex(1)
					setVoucherURL('')
					console.error("uploadImage-config-computeImg", err);
				});
		}else{
			toast({
				title: "Upps detectamos un error",
				description:'Ocurrio un error en la subida de la imagen, intenta subir la imagen de nuevo',
				status: "error",
				duration: 5000,
				variant: "solid",
				position: "top-right"
			});
			setStepIndex(1)
			setVoucherURL('')
			console.error("error de file-imagen");
		}
	};

	// Obtiene los precios de criptomonedas
	useEffect(() => {
		getEthPrice().then((res: any) => {
			setPrice({ ...res });
			setPriceAct(res.ethereum.usd);
		});
	}, []);

	// Computa los datos de la calculadora
	useEffect(() => {
		computeTableValues();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calc.year, calc.amount]);

	// Obtener datos de localStorage
	useEffect(() => {
		// getAllTokens();

		let a = localStorage.getItem("ammount");
		let y = localStorage.getItem("year");
		let c = localStorage.getItem("coin");
		if (a && y) setCalc({ ...calc, amount: parseInt(a, 10), year: parseInt(y, 10) });
		if (c) setCoin(c);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Box minWidth="full" maxWidth="container.xl" mt="12" mb="2">
				{/* HEADING */}
				<Flex flexDirection="column" align="start" justify="start">
					<Box>
						<Heading as="h2">Kirbank Minting</Heading>
						<Text>Join us and become part of the excitement of creating a unique and valuable NFT!</Text>
					</Box>
				</Flex>
				{/* BODY - CONTAINER */}
				<Flex direction="column" align="center" justify="center" mt="12">
					{/* DESKTOP-STEPS */}
					<Stepper index={stepIndex} mb="10" size={{ base: "sm", md: "md", lg: "lg" }} display={{ base: "none", md: "flex" }} w="full" colorScheme="twitter">
						{steps.map((step, index) => (
							<Step key={index}>
								<StepIndicator>
									<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
								</StepIndicator>

								<Box flexShrink="0">
									<StepTitle>{step.title}</StepTitle>
									<StepDescription>{step.description}</StepDescription>
								</Box>

								<StepSeparator />
							</Step>
						))}
					</Stepper>
					{/* MOBILE-STEPS */}
					<Stepper index={stepIndex} mb="10" size={{ base: "sm" }} display={{ base: "flex", md: "none" }} orientation="vertical" w="full" colorScheme="green">
						{steps.map((step, index) => (
							<Step key={index}>
								<StepIndicator>
									<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
								</StepIndicator>

								<Box flexShrink="0">
									<StepTitle>{step.title}</StepTitle>
									<StepDescription>{step.description}</StepDescription>
								</Box>

								<StepSeparator />
							</Step>
						))}
					</Stepper>
					{/* CONTENENDORES DE INFORMACION */}
					{stepIndex === 0 ? (
						<VStack align="stretch" w={{ base: "full" }} mt={{ base: 3, lg: 0 }} border="2px" borderColor="gray.500" rounded="lg" px="8" py="5">
							<VStack>
								<Flex flex={{ base: "1", md: "2" }} align="center" justify="center" w="full" pb="3">
									<Text>Choose your payment method:</Text>
								</Flex>
								<Select
									value={coin == "TSS" ? "TSS" : "CRIPTO"}
									pr={{ base: "0", md: "2" }}
									color="gray.500"
									onChange={(e) => handleChangeSelectMethod(e)}
									flex={{ base: "1", md: "3" }}
								>
									<option value="TSS">Wire transfer</option>
									<option value="CRIPTO">Cryptocurrency</option>
									{/* <option value='matic'>Polygon</option> */}
								</Select>
							</VStack>
						</VStack>
					) : stepIndex === 1 ? (
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
							<VStack p="2">
								{/* <Box w="full">
									<InputGroup>
										<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
											i
										</InputLeftElement>
										<Input placeholder="Link image http://..." onChange={(e) => handleChange(e, "link")} />
									</InputGroup>
								</Box> */}
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
										$
									</InputLeftElement>
									<Input value={calc.amount} placeholder="Enter amount" type="number" onChange={(e) => handleChange(e, "amount")} />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
								{methodBuy ? (
									<Stack
										direction={{ base: "column", md: "row" }}
										divider={<StackDivider display={{ base: "none", md: "flex" }} borderColor="gray.400" />}
										spacing={0}
										align="center"
										w="full"
										overflow="hidden"
									>
										<Select value={coin} pr={{ base: "0", md: "2" }} color="gray.500" onChange={(e) => handleChangeSelect(e)} flex={{ base: "1", md: "3" }}>
											<option value="ETH">Ethereum</option>
											<option value="BTC">Bitcoin</option>
											{/* <option value='matic'>Polygon</option> */}
										</Select>
										<Flex p="2" flex={{ base: "1", md: "2" }} align="center" justify="center" w="full">
											<Text color="white" as="b" bg={coin == "ETH" ? "blue.600" : "yellow.500"} py="1" px="2" borderRadius="4">
												1 {coin} = {priceAct} USD
											</Text>
										</Flex>
									</Stack>
								) : (
									""
								)}
							</VStack>

							{/* ENTRADA DOBLE */}
							<Stack direction={{ base: "column", md: "row" }} divider={<StackDivider borderColor="gray.400" />} spacing={0} align="stretch" w="full" overflow="hidden">
								<Flex p="2" flex="1" direction="row" align="center">
									<Text mr={5} as="b" color="blue.900">
										Years:
									</Text>
									<NumberInput value={calc.year} max={20} min={1} onChange={(e) => handleChange(e, "year")}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</Flex>
								<Flex p="2" flex="1" align="center" justify="end">
									<Text color="blue.900" as="b">
										{calc.percent * 100} %
									</Text>
								</Flex>
							</Stack>
							{/* RESUMEN */}
							<VStack spacing={2} p="2" w="full">
								<Flex minWidth="full" alignItems="center" gap="2" justify="space-between" mb="5">
									<Text color="blue.900" as="b">
										KTB #{tokens.length + 1}
									</Text>
									{coin != "TSS" ? (
										<Tag color="white" bg={coin == "ETH" ? "blue.500" : "yellow.400"}>
											<TagLabel>
												{(calc.amount / priceAct).toFixed(2)} {coin}
											</TagLabel>
											{coin == "ETH" ? <EthereumIcon fill="white" w="16px" h="16px" ml="1" /> : <BitcoinIcon fill="white" w="16px" h="16px" ml="1" />}
										</Tag>
									) : (
										""
									)}
								</Flex>
								<Flex minWidth="full" alignItems="center" gap="2" mt={3}>
									<Text color="blue.900">
										<Text as="b">year: </Text> $ {calc.profit.toFixed(2)}
									</Text>
									<Spacer />
									<Text color="blue.900" as="b">
										{calc.year} years
									</Text>
									<Spacer />
									<Text color="blue.900">
										<Text as="b">final: </Text> $ {(calc.profit * calc.year + calc.amount).toFixed(2)}
									</Text>
								</Flex>
							</VStack>
						</VStack>
					) : (
						<VStack
							divider={<StackDivider borderColor="gray.400" />}
							spacing={0}
							align="stretch"
							w={{ base: "full" }}
							mt={{ base: 3, lg: 0 }}
							border="2px"
							borderColor="gray.500"
							rounded="lg"
						>
							{/* Opciones en metodo de pago */}
							<VStack px="3" py="4">
								<Flex flex={{ base: "1", md: "2" }} align="center" justify="center" w="full">
									<Text>{methodBuy ? "Make the transaction directly on your wallet" : "Upload your voucher"}</Text>
								</Flex>
								<InputGroup style={{ display: methodBuy ? "none" : "flex" }}>
									<Input id="voucher_image" accept="image/png,image/jpg" type="file" multiple={false} onChange={(e: any) => computeImg(e)} />
								</InputGroup>
							</VStack>

							{/* RESUMEN */}
							<VStack px="3" py="4">
								{methodBuy ? (
									<Flex minWidth="full" alignItems="center" gap="2" justify="space-between">
										<Text color="blue.900" as="b">
											Add Kirbank NFT
										</Text>
										<Button bg="green.400" variant="solid" color="white" onClick={() => addTokenBlockchain()} colorScheme="whatsapp">
											Mint
										</Button>
									</Flex>
								) : (
									<Flex minWidth="full" alignItems="center" gap="2" justify="space-between">
										<Text color="blue.900" as="b">
											Uploaded documents
										</Text>
										<Tag>
											<TagLabel>0 Mb</TagLabel>
										</Tag>
									</Flex>
								)}
							</VStack>
						</VStack>
					)}
				</Flex>
				{/* BOTONES DE CONTINUAR */}
				<Flex mt={8}>
					<Button bg="blue.400" variant="solid" color="white" mr="5" onClick={() => nextStep(false)} colorScheme="twitter">
						BACK
					</Button>
					{stepIndex != 2?
						<Button
							bg="blue.400"
							variant="solid"
							color="white"
							w="full"
							onClick={() => nextStep(true)}
							colorScheme="twitter"
							>
							NEXT
						</Button>
					: user === null || voucherURL === ''?
						<Button></Button>
					:
						<Button
							isLoading={minting}
							loadingText="Adding to the blockchain..."
							bg="blue.400"
							variant="solid"
							color="white"
							spinnerPlacement="end"
							w="full"
							onClick={mintToken}
							colorScheme="twitter">Mint</Button>
						}
				</Flex>
				{/* ALERTA */}
				<Box mt={{ base: 8, lg: 10 }} mb={2} display="flex" alignItems="center">
					{visible && (
						<Alert status="success">
							<AlertIcon />
							<Box flex="1">
								<AlertTitle>NFT Minted!</AlertTitle>
								<AlertDescription>Your application has been received. We will review your application and respond within the next 48 hours.</AlertDescription>
								<Button colorScheme='purple' onClick={()=> router.replace('/home')}>Go home</Button>
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
