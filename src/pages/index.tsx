import { useEffect, useState } from "react";
// import Image from "next/image";
import { Inter } from "@next/font/google";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Center,
	CloseButton,
	Flex,
	Heading,
	Spacer,
	Stack,
	StackDivider,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
	VStack, Image
} from "@chakra-ui/react";
import Nav from "@/layouts/nav/nav";
import { ethers } from "ethers";
import { abiKirbankTokenAddress } from "config";
import KirbankToken from '@/utils/abi/KirbankToken.json'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// ESTADOS
	const [tokens, setTokens] = useState<any>([])
	const [data, setData] = useState<{day: number, percent: number, total: number, finalTotal: number}>({
		day: 0,
		percent: 0,
		total: 0,
		finalTotal: 0,
	})

	// Ordenar los datos
	const orderData = (arrTokens: any)=>{

		let total: number[] = [0,0,0,0]

		arrTokens.map((token: any, i: number)=>{
			let { percent, final} = computeTableValues(parseInt(token[2], 10), parseInt(token[3], 10))
			total[1] += percent
			total[2] += final
			total[3] += final * parseInt(token[3], 10)
		
			console.log("total",total,":",  `(${token[2]}/${token[3]})`,"=", final, percent)
		})

		setData({...data, percent: total[1], total: total[2], finalTotal: total[3]})

	}

	// Obtener tokens
	const getMyTokens = async ()=>{
		const {ethereum}: any = window

		if(ethereum){
			let provider = new ethers.providers.Web3Provider(ethereum)
			let signer = provider.getSigner()
			let contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, signer)
			let resTokens = await contract.getKirbankTokensByOwner()

			setTokens([...resTokens])
			orderData(resTokens)
		}
	}

	// Computa los calculos
	const computeTableValues = (ammount: number, year: number) => {
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
		return { percent, final}
	}

	useEffect(()=>{
		getMyTokens()
	}, [])

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="full" maxH='' overflow='scroll' mt={12}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }} align="center" justify="space-between" w="full" mb={12}>
					<Box>
						<Heading>Kirbank Token ({tokens.length}/500)</Heading>
						<Text>24 day, 7 hrs, 9 min to next rebase</Text>
					</Box>
					<Flex flexDirection="row" align="center" justify="space-between" rounded="md" bg="teal.300" px={6} py={3} minW={{ base: "100%", md: "50%" }} mt={{ base: 8, lg: 0 }}>
						{/* <Heading color="#fff">$ 100.00</Heading> */}
						<Stat color="#fff">
							{/* <StatLabel>Feb 12 - Feb 28</StatLabel> */}
							<StatNumber>$ {data.day.toFixed(2)}</StatNumber>
							<StatHelpText>
								<StatArrow type="increase" />
								{data.percent.toFixed(2)} %
							</StatHelpText>
						</Stat>
						<Spacer />
						<Text color="#fff">Your earnings / Day</Text>
					</Flex>
				</Flex>

				{/* Contenido y tablas */}
				<Stack direction={{ base: "column", lg: "row" }} my={12}>
					<VStack
						divider={<StackDivider borderColor="gray.400" />}
						spacing={0}
						align="stretch"
						w={{ base: "full", lg: "50%" }}
						mt={{ base: 3, lg: 0 }}
						border="2px"
						borderColor="gray.500"
						rounded="lg"
						// overflow="hidden"
						overflowY='scroll'
						maxHeight='400px'
						bg="white"
					>
						<Center minH="50px" borderBottom="2px" borderColor="gray.500">
							MY NFT's 
						</Center>
						{[...tokens].reverse().map((token: any, i:number)=>(
							<Flex direction='row' align='center' justify='space-between'  key={`token_${i}`} px={6} py={2} borderBottom='1px' borderColor='gray.200' >
								<Image src={token.imageUrl} style={{ borderRadius: '6px'}} width={30} height={30} alt="KirbankToken"/>
								<Text color='gray.400' >#KBT</Text>
								<Text>cost: <Text as='b'>{token.cost}</Text></Text>
								<Text>years: <Text as='b'>{token.yearsSet}</Text></Text>
							</Flex>
						))}
						
					</VStack>
					<VStack divider={<StackDivider borderColor="gray.200" />} spacing={0} align="stretch" w={{ sm: "full", md: "full", lg: "50%" }} rounded="md" overflow="hidden" h="full">
						<Box p={3} bg="blue.900" color="white">
							<Text>Value</Text>
							<Heading>{data.percent.toFixed(2)} %</Heading>
						</Box>
						<Box p={3} bg="blue.900" color="white">
							<Text>Value</Text>
							<Heading>$ {data.total.toFixed(2)}</Heading>
						</Box>
						<Box p={3} bg="blue.900" color="white">
							<Text>Value</Text>
							<Heading>$ {data.finalTotal.toFixed(2)}</Heading>
						</Box>
					</VStack>
				</Stack>
			</Box>
		</Nav>
	);
}
