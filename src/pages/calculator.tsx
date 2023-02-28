import {
	Box,
	Spacer,
	Container,
	Flex,
	Heading,
	StackDivider,
	Text,
	VStack,
	InputGroup,
	InputLeftElement,
	Input,
	HStack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper
} from "@chakra-ui/react";

import Nav from "@/layouts/nav/nav";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";


export default function CalculatorIndex() {
	// ESTADOS
	const [visible, setVisible] = useState(false);
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

	useEffect(()=>{
		computeTableValues()
	},[calc.year, calc.ammount])

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Box minWidth="full" maxWidth="container.xl" h="full" mt={12}>
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
						<Box p="2">
							<InputGroup>
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
								<Input placeholder="Enter amount" type='number' onChange={(e)=>handleChange(e, 'ammount')}/>
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
						</Box>
						{/* ENTRADA DOBLE */}
						<HStack divider={<StackDivider borderColor="gray.400" />} spacing={0} align="stretch" w="full" overflow="hidden">
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
									{calc.percent.toFixed(2)} %
								</Text>
							</Flex>
						</HStack>
						{/* RESUMEN */}
						<VStack spacing={2} p="2" w="full">
							<Flex minWidth="full" alignItems="center" gap="2" justify="space-between">
								<Text color="gray.500">ammount</Text>
								<Spacer />
								<Text color="blue.900" >
									$ {calc.ammount}.00
								</Text>
							</Flex>
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
									{calc.percent.toFixed(2)} %
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
