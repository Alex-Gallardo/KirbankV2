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
	VStack, useToast
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
		yearsSet: "",
		dateCreate: Date.now() + '',
	})
	const [ calc, setCalc] = useState<{ ammount: number, year: number, percent: number, final: number}>({
		ammount: 0,
		year: 0,
		percent: 0,
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
			a = 0.1
		}else if(ammount > 1000 && ammount <= 10000){
			a = 0.2
		}else if(ammount > 10000 && ammount <= 50000){
			a = 0.4
		}else if(ammount > 50000 && ammount <= 100000){
			a = 0.6
		}else if(ammount > 100000 && ammount <= 500000){
			a = 0.8
		}else if(ammount > 500000 && ammount <= 1000000){
			a = 1
		}else {
			a = 0
		}

		// Años
		if(year > 0 && year <= 1){
			b = 0.1
		}else if(year > 1 && year <= 2){
			b = 0.2
		}else if(year > 2 && year <= 3){
			b = 0.4
		}else if(year > 3 && year <= 4){
			b = 0.6
		}else if(year > 4 && year <= 5){
			b = 0.8
		}else if(year > 5 && year <= 10){
			b = 1
		}else if(year > 10 && year <= 15){
			b = 1.2
		}else if(year > 15 && year <= 20){
			b = 1.4
		}else {
			b = 0
		}

		let percent: number = a + b;
		let final: number = (ammount * percent)+ ammount;
		setCalc({...calc, percent, final })
	}

	// Cambios input
	const handleChange = (event: any, op: string) => {
		let valor: any = event.target.value 
		if(valor == "") valor = 0

		switch(op){
			case "ammount":
				setCalc({...calc, ammount: parseInt(valor, 10)})
				setNewToken({...newToken, cost: valor + ''})
				break;
			case "year":
				setCalc({...calc, year: parseInt(valor, 10)})
				setNewToken({...newToken, yearsSet: valor + ''})
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
		console.log("tokens", getTokens, abiKirbankTokenAddress, process)
	}

	useEffect(()=>{
		getAllTokens()
	}, [])

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
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="i" />
								<Input placeholder="Link image http://..." onChange={(e)=>handleChange(e, 'link')} />
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
						</Box>
						<Box p="2">
							<InputGroup>
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
								<Input placeholder="Enter ammount" type='number' onChange={(e)=>handleChange(e, 'ammount')} />
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
						</Box>
						{/* ENTRADA DOBLE */}
						<HStack divider={<StackDivider borderColor="gray.400" />} spacing={0} align="stretch" w="full" overflow="hidden">
							<Box p="2" flex="1">
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="Y" />
									<Input placeholder="Enter years" type='number' onChange={(e)=>handleChange(e, 'year')} />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
							</Box>
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
								<Text color="blue.900"><Text as="b" >year: </Text> $ {calc.final}</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									{calc.year} years
								</Text>
								<Spacer />
								<Text color="blue.900"><Text as="b" >final: </Text> $ {calc.final * calc.year}</Text>
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
