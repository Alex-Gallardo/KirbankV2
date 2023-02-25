import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Spacer,
	CloseButton,
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

import Image from "next/image";
import { Inter } from "@next/font/google";
import Nav from "@/layouts/nav/nav";
import styles from "@/styles/Home.module.css";
import { useState } from "react";


export default function CalculatorIndex() {
	// ESTADOS
	const [visible, setVisible] = useState(false);

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
								<Input placeholder="Enter amount" />
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
						</Box>
						{/* ENTRADA DOBLE */}
						<HStack divider={<StackDivider borderColor="gray.400" />} spacing={0} align="stretch" w="full" overflow="hidden">
							<Box p="2" flex="1">
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="Y" />
									<Input placeholder="Enter years" />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
							</Box>
							<Box p="2" flex="1">
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="%" />
									<Input placeholder="Percentage" />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
							</Box>
						</HStack>
						{/* RESUMEN */}
						<VStack spacing={2} p="2" w="full">
							<Flex minWidth="full" alignItems="center" gap="2" justify="space-between">
								<Text color="gray.500">ammount</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									$ 1700.00
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">years</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									2
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">percentage</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									2.7 %
								</Text>
							</Flex>
							<Flex minWidth="full" alignItems="center" gap="2">
								<Text color="gray.500">final ammount</Text>
								<Spacer />
								<Text color="blue.900" as="b">
									$ 8000.00
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
