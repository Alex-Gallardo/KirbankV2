import { useEffect, useState } from "react";
// import Image from "next/image";
import { Inter } from "@next/font/google";
import {
	Box,
	Flex,
	Heading,
	StackDivider,
	Text,
	VStack, Image, Highlight
} from "@chakra-ui/react";
import Nav from "@/layouts/nav/nav";
import { ethers } from "ethers";
import { abiKirbankTokenAddress } from "config";
import KirbankToken from '@/utils/abi/KirbankToken.json'


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

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="full" mt={12} px={10}>
				
                
                {/* Texto y data */}
				<Flex flexDirection={{ base: "column"}} align="center" justify="start" w="full" mb={12}>
					<Box mb={10} w='full' >
						<Heading>Kirbank Tokens ({tokens.length}/500)</Heading>
						<Text>All KirbankTokens</Text>

						<Text mt={5} fontSize="2xl">Total: $ <Text as='b'>{total}</Text></Text>
					</Box>



                    {/* TOKENS */}
                    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={2} align="stretch" w={{ sm: "full" }} rounded="md" overflow="hidden" h="full">
					    {tokens.map((token: any, i:number)=>(
							<Flex direction='row' align='center' justify='space-between'  key={`token_${i}`} px={6} bg='gray.100' p={5} >
								<Image src={token.imageUrl} style={{ borderRadius: '6px'}} width={50} height={50} alt="KirbankToken"/>
								<Text color='gray.400' >#{i+1} KBT </Text>
								<Text>cost: <Text as='b'>{token.cost}</Text></Text>
								<Text>years: <Text as='b'>{token.yearsSet}</Text></Text>
								<Text>owner: <Text as='b'>{token.owner}</Text></Text>
							</Flex>
						))}
					</VStack>
				</Flex>
			</Box>
		</Nav>
	);
}
