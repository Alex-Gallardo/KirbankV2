import { useState } from "react";
import Image from "next/image";
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
	VStack
} from "@chakra-ui/react";
import Nav from "@/layouts/nav/nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// ESTADOS

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="full" mt={12}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }} align="center" justify="space-between" w="full" mb={12}>
					<Box>
						<Heading>Kirbank Token (0/500)</Heading>
						<Text>24 day, 7 hrs, 9 min to next rebase</Text>
					</Box>
					<Flex flexDirection="row" align="center" justify="space-between" rounded="md" bg="teal.300" px={6} minW={{ base: "100%", md: "50%" }} mt={{ base: 8, lg: 0 }}>
						{/* <Heading color="#fff">$ 100.00</Heading> */}
						<Stat color="#fff">
							{/* <StatLabel>Feb 12 - Feb 28</StatLabel> */}
							<StatNumber>$120.00</StatNumber>
							<StatHelpText>
								<StatArrow type="increase" />
								23.36%
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
						overflow="hidden"
						bg="white"
					>
						<Center h="50px" borderBottom="2px" borderColor="gray.500">
							STACK
						</Center>
						<Box h="40px" bg="gray.200">
							2
						</Box>
						<Box h="40px" bg="gray.100">
							3
						</Box>
					</VStack>
					<VStack divider={<StackDivider borderColor="gray.200" />} spacing={0} align="stretch" w={{ sm: "full", md: "full", lg: "50%" }} rounded="md" overflow="hidden" h="full">
						<Box p={3} bg="blue.900" color="white">
							<Text>Value</Text>
							<Heading>0%</Heading>
						</Box>
						<Box p={3} bg="blue.900" color="white">
							<Text>Value</Text>
							<Heading>$ 0.00</Heading>
						</Box>
						<Box p={3} bg="blue.900" color="white">
							<Text>Value</Text>
							<Heading>$ 0.00</Heading>
						</Box>
					</VStack>
				</Stack>
			</Box>
		</Nav>
	);
}
