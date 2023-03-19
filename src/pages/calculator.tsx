import {
	Box,
	Container,
	Divider,
	Flex,
	HStack,
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
	StackDivider,
	Text,
	VStack,
	Tag,
	TagLeftIcon,
	TagLabel,
	Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Nav from "@/layouts/nav/nav";
import BitcoinIcon from '../icons/bitcoin';
import EthereumIcon from "@/icons/ethereum";

export default function CalculatorIndex() {
	// ESTADOS
	const [priceAct, setPriceAct] = useState(0);
	const [coin, setCoin] = useState('ETH');
	const [price, setPrice] = useState<{ethereum: number, bitcoin: number}>({ ethereum: 0, bitcoin: 0});
	const [ calc, setCalc] = useState<{ ammount: number, year: number, percent: number, profit: number, final: number }>({
		ammount: 0,
		year: 1,
		percent: 0,
		profit: 0, 
		final: 0,
	})

	// Computa los calculos
	const computeTableValues = () => {
		const { ammount, year} = calc

		let a:number = 0.00
		let b: number = 0.00

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
		if( year <= 1){
			b = 0.001
		}else if( year <= 2){
			b = 0.002
		}else if( year <= 3){
			b = 0.004
		}else if( year <= 4){
			b = 0.006
		}else if( year <= 5){
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

		const percent: number = parseFloat(a + '') + parseFloat(b + '');
		const profit: number = (ammount * percent)
		const final: number = profit+ ammount;
		setCalc({...calc, percent, final, profit })
		console.log("operacion", percent, final, profit)
	}

	// Cambios input
	const handleChange = (event: any, op: string) => {
		let valor: any = 0
		if(op != 'year') valor = event.target.value 
		if(valor == "") valor = 0

		switch(op){
			case "ammount":
				setCalc({...calc, ammount: parseInt(valor, 10)})
				localStorage.setItem("ammount", valor);
				break;
			case "year":
				setCalc({...calc, year: parseInt(event)})
				localStorage.setItem("year", event);
				break;
			default:
				setCalc({...calc})
				break
		}
	}

	// Cambios select
	const handleChangeSelect = (event: any)=>{
		const val = event.target.value 

		switch(val){
			case 'ethereum':
				//@ts-ignore
				setPriceAct(price.ethereum.usd)
				setCoin('ETH')
				localStorage.setItem("coin", "ETH");
				break;
			case 'bitcoin':
				//@ts-ignore
				setPriceAct(price.bitcoin.usd)
				setCoin('BTC')
				localStorage.setItem("coin", "BTC");
				break;
			default:
				//@ts-ignore
				setPriceAct(price.ethereum.usd)
				setCoin('ETH')
				localStorage.setItem("coin", "ETH");
		}
	}

	useEffect(()=>{
		computeTableValues()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[calc.ammount,calc.year])

	// Precios ETH, BTC, MATIC
	async function getEthPrice() {
		const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd');
		const data = await response.json();
		// const ethPrice = data.ethereum.usd;
		console.log("data-obtenida:", data)
		return  data;
	}

	useEffect(()=>{
		getEthPrice().then((res:any)=>{
			setPrice({...res})
			setPriceAct(res.ethereum.usd)
		})
	},[])
	  

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Box minWidth="full" maxWidth="container.xl" h="max-content" mt={12} >
				<Flex flexDirection="column" align="cstart" justify="start">
					<Box>
						<Heading>Kirbank Calculator</Heading>
						<Text>This calculator is easy to use and will give you accurate results in seconds. Simply enter the amount of money you want to invest and the number of years</Text>
					</Box>
				</Flex>
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
						<VStack p="2">
							<InputGroup>
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >$</InputLeftElement>
								<Input placeholder="Enter amount" type='number' onChange={(e)=>handleChange(e, 'ammount')}/>
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
							<HStack divider={<StackDivider borderColor="gray.400" />} spacing={0} align="center" w="full" overflow="hidden">
								<Select defaultValue='eth' pr="2" color="gray.500" onChange={(e)=>handleChangeSelect(e)} flex="3" >
									<option value='ethereum'>Ethereum</option>
									<option value='bitcoin'>Bitcoin</option>
									{/* <option value='matic'>Polygon</option> */}
								</Select>
								<Flex p="2" flex="2" align='center' justify='center'>
									<Text color="white" as="b" bg={coin=='ETH'?'blue.600':'yellow.500'} py='1' px='2' borderRadius='4' >
										1 {coin} = {priceAct} USD
									</Text>
								</Flex>
							</HStack>
						</VStack>
						{/* ENTRADA DOBLE */}
						<Stack direction={{base:'column', md: 'row'}} divider={<StackDivider borderColor="gray.400" />} spacing={0} align="stretch" w="full" overflow="hidden">
							<Flex p="2" flex="1" direction='row' align='center'>
								<Text mr={5} as='b' color="blue.900">Years:</Text>
								<NumberInput defaultValue={1} max={20} min={1} onChange={(e)=>handleChange(e, 'year')}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</Flex>
							<Flex p="2" flex="1" align='center' justify='end'>
								<Text color="blue.900" as="b">
									{calc.percent} %
								</Text>
							</Flex>
						</Stack>
						{/* RESUMEN */}
						<VStack spacing={2} p="2" w="full">
							<Flex minWidth="full" alignItems="center" gap="2" justify="space-between">
								{/* <Text color="gray.500"> { coin } price</Text> */}
								<Tag color='white' bg={coin=='ETH'?'blue.500':'yellow.400'}>
									{coin == 'ETH'?
										<EthereumIcon fill='white' w='16px' h='16px' mr='1' />
									:
										<BitcoinIcon fill='white' w='16px' h='16px' mr='1' />
									}
									<TagLabel>{coin} price</TagLabel>
								</Tag>
								<Spacer />
								<Text color="blue.900" >
									<Text color="blue.900" as="b">{coin}</Text> {(calc.ammount / priceAct).toFixed(2)} 
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2" justify="space-between">
								<Text color="gray.500">ammount</Text>
								<Spacer />
								<Text color="blue.900" >
									$ {calc.ammount}.00
								</Text>
							</Flex>
							<Divider />
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">years</Text>
								<Spacer />
								<Text color="blue.900" >
									{calc.year}
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">percentage annual</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									{calc.percent.toFixed(3)} %
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">year ammount</Text>
								<Spacer />
								<Text color="blue.900" >
									$ {calc.profit.toFixed(2)}
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">final ammount</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									$ {((calc.profit * calc.year) + calc.ammount).toFixed(2)}
								</Text>
							</Flex>
						</VStack>
					</VStack>
				</Container>
			
			</Box>
			{/* </main> */}
		</Nav>
	);
}
