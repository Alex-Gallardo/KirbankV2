import { HamburgerIcon, WarningIcon } from "@chakra-ui/icons";
import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	SimpleGrid,
	Spacer,
	Stack,
	Button,
	IconButton,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useState, useEffect } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";

export default function Nav({ children }: any) {
	const [isDrawer, setDrawer] = useState(false);
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Kirbank</title>
				<meta name="description" content="Generated by AlexG" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Rutas sin acceso - NO FUNCIONA - SOLO POR EL PATHNAME */}
			{router.pathname === "/login" || router.pathname === "/error" ? (
				<Flex minHeight="100vh" maxWidth="100vw">
					<Container> A ver.. {children}</Container>
				</Flex>
			) : (
				<Flex h="100vh" w="100vw" gap={0} flexDirection={{ base: "column", lg: "row" }}>
					{/* Sidebar */}
					<Flex flexDirection={{ base: "row", lg: "column" }} justify="space-between" align="center" w={{ base: "100%", lg: "20%" }} p={5}>
						{/* ENCABEZADOS */}
						<Heading display={{ base: "none", lg: "flex" }}>Kirbank</Heading>
						<Heading display={{ base: "flex", lg: "none" }}>K</Heading>
						{/* RUTAS */}
						<Stack spacing={6} display={{ base: "none", lg: "flex" }}>
							<Button colorScheme="teal" variant="link" leftIcon={<WarningIcon />}>
								<Link href="/">Home</Link>
							</Button>
							<Box>
								<Link href="/calculator">Calculator</Link>
							</Box>
							<Box>
								<Link href="/mint">Flash mint</Link>
							</Box>
							<Box>
								<Link href="/docs">Docs</Link>
							</Box>
						</Stack>
						{/* SOCIAL MEDIA */}
						<Flex justify="space-between" align="center" w="full" px={{ sm: 0, md: 1, lg: 5 }} display={{ base: "none", lg: "flex" }}>
							<Box p="2" bg="red.400">
								Git
							</Box>
							<Spacer />
							<Box p="2" bg="green.400">
								Link
							</Box>
							<Spacer />
							<Box p="2" bg="blue.400">
								Dis
							</Box>
						</Flex>
						{/* MOBILE VERSION */}
						<Button background="#DBF227" display={{ base: "flex", lg: "none" }}>
							wallet
						</Button>
						<IconButton variant="outline" display={{ base: "flex", lg: "none" }} aria-label="Send email" icon={<HamburgerIcon />} onClick={() => setDrawer(true)} />
						{/* DRAWER */}
						<Drawer isOpen={isDrawer} placement="right" onClose={() => setDrawer(false)}>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerCloseButton />
								<DrawerHeader>Kirbank</DrawerHeader>

								<DrawerBody gap={6}>
									<Button colorScheme="teal" variant="link" leftIcon={<WarningIcon />}>
										<Link href="/">Home</Link>
									</Button>
									<Box>
										<Link href="/calculator">Calculator</Link>
									</Box>
									<Box>
										<Link href="/mint">Flash mint</Link>
									</Box>
									<Box>
										<Link href="/docs">Docs</Link>
									</Box>
								</DrawerBody>

								<DrawerFooter>
									<Button variant="outline" mr={3} onClick={() => setDrawer(false)}>
										Cancel
									</Button>
									<Button colorScheme="blue">Save</Button>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>
					</Flex>
					{/* Contenido */}
					<Flex h="100vh" w={{ base: "100%", lg: "80%" }} flexDirection="column" justify="space-between" borderLeft={"2px"} borderColor="gray.200">
						<Header></Header>
						<Flex w="full" h="full" px={{ base: 6, md: 8, lg: 10 }}>
							{children}
						</Flex>
						<Footer></Footer>
					</Flex>
				</Flex>
			)}
		</>
	);
}
