import { Box, Button, Card, CardBody, Center, Heading, Image, Stack, StackDivider, Text, VStack, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";

import CalculatorIcon from "@/icons/calculator";
import Link from "next/link";
import PersonalIcon from "@/icons/personal";
import UserContext from "@/context/UserContext";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const LoginIndex = () => {
	// STATE
	const router = useRouter();
	const toast = useToast();
	
	// CONTEXT
	const userContext = useContext(UserContext);
	const { usuario, agregarUsuario, actualizarRed } = userContext;

	// Funcion para conectar Metamask
	const connectMetamask = async () => {
		try {
			const { ethereum }: any = window;
			if (!ethereum) {
				toast({
					title: "Conecta Metamask.",
					description: "Crea una wallet para conectarte con nosotros",
					status: "error",
					duration: 2000,
					isClosable: true,
					variant: "left-accent",
					position: "top"
				});
				return;
			}

			// eth_requestAccounts: Solicita las cuentas Metamask
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			console.log("- Signer", signer.provider);
			agregarUsuario(accounts[0]);
			// let addressWallet: string = `${accounts[0]?.substr(0, 6)}...${accounts[0]?.substr(-4)}`;
			// setText(accounts[0]);
			// setText(addressWallet);
			// console.log("Account -wallet", addressWallet);

			// Establecimiento de red
			// RED ESTABLECIDA
			if (ethereum.networkVersion == 5) {
				actualizarRed(true);
			} else {
				actualizarRed(false);
			}

			// Redirect to
			router.push("/");
		} catch (err: any) {
			console.error("Ha ocurrido un error", err);
			toast({
				title: "Ha ocurrido un error",
				description: err,
				status: "error",
				duration: 2000,
				isClosable: true,
				variant: "solid",
				position: "bottom"
			});
		}
	};

	return (
		<Stack direction={{ base: "column", lg: "row" }} justify="stretch" w="100vw" h="100vh">
			<Box w={{ base: "100vw", md: "100%", lg: "30%" }} h={{ base: "30%", lg: "100%" }}>
				{/* <div className="background-pattern" style={{ width: "100%", height: "100%" }}></div> */}
				{/* divider={<StackDivider borderColor='gray.200' /> }  */}
				<VStack 
					w='full' 
					h='full'
					className="background-pattern"
					spacing={4}
					align='stretch' 
					justify='space-between'
					p={8}>
						<Heading color='white'>Kirbank</Heading>
						{/* <VStack align='start' mr={2}>
							<Heading color='white'>Kirbank NFT</Heading>
							<Text color='white' fontSize={{base: "md", md:'lg'}}>
								Join us and become part of the excitement of creating a unique and valuable NFT!
							</Text>
						</VStack> */}
						<Text color='white' as='b'>1 KBTK = $1.24</Text>
  				</VStack>
			</Box>
			<VStack w="full" h={{base:"auto", lg: 'full'}} align="flex-start" justify={{ base: "start", lg: "center" }} px={10} py={5} spacing={6}>
				{/* <Center w='75px' h='75px' bg='yellow.200' borderRadius='full' ></Center> */}
				<Heading >NFT Collection</Heading>
				<Text fontSize={{base: "md"}} maxW='5xl' color='gray.500' >
					Join us and become part of the excitement of creating a unique and valuable NFT! We mint an NFT with an exclusive design and an opportunity to generate recurring income.
					Dont miss this opportunity to own a unique and valuable digital asset! Secure your NFT now!
				</Text>
				{/* CARD #1 */}
				<Card
					direction='row'
					overflow='hidden'
					variant='elevated'
					w='full'
					maxW='4xl'
					onClick={connectMetamask}
					border='2px'
					borderColor='blue.300'
					>
						<Center w={{base: '50px', lg: '120px'}} h={{base: '50px', lg: '120px'}} >
							<Center w={{base: '50px', lg:"60px"}} h={{base: '50px', lg:"60px"}} bg='blue.400' borderRadius={{base: 2, md: 4, lg: 6}} >
								<PersonalIcon w={{base: '20px', lg:"25px"}} h={{base: '20px', lg:"25px"}} fill='white'  />
							</Center>
						</Center>
						<Stack>
							<CardBody  p={0} display='flex' flexDir='column' alignItems='start' justifyContent='center' px={{base:4, lg: 0}} paddingRight={{base: 0, lg: 6}}>
								<Heading size={{base: "sm", lg:'md'}}>Personal </Heading>

								<Text py='2' display={{base: 'none', lg: "flex"}}>
									Connect with your wallet and see all your financial data per day
								</Text>
							</CardBody>
						</Stack>
				</Card>
				{/* CARD #2 */}
				<Card
					direction='row'
					overflow='hidden'
					w='full'
					maxW='4xl'
					onClick={()=> router.push('/calculator')}
					>
						<Center w={{base: '50px', lg: '120px'}} h={{base: '50px', lg: '120px'}} >
							<Center w={{base: '50px', lg:"60px"}} h={{base: '50px', lg:"60px"}} bg='blue.400' borderRadius={{base: 2, md: 4, lg: 6}} >
								<CalculatorIcon w={{base: '20px', lg:"25px"}} h={{base: '20px', lg:"25px"}} fill='white'  />
							</Center>
						</Center>
						<Stack>
							<CardBody p={0} display='flex' flexDir='column' alignItems='start' justifyContent='center' px={{base: 4, lg: 0}}  paddingRight={{base: 0, lg: 6}}>
								<Heading size={{base: "sm", lg:'md'}}>Calculator</Heading>
								<Text py='2' display={{base: 'none', lg: "flex"}}>
									Make your investment calculations in real time
								</Text>
							</CardBody>
						</Stack>
				</Card>

				{/* <WalletButton></WalletButton> */}
				{/* <Button background="#DBF227">
					<Link href="/">Connect your wallet</Link>
				</Button> */}
			</VStack>
		</Stack>
	);
};

export default LoginIndex;
