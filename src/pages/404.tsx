import { Box, Flex, Heading, VStack, Card, CardBody, Stack, Text, Divider, ButtonGroup, Button, CardFooter, Center } from "@chakra-ui/react";
import Link from "next/link";
import { CSSProperties } from "react";

export default function Error404() {
	// Background
	const styleBackground: CSSProperties = {
		backgroundImage: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='69.141' height='40' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(231, 48%, 48%, 1)'/><path d='M69.212 40H46.118L34.57 20 46.118 0h23.094l11.547 20zM57.665 60H34.57L23.023 40 34.57 20h23.095l11.547 20zm0-40H34.57L23.023 0 34.57-20h23.095L69.212 0zM34.57 60H11.476L-.07 40l11.547-20h23.095l11.547 20zm0-40H11.476L-.07 0l11.547-20h23.095L46.118 0zM23.023 40H-.07l-11.547-20L-.07 0h23.094L34.57 20z'  stroke-width='1' stroke='hsla(54, 100%, 62%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`
	};
	return (
		<VStack w="100vw" minH="100vh" bg={styleBackground.backgroundImage} align="end" justify="end">
			<Flex
				w="full"
				direction={{ base: "column", lg: "row" }}
				minH={{ base: "80vh", md: "60vh" }}
				bg="gray.100"
				align="center"
				justify={{ base: "center", lg: "space-around" }}
				pt={{ base: 1, lg: 12 }}
			>
				{/* HEADING */}
				<Flex direction="column">
					<Heading py={{ base: 5, md: 3 }} color="gray.500">
						404 Page not Found
					</Heading>
					<Text display={{ base: "none", lg: "flex" }} color="gray.500">
						Kirbank NFT
					</Text>
				</Flex>
				{/* CARD */}
				<Card maxW={{ base: "xs", lg: "sm" }}>
					<CardBody>
						<Center borderRadius="lg" w="full" h={{ base: "180px", lg: "230px" }} bg="gray.300">
							<Heading color="gray.500">NFT</Heading>
						</Center>
						<Stack mt={{ base: "3", lg: "6" }} spacing="3">
							<Heading size={{ base: "xs", lg: "md" }}>#33 Kirbank NFT</Heading>
							<Text fontSize={{ base: "xs", lg: "md" }}>This sofa is perfect for modern tropical spaces, baroque inspired spaces,...</Text>
							<Text color="blue.900" fontSize={{ base: "md", lg: "2xl" }}>
								$ 100,000.00
							</Text>
						</Stack>
					</CardBody>
					<Divider />
					<CardFooter>
						<ButtonGroup spacing="2">
							<Button variant="solid" colorScheme="blue">
								<Link href="/">Back now</Link>
							</Button>
							<Button variant="ghost" colorScheme="blue">
								<Link href="/">Go to home</Link>
							</Button>
						</ButtonGroup>
					</CardFooter>
				</Card>
			</Flex>
		</VStack>
	);
}
