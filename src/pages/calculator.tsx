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
	HStack
} from "@chakra-ui/react";

import Nav from "@/layouts/nav/nav";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";


export default function CalculatorIndex() {
	// ESTADOS
	const [visible, setVisible] = useState(false);
	const [ calc, setCalc] = useState<{ ammount: number, year: number, percent: number, final: number}>({
		ammount: 0,
		year: 0,
		percent: 0,
		final: 0
	})

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
				break;
			case "year":
				setCalc({...calc, year: parseInt(valor, 10)})
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
							<Box p="2" flex="1">
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="Y" />
									<Input placeholder="Enter years" type='number' onChange={(e)=>handleChange(e, 'year')}/>
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
									$ {calc.final}
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">final ammount</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									$ {calc.final * calc.year}
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
