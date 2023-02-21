import { useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Container, Flex, Heading, Text } from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import Nav from "@/layouts/nav/nav";

const inter = Inter({ subsets: ["latin"] });

export default function CalculatorIndex() {
	// ESTADOS
	const [visible, setVisible] = useState(false);

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Container minW="full">
				<Flex flexDirection="row" align="center" justify="space-between">
					<Box background="red.100">
						<Heading>Calculator</Heading>
						<Text>Colocacion de texto...</Text>
					</Box>
				</Flex>
				{visible ? (
					<Alert status="success">
						<AlertIcon />
						<Box>
							<AlertTitle>Success!</AlertTitle>
							<AlertDescription>Your application has been received. We will review your application and respond within the next 48 hours.</AlertDescription>
						</Box>
						<CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={() => setVisible(false)} />
					</Alert>
				) : (
					<Button onClick={() => setVisible(true)}>Show Alert</Button>
				)}
			</Container>
			{/* </main> */}
		</Nav>
	);
}
