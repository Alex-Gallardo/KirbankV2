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
import { useEffect, useState } from "react";

import BitcoinIcon from "../icons/bitcoin";
import EthereumIcon from "@/icons/ethereum";
import Image from "next/image";
import { Inter } from "@next/font/google";
import KirbankToken from "@/utils/abi/KirbankToken.json";
import Nav from "@/layouts/nav/nav";
import { abiKirbankTokenAddress } from "config";
import { ethers } from "ethers";

interface KirbankToken {
	imageUrl: string;
	cost: string;
	yearsSet: string;
	dateCreate: string;
}

const steps = [
	{ title: "Método de pago", description: "Elige como pagaras" },
	{ title: "Calcula tu inversión", description: "Calculadora" },
	{ title: "Verifica información", description: "Revisa que todo este en orden" }
];

export default function MintIndex() {
	// ESTADOS
	const [newToken, setNewToken] = useState<KirbankToken>({
		imageUrl: "https://media4.giphy.com/media/pn1e1I4nAVtSMo1h7y/giphy.gif?cid=ecf05e47ryp98dwo8ttimovuonlp970vmz9xwzpjbnywvolf&rid=giphy.gif&ct=g",
		cost: "",
		yearsSet: "",
		dateCreate: Date.now() + ""
	});
	const [calc, setCalc] = useState<{ ammount: number; year: number; percent: number; profit: number; final: number }>({
		ammount: 0,
		year: 1,
		percent: 0,
		profit: 0,
		final: 0
	});
	const [price, setPrice] = useState<{ ethereum: number; bitcoin: number }>({ ethereum: 0, bitcoin: 0 });
	const [priceAct, setPriceAct] = useState(0);
	const [coin, setCoin] = useState("ETH");
	const [visible, setVisible] = useState(false);
	const [tokens, setTokens] = useState([]);
	const [minting, setMinting] = useState(false);
	const toast = useToast();
	// - - - -  ESTADOS FUERA DE LA CALCULADORA - - - - - - - - - - -
	const [stepIndex, setStepIndex] = useState<number>(0);
	const [methodBuy, setMethodBuy] = useState<boolean>(false);
	const [textButton, setTextButton] = useState<string>("NEXT");

	// Proceso de minteo
	const setMintingProcces = () => {
		setMinting(false);
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 6000);
	};

	// Mintear un token
	const addToken = async () => {
		const { ethereum }: any = window;

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, signer);
			const transaction = await contract.addKirbankToken(newToken.imageUrl, newToken.cost, newToken.yearsSet, newToken.dateCreate);
			setMinting(true);
			console.log("Transaction initalized");
			await transaction.wait();
			toast({
				title: "Minteo exitoso!",
				description: "Acabas de crear un NFT con nosotros",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top-right"
			});
			console.log("Transaction fiinitalized");
			setMintingProcces();
		}
	};

	// Siguiente step
	const nextStep = async () => {
		const upStep = stepIndex + 1;
		setStepIndex(upStep);

		switch (upStep) {
			case 2:
				setTextButton("MINT");
				break;
			case 3:
				toast({
					title: "Minteo exitoso!",
					description: "Acabas de crear un NFT con nosotros",
					status: "success",
					duration: 3000,
					isClosable: true,
					position: "top-right"
				});
				setMintingProcces();
				break;
			default:
				setTextButton("NEXT");
				break;
		}
	};

	// Computa los calculos
	const computeTableValues = () => {
		const { ammount, year } = calc;

		let a: number = 0;
		let b: number = 0;

		// Cantidad
		if (ammount > 0 && ammount <= 1000) {
			a = 0.001;
		} else if (ammount > 1000 && ammount <= 10000) {
			a = 0.002;
		} else if (ammount > 10000 && ammount <= 50000) {
			a = 0.004;
		} else if (ammount > 50000 && ammount <= 100000) {
			a = 0.006;
		} else if (ammount > 100000 && ammount <= 500000) {
			a = 0.008;
		} else if (ammount > 500000 && ammount <= 1000000) {
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
		let profit: number = ammount * percent;
		let final: number = ammount * percent + ammount;
		setCalc({ ...calc, percent, final, profit });
	};

	// Cambios input
	const handleChange = (event: any, op: string) => {
		let valor: any = 0;
		if (op != "year") valor = event.target.value;
		if (valor == "") valor = 0;

		switch (op) {
			case "ammount":
				setCalc({ ...calc, ammount: parseInt(valor, 10) });
				setNewToken({ ...newToken, cost: valor + "" });
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

	// Cambios select
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

	// CAMBIOS EN EL SELECT DE METODO DE PAGO
	const handleChangeSelectMethod = (event: any) => {
		const val = event.target.value;

		switch (val) {
			case "CRIPTO":
				setMethodBuy(true);
				break;
			case "TSS":
				setMethodBuy(false);
				break;
			default:
				setMethodBuy(false);
				break;
		}
	};

	// Precios ETH, BTC, MATIC
	async function getEthPrice() {
		const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd");
		const data = await response.json();
		// const ethPrice = data.ethereum.usd;
		console.log("data-obtenida:", data);
		return data;
	}

	// Obtener tokens
	const getAllTokens = async () => {
		const provider = new ethers.providers.JsonRpcBatchProvider("https://eth-goerli.g.alchemy.com/v2/3LjxKHUHH-Vylm2-tRJTs2OR1hgyIp4k");
		const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, provider);
		const getTokens = await contract.getAllKirbankTokens();
		setTokens(getTokens);
	};

	useEffect(() => {
		getEthPrice().then((res: any) => {
			setPrice({ ...res });
			setPriceAct(res.ethereum.usd);
		});
	}, []);

	useEffect(() => {
		computeTableValues();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calc.year, calc.ammount]);

	useEffect(() => {
		// getAllTokens();

		let a = localStorage.getItem("ammount");
		let y = localStorage.getItem("year");
		let c = localStorage.getItem("coin");
		if (a && y) setCalc({ ...calc, ammount: parseInt(a, 10), year: parseInt(y, 10) });
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
									<Text>Elige tu metodo de pago:</Text>
								</Flex>
								<Select defaultValue={methodBuy?"CRIPTO":"TSS"} pr={{ base: "0", md: "2" }} color="gray.500" onChange={(e) => handleChangeSelectMethod(e)} flex={{ base: "1", md: "3" }}>
									<option value="TSS">Transferencia</option>
									<option value="CRIPTO">Criptomoneda</option>
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
									<Input value={calc.ammount} placeholder="Enter amount" type="number" onChange={(e) => handleChange(e, "ammount")} />
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
										{calc.percent} %
									</Text>
								</Flex>
							</Stack>
							{/* RESUMEN */}
							<VStack spacing={2} p="2" w="full">
								<Flex minWidth="full" alignItems="center" gap="2" justify="space-between" mb="5">
									<Text color="blue.900" as="b">
										KTB #{tokens.length + 1}
									</Text>
									{methodBuy ? (
										<Tag color="white" bg={coin == "ETH" ? "blue.500" : "yellow.400"}>
											<TagLabel>
												{(calc.ammount / priceAct).toFixed(2)} {coin}
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
										<Text as="b">final: </Text> $ {(calc.profit * calc.year + calc.ammount).toFixed(2)}
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
							<VStack px="3" py="4">
								<Flex flex={{ base: "1", md: "2" }} align="center" justify="center" w="full">
									<Text>Sube tu comprobante</Text>
								</Flex>
								<InputGroup>
									<Input type="file" />
								</InputGroup>
							</VStack>

							{/* RESUMEN */}
							<VStack px="3" py="4">
								<Flex minWidth="full" alignItems="center" gap="2" justify="space-between">
									<Text color="blue.900" as="b">
										Documentos subidos
									</Text>
									<Tag>
										<TagLabel>0 Mb</TagLabel>
									</Tag>
								</Flex>
							</VStack>
						</VStack>
					)}
				</Flex>
				<Flex mt={8}>
					<Button bg="blue.400" variant="solid" color="white" mr="5" onClick={() => setStepIndex(stepIndex - 1 <= 0 ? 0 : stepIndex - 1)} colorScheme="twitter">
						BACK
					</Button>
					<Button
						isLoading={minting}
						loadingText="Añadiendo a la blockchain..."
						bg="blue.400"
						variant="solid"
						color="white"
						spinnerPlacement="end"
						w="full"
						onClick={() => nextStep()}
						colorScheme="twitter"
					>
						{textButton}
					</Button>
				</Flex>
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
