import {
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
	Stack,
	StackDivider,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// import Image from "next/image";
import { Inter } from "@next/font/google";
import KirbankToken from '@/utils/abi/KirbankToken.json'
import Nav from "@/layouts/nav/nav";
import { abiKirbankTokenAddress } from "config";
import { ethers } from "ethers";

export default function All() {
	// ESTADOS
	const [tokens, setTokens] = useState([])
	const [total, setTotal] = useState(0)

	// Obtener tokens
	const getAllTokens = async ()=>{
		const provider = new ethers.providers.JsonRpcBatchProvider("https://eth-goerli.g.alchemy.com/v2/3LjxKHUHH-Vylm2-tRJTs2OR1hgyIp4k");
		const contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, provider)
		const getTokens = await contract.getAllKirbankTokens()
		setTokens(getTokens)
		console.log("tokens", getTokens, abiKirbankTokenAddress, process)

		let costTotal: number = 0
		getTokens.forEach((token: any) => {
			let t: number = parseInt(token.cost, 10)
			costTotal += t
		});
		console.log("costTotal", costTotal)
		setTotal(costTotal) 
	}

	useEffect(()=>{
		getAllTokens()
	}, [])

	// Computa los calculos
	const computeTableValues = (ammount: number, year: number) => {
		let a:number = 0
		let b: number = 0

		// Cantidad
		if(ammount > 0 && ammount <= 1000){
			a = 0.001
		}else if(ammount > 1000 && ammount <= 10000){
			a = 0.002
		}else if(ammount > 10000 && ammount <= 50000){
			a = 0.004
		}else if(ammount > 50000 && ammount <= 100000){
			a = 0.006
		}else if(ammount > 100000 && ammount <= 500000){
			a = 0.008
		}else if(ammount > 500000 && ammount <= 1000000){
			a = 0.01
		}else {
			a = 0
		}

		// Años
		if(year > 0 && year <= 1){
			b = 0.001
		}else if(year > 1 && year <= 2){
			b = 0.002
		}else if(year > 2 && year <= 3){
			b = 0.004
		}else if(year > 3 && year <= 4){
			b = 0.006
		}else if(year > 4 && year <= 5){
			b = 0.008
		}else if(year > 5 && year <= 10){
			b = 0.01
		}else if(year > 10 && year <= 15){
			b = 0.012
		}else if(year > 15 && year <= 20){
			b = 0.014
		}else {
			b = 0
		}

		let percent: number = a + b;
		let profit: number = (ammount * percent)
		let final: number = (ammount * percent)+ ammount;
		return { percent, profit, final}
	}

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="max-content" mt={12} px={10}>

                {/* Texto y data */}
				<Flex flexDirection={{ base: "column"}} align="center" justify="start" w="full" mb={12}>
					<Box mb={10} w='full' >
						<Heading>Kirbank Tokens ({tokens.length}/500)</Heading>
						<Text>All KirbankTokens</Text>

						<Text mt={5} fontSize="2xl">Total: $ <Text as='b'>{total}</Text></Text>
					</Box>

					{/* LISTADO #2 */}
					<Wrap spacing='30px'>
						{[...tokens].reverse().map((token: any, i:number)=>{
							let dateToken = new Date(parseInt(token.dateCreate,10))
							return (<WrapItem key={i}>
								<Card maxW='xs' boxShadow='lg' variant='outline'>
									<CardBody>
										<Image
										src={token.imageUrl}
										alt='Kirbank NFT Token'
										borderRadius='lg'
										/>
										<Stack mt='6' spacing='2'>
											<Heading size='md'>Kirbank Token #KBT</Heading>
											<Text  noOfLines={1}>investment: <Badge colorScheme='green'>$ {token.cost}</Badge></Text>
											<Text  noOfLines={1}>time: <Badge colorScheme='blue'>{token.yearsSet} years</Badge></Text>
											<Text  noOfLines={1}>created: <Badge colorScheme='orange'>{`${dateToken.getHours()}:${dateToken.getMinutes()} - ${dateToken.getDate()}/${dateToken.getMonth() + 1}/${dateToken.getFullYear()}`}</Badge></Text>
											{/* <Text  noOfLines={1}>time: <Badge colorScheme='purple'>{token.yearsSet} years</Badge></Text> */}
											<Text>owner: <Text as='b'>{token.owner}</Text></Text>
										</Stack>
									</CardBody>
									<Divider />
									<CardFooter>
										<ButtonGroup spacing='2'>
											<Button variant='ghost' colorScheme='blue'>
												See more
											</Button>
										</ButtonGroup>
									</CardFooter>
								</Card>
							</WrapItem>
						)})}
					</Wrap>
				</Flex>
			</Box>
		</Nav>
	);
}
