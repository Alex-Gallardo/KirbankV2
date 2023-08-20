import * as React from "react";

import {
	Box,
	Button,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Heading,
	IconButton,
	Image,
	Spacer,
	Stack
} from "@chakra-ui/react";

import CalculatorIcon from "@/icons/calculator";
import DiscordIcon from "@/icons/discord";
import DocsIcon from "@/icons/docs";
import FlashIcon from "@/icons/flash";
import Footer from "../footer/footer";
import GithubIcon from "@/icons/github";
import { HamburgerIcon } from "@chakra-ui/icons";
import Head from "next/head";
import Header from "../header/header";
import HomeIcon from "@/icons/home";
import Link from "next/link";
import  PersonalIcon  from '@/icons/personal';
import WalletButton from "@/components/wallet-buttton/wallet-button";
import WalletIcon from "@/icons/wallet";
import { useRouter } from "next/router";
import { useState } from "react";

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
					<Flex flexDirection={{ base: "row", lg: "column" }} justify="space-between" align="center" w={{ base: "100%", lg: "20%" }} maxW={{lg:'330px'}} p={5} className='background-navbar' >
						{/* ENCABEZADOS */}
						{/* <Heading display={{ base: "none", lg: "flex" }} onClick={()=>router.push('/all')} color='gray.700'>Kirbank</Heading> */}
						<Image boxSize='500px'
							className='image'
							objectFit='cover'
							display={{ base: "none", lg: "flex" }}
							src='./images/Logotipo Kirbank negro.svg'
							alt='Kirbank Logo'
							onClick={()=> router.replace('/all')}
							/>
						<Heading display={{ base: "flex", lg: "none" }}>K</Heading>
						{/* RUTAS */}
						<Stack spacing={8} display={{ base: "none", lg: "flex" }} alignItems="start">
							<Button colorScheme="gray.500" variant="link" leftIcon={<HomeIcon />} fontSize='xl'>
								<Link style={{marginLeft: '0.5em'}} href="/home">Home</Link>
							</Button>
							<Button colorScheme="gray.500" variant="link" leftIcon={<CalculatorIcon />} fontSize='xl'>
								<Link style={{marginLeft: '0.5em'}} href="/calculator">Calculator</Link>
							</Button>
							<Button colorScheme="gray.500" variant="link" leftIcon={<FlashIcon />} fontSize='xl'>
								<Link style={{marginLeft: '0.5em'}} href="/mint">Flash mint</Link>
							</Button>
							<Button colorScheme="gray.500" variant="link" leftIcon={<DocsIcon />} fontSize='xl'>
								<Link style={{marginLeft: '0.5em'}} href="/docs">Docs</Link>
							</Button>
							<Button colorScheme="gray.500" variant="link" leftIcon={<PersonalIcon />} fontSize='xl'>
								<Link style={{marginLeft: '0.5em'}} href="/profile">Profile</Link>
							</Button>
						</Stack>
						{/* SOCIAL MEDIA */}
						<Flex justify="space-between" align="start" w="full" px={{ sm: 0, md: 1, lg: 5 }} display={{ base: "none", lg: "flex" }}>
							<Box p="2" >
								<GithubIcon w='26px' h='26px' fill='gray.400' onClick={()=> router.push('https://github.com/Alex-Gallardo/KirbankV2' )} />
							</Box>
							{/* <Spacer />
							<Box p="2" bg="green.400">
								Link
							</Box> */}
							<Spacer />
							<Box p="2">
								<DiscordIcon w='26px' h='26px' fill='gray.400'/>
							</Box>
						</Flex>
						{/* MOBILE VERSION */}
						{/* <WalletButton display={{ base: "flex", lg: "none" }}></WalletButton> */}
						<IconButton variant="outline" display={{ base: "flex", lg: "none" }} aria-label="Menu" icon={<HamburgerIcon />} onClick={() => setDrawer(true)} />
						{/* DRAWER */}
						<Drawer isOpen={isDrawer} placement="right" onClose={() => setDrawer(false)}>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerCloseButton />
								<DrawerHeader>Kirbank</DrawerHeader>

								<DrawerBody gap={7} display="flex" flexDirection="column" alignItems="start" pt="20">
									<Button colorScheme="gray.500" variant="link" leftIcon={<HomeIcon />}>
										<Link href="/home">Home</Link>
									</Button>
									<Button colorScheme="gray.500" variant="link" leftIcon={<CalculatorIcon />}>
										<Link href="/calculator">Calculator</Link>
									</Button>
									<Button colorScheme="gray.500" variant="link" leftIcon={<FlashIcon />}>
										<Link href="/mint">Flash mint</Link>
									</Button>
									<Button colorScheme="gray.500" variant="link" leftIcon={<DocsIcon />}>
										<Link href="/docs">Docs</Link>
									</Button>
									<Button colorScheme="gray.500" variant="link" leftIcon={<PersonalIcon />}>
										<Link href="/profile">Profile</Link>
									</Button>
								</DrawerBody>

								<DrawerFooter>
									<Button variant="outline"  onClick={() => setDrawer(false)}>
										Cancel
									</Button>
									{/* <Button colorScheme="blue">Save</Button> */}
								</DrawerFooter>
							</DrawerContent>
						</Drawer>
					</Flex>
					{/* Contenido */}
					<Flex h="100vh" w={{ base: "100%", lg: "80%" }} flexDirection="column" justify="space-between">
						<Header />
						<Flex w="full" h="full" px={{ base: 6, md: 10, lg: '100px' }} overflowY={{base:'auto',lg:'scroll'}} >
							{children}
						</Flex>
						<Footer />
					</Flex>
				</Flex>
			)}
		</>
	);
}
