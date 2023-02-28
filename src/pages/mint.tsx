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
	VStack, useToast,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper
} from "@chakra-ui/react";

import Image from "next/image";
import { Inter } from "@next/font/google";
import Nav from "@/layouts/nav/nav";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abiKirbankTokenAddress } from "config";
import KirbankToken from '@/utils/abi/KirbankToken.json'

interface KirbankToken {
	imageUrl: string
	cost: string
	yearsSet: string
    dateCreate: string
}

export default function MintIndex() {
	// ESTADOS
	const [newToken, setNewToken] = useState<KirbankToken>({
		imageUrl: 'https://media4.giphy.com/media/pn1e1I4nAVtSMo1h7y/giphy.gif?cid=ecf05e47ryp98dwo8ttimovuonlp970vmz9xwzpjbnywvolf&rid=giphy.gif&ct=g',
		cost: '',
		yearsSet: '',
		dateCreate: Date.now() + '',
	})
	const [ calc, setCalc] = useState<{ ammount: number, year: number, percent: number,  profit: number,final: number}>({
		ammount: 0,
		year: 1,
		percent: 0,
		profit: 0,
		final: 0
	})
	const [visible, setVisible] = useState(false);
	const [tokens, setTokens] = useState([])
	const [minting, setMinting] = useState(false);
	const toast = useToast();

	// Proceso de minteo
	const setMintingProcces = () => {
			setMinting(false);
			setVisible(true);
			setTimeout(() => {
				setVisible(false);
			}, 6000);
	};

	// Mintear un token
	const addToken = async ()=>{
		const {ethereum}: any = window

		if(ethereum){
			const provider = new ethers.providers.Web3Provider(ethereum)
			const signer = provider.getSigner();

			const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, signer)
			const transaction = await contract.addKirbankToken(newToken.imageUrl, newToken.cost, newToken.yearsSet, newToken.dateCreate)
			setMinting(true);
			console.log("Transaction initalized")
			await transaction.wait()
			toast({
				title: "Minteo exitoso!",
				description: "Acabas de crear un NFT con nosotros",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top-right"
			});
			console.log("Transaction fiinitalized")
			setMintingProcces()
		}
	}

	// Computa los calculos
	const computeTableValues = () => {
		const { ammount, year} = calc

		let a:number = 0
		let b: number = 0

		// Cantidad
		if(ammount > 0 && ammount <= 1000){
			a = 0.01
		}else if(ammount > 1000 && ammount <= 10000){
			a = 0.02
		}else if(ammount > 10000 && ammount <= 50000){
			a = 0.04
		}else if(ammount > 50000 && ammount <= 100000){
			a = 0.06
		}else if(ammount > 100000 && ammount <= 500000){
			a = 0.08
		}else if(ammount > 500000 && ammount <= 1000000){
			a = 0.1
		}else {
			a = 0
		}

		// Años
		if( year <= 1){
			b = 0.01
		}else if( year <= 2){
			b = 0.02
		}else if( year <= 3){
			b = 0.04
		}else if( year <= 4){
			b = 0.06
		}else if( year <= 5){
			b = 0.08
		}else if(year > 5 && year <= 10){
			b = 0.1
		}else if(year > 10 && year <= 15){
			b = 0.12
		}else if(year > 15 && year <= 20){
			b = 0.14
		}else {
			b = 0
		}

		let percent: number = a + b;
		let profit: number = (ammount * percent)
		let final: number = (ammount * percent)+ ammount;
		setCalc({...calc, percent, final, profit })
	}

	// Cambios input
	const handleChange = (event: any, op: string) => {
		let valor: any = 0 
		if(op != 'year') valor = event.target.value 
		if(valor == "") valor = 0

		switch(op){
			case "ammount":
				setCalc({...calc, ammount: parseInt(valor, 10)})
				setNewToken({...newToken, cost: valor + ''})
				break;
			case "year":
				setCalc({...calc, year: parseInt(event)})
				setNewToken({...newToken, yearsSet: event})
				break;
			case "link":
				setNewToken({...newToken, imageUrl: valor + ''})
				break;
			default:
				setCalc({...calc})
				break
		}
	}

	useEffect(()=>{
		computeTableValues()
	},[calc.year, calc.ammount])

	// Obtener tokens
	const getAllTokens = async ()=>{
		const provider = new ethers.providers.JsonRpcBatchProvider("https://eth-goerli.g.alchemy.com/v2/3LjxKHUHH-Vylm2-tRJTs2OR1hgyIp4k");
		const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, provider)
		const getTokens = await contract.getAllKirbankTokens()
		setTokens(getTokens)
	}

	useEffect(()=>{
		getAllTokens()

		let a = localStorage.getItem("ammount")
		let y = localStorage.getItem("year")
		if(a && y) setCalc({...calc, ammount: parseInt(a, 10), year: parseInt(y, 10)})
	}, [])

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Box minWidth="full" maxWidth="container.xl" h="max" mt={12}>
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
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="i" />
								<Input placeholder="Link image http://..." onChange={(e)=>handleChange(e, 'link')} />
							</InputGroup>
						</Box>
						<Box p="2">
							<InputGroup>
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
								<Input placeholder="Enter ammount" type='number' value={calc.ammount} onChange={(e)=>handleChange(e, 'ammount')} />
							</InputGroup>
						</Box>
						{/* ENTRADA DOBLE */}
						<HStack divider={<StackDivider borderColor="gray.400" />} spacing={0} align="stretch" w="full" overflow="hidden">
							<Flex p="2" flex="1" direction='row' align='center'>
								<Text mr={5} as='b' color="blue.900">Years:</Text>
								<NumberInput value={calc.year} max={20} min={1} onChange={(e)=>handleChange(e, 'year')}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</Flex>
							<Flex p="2" flex="1" align='center' justify='end'>
								<Text color="blue.900" as="b">
									{calc.percent.toFixed(2)} %
								</Text>
							</Flex>
						</HStack>
						{/* RESUMEN */}
						<VStack spacing={2} p="2" w="full">
							<Flex minWidth="full" alignItems="center" gap="2" justify="start" mb={5}>
								<Text color="gray.500">NFT</Text>
								{/* <Spacer /> */}
								<Text color="blue.900" as="b">
									KTB #{tokens.length + 1}
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2" mt={3}>
								<Text color="blue.900"><Text as="b" >year: </Text > $ {calc.profit.toFixed(2)}</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									{calc.year} years
								</Text>
								<Spacer />
								<Text color="blue.900" ><Text as="b" >final: </Text > $ {((calc.profit * calc.year) + calc.ammount).toFixed(2)}</Text>
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
						onClick={() => addToken()}
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
