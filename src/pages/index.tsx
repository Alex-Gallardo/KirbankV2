import {
	Badge,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Center,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Image,
	Spacer,
	Stack,
	StackDivider,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
	Tag,
	TagLabel,
	Text,
	VStack,
	Wrap,
	WrapItem
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// import Image from "next/image";
import { Inter } from "@next/font/google";
import KirbankToken from '@/utils/abi/KirbankToken.json'
import Nav from "@/layouts/nav/nav";
import { abiKirbankTokenAddress } from "config";
import { ethers } from "ethers";

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
		let arrDates: number[][] = []

		// Variable tipo fecha - Hoy
		let t = Date.now()
		let today = new Date(t)

		// Recorremos los tokens
		arrTokens.map((token: any, i: number)=>{
			let { percent, profit, final} = computeTableValues(parseInt(token[2], 10), parseInt(token[3], 10))

			total[1] += percent
			total[2] += final
			total[3] += (profit * parseInt(token[3], 10)) + parseInt(token[2], 10)
		
			// Asignamos las fechas de creacion de cada token
			let dateToken = new Date(parseInt(token[4],10))
			let diff = today.getTime() - dateToken.getTime()
			 
			arrDates.push([ Math.trunc(diff/(1000*60*60*24)) ,  parseInt(token[3]), profit/365, ((profit/365) * Math.trunc(diff/(1000*60*60*24))) ])
			// arrDates.push([dateToken.getDate(), dateToken.getMonth() + 1, dateToken.getFullYear(), dateToken.getHours() , parseInt(token[3])])
		})

		let day: number = 0
		arrDates.forEach((arr: number[], i: number)=>{
			day += arr[3]
		})


		setData({...data, percent: total[1], total: total[2], finalTotal: total[3], day})
		console.log("data Dates:", arrDates)
	}

	// Computa los calculos
	const computeTableValues = (ammount: number, year: number) => {
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
		if(year > 0 && year <= 1){
			b = 0.01
		}else if(year > 1 && year <= 2){
			b = 0.02
		}else if(year > 2 && year <= 3){
			b = 0.04
		}else if(year > 3 && year <= 4){
			b = 0.06
		}else if(year > 4 && year <= 5){
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
		return { percent, profit, final}
	}

	// Obtener tokens
	const getMyTokens = async ()=>{
		const {ethereum}: any = window

		if(ethereum){
			let provider = new ethers.providers.Web3Provider(ethereum)
			let signer = provider.getSigner()
			// console.log("-- signer --", await signer.getAddress())
			let contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, signer)
			let resTokens = await contract.getKirbankTokensByOwner()

			setTokens([...resTokens])
			orderData(resTokens)
		}
	}

	useEffect(()=>{
		getMyTokens()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="max" my={{base: 8, md:12}}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }} align="center" justify="space-between" w="full" >
					<Box>
						<Heading>Kirbank Token ({tokens.length}/500)</Heading>
						<Text>24 day, 7 hrs, 9 min to next rebase</Text>
					</Box>
					<Flex flexDirection="row" align="center" justify="space-between" rounded="md" bg="cyan.600" px={6} py={2} minW={{ base: "100%", md: "50%" }} mt={{ base: 8, lg: 0 }}>
						{/* <Heading color="#fff">$ 100.00</Heading> */}
						<Stat color="white"  >
							{/* <StatLabel>Feb 12 - Feb 28</StatLabel> */}
							<StatNumber>$ {data.day.toFixed(2)}</StatNumber>
							<StatHelpText  >
								<StatArrow type="increase" />
								{data.percent.toFixed(2)} %
							</StatHelpText>
						</Stat>
						<Text color="#fff">Your earnings / day</Text>
					</Flex>
				</Flex>

				{/* Contenido y tablas */}
				<Stack direction="column" mt={{base: 8, lg: 12}}>
					{/* Data analytics */}
					<Stack direction={{base: 'column', lg:'row'}} divider={<StackDivider borderColor="gray.200" />} spacing={0} align="stretch" w="full" rounded="md" overflow="hidden" h="full">
						<Box p={3} bg="blue.900" color="white" w='full'>
							<Text>Value percentage total</Text>
							<Heading>{data.percent.toFixed(2)} %</Heading>
						</Box>
						<Box p={3} bg="blue.900" color="white" w='full'>
							<Text>Profit value per year</Text>
							<Heading>$ {data.total.toFixed(2)}</Heading>
						</Box>
						<Box p={3} bg="blue.900" color="white" w='full'>
							<Text>Final win value</Text>
							<Heading>$ {data.finalTotal.toFixed(2)}</Heading>
						</Box>
					</Stack>
					<Box py={5} w='full'>
						<Tag size='lg' variant='subtle' colorScheme='cyan' py='3' w='full'>
							<TagLabel as='b'>Mis NFTS</TagLabel>
						</Tag>
					</Box>

					{/* LISTADO #2 */}
					<Wrap spacing='30px'>
						{[...tokens].reverse().map((token: any, i:number)=>(
							<WrapItem key={i}>
								<Card maxW={{base:'sm', md:'xs', lg:'sm'}} boxShadow='lg' variant='outline'>
									<CardBody>
										<Image
										src={token.imageUrl}
										alt='Kirbank NFT Token'
										borderRadius='lg'
										/>
										<Stack mt='6' spacing='2'>
											<Heading size='md'>Kirbank Token #KBT</Heading>
											<Text>
												
											</Text>
											<Text flex='1' noOfLines={1}>investment: <Badge colorScheme='green'>$ {token.cost}</Badge></Text>
											<Text flex='1' noOfLines={1}>years: <Text as='b'  >{token.yearsSet}</Text></Text>
										</Stack>
									</CardBody>
									<Divider />
									<CardFooter>
										<ButtonGroup spacing='2'>
											<Button variant='solid' colorScheme='blue'>
												Shared
											</Button>
											<Button variant='ghost' colorScheme='blue'>
												See more
											</Button>
										</ButtonGroup>
									</CardFooter>
								</Card>
							</WrapItem>
						))}
					</Wrap>
				</Stack>
			</Box>
		</Nav>
	);
}
