import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Stack,
	Tag,
	TagLabel,
	Text,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";

import { Inter } from "@next/font/google";
import Styles from "@/styles/page_index.module.css";
import { TokenSchema } from "@/schemas/TokenSchema";
import UserContext from "@/context/UserContext/UserContext";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
	// ESTADOS

	// MODAL
	const [isModal, setOptModal] = useState(false);

	// REFERENCIAS
	const initialRef = useRef(null);
	const finalRef = useRef(null);

	// RUTAS
	const router = useRouter();

	const userContext = useContext(UserContext);
	const { user, red, nfts } = userContext;

	// Activa el modal
	const activeModal = (token: any) => {
		console.log("token recibido:", token, typeof token);
		setOptModal(true);
	};

	return (
		<Stack w='full' h="max" direction='column' align='center'>
			{/* NAVBAR */}
			<Flex flexDirection='row' align="center" justify="space-between" w="full" px='5' py='3'>
				<Flex flexDirection="row" align="center" justify="space-between" >
					<Image
						h='50px'
						w='50px'
						objectFit='cover'
						display={{ base: "none", lg: "flex" }}
						src='./images/Isotipo Kirbank blanco.svg'
						alt='Kirbank Isotipo'
					/>
					<Image boxSize='250px'
						maxH='60px'
						objectFit='cover'
						display={{ base: "none", lg: "flex" }}
						src='./images/Logotipo Kirbank negro.svg'
						alt='Kirbank Logotipo'
					/>
				</Flex>
				<Flex flexDirection="row" align="center" justify="space-between"  >
					<Text mx='3' >Service</Text>
					<Text mx='3' >Product</Text>
					<Text mx='3' >About us</Text>
				</Flex>
				<Button colorScheme="green" onClick={()=> router.push('/login')}>Got to demo</Button>
			</Flex>

			{/* ============================================================================================================================================================ */}
			{/* PART #1 */}
			<Stack direction="row" px='10' spacing='14' height='xl' mb='100px'>
				{/* TEXT PART #1 */}
				<Stack
					direction='column'
					spacing='3'
					align="stretch"
					justify='center'
					w="50%"
					h="full"
				>
					<Heading>Plan join ventures for desired targets</Heading>
					<Text >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac fringilla eros, sit amet mattis elit. Maecenas in ipsum et lacus malesuada viverra.</Text>
					<Flex py={3} w="full" direction='row' >
						<Text>Introducing about us</Text>
					</Flex>
					<Box bg="blackAlpha.300" rounded='md'>
						{/* Primer contenedor */}
						<Flex direction='row' align='start' justify='center'>
							<Text bg='#fff' px='4' py='1' borderBottomRadius='md'>Aviable for download</Text>
						</Flex>
						{/* Opciones de descarga */}
						<Flex direction='row' align='center' justify='space-around' p='5' >
							<Flex direction='column' align='center' justify='center' bg='gray.700' px='2' py='1' rounded='md' >
								<Text color='#fff'>Webapp online</Text>
							</Flex>
							<Flex direction='column' align='center' justify='center' bg='gray.700' px='2' py='1' rounded='md'>
								<Text color='#fff'>Contract in blockchain</Text>
							</Flex>
						</Flex>
					</Box>
				</Stack>
				<Stack
					direction='column'
					spacing='3'
					align="stretch"
					justify='space-around'
					w="50%"
					h="full"
				>
					<Flex py={3} w="full" direction='column' align='end' >
						<Heading>225K +</Heading>
						<Text>Happy users</Text>
					</Flex>
					<Flex direction='row' justify='space-between' rounded='2xl' h='250px' maxW='600px' className={Styles.container_mockups}>
						<Image src="./images/png/device-2.png" className={Styles.img_mockup} alt='Kirbank Mockup' />
						<Image src="./images/png/device-3.png" className={Styles.img_mockup} alt='Kirbank Mockup' style={{right:'0'}} />
					</Flex>
				</Stack>
			</Stack>

			{/* ============================================================================================================================================================ */}
			{/* PART #2 */}
			<Stack direction="row" px='10' spacing='14' my='14' maxW='container.xl '>
				{/* TEXT PART #1 */}
				<Stack
					direction='column'
					spacing='3'
					align="stretch"
					justify='center'
					w="50%"
					h="full"
				>
					<Heading>Payment plan made eaiser together</Heading>
					<Flex direction='row' align='center' justify='start' py='5' >
						<Flex direction='column' align='center' justify='center' px='2' py='1' >
							<Heading color='green.400'>2.3M +</Heading>
							<Text>Dowloaded</Text>
						</Flex>
						<Flex direction='column' align='center' justify='center' px='2' py='1' >
							<Heading color='green.400'>4.9</Heading>
							<Text>Ratings</Text>
						</Flex>
					</Flex>
				</Stack>
				<Stack
					direction='column'
					spacing='3'
					align="stretch"
					justify='center'
					w="50%"
					h="full"
				>
					<Box >
						<Flex  w="full" direction='row' align='center' mb='3'>
							<Image
								h='40px'
								w='40px'
								objectFit='cover'
								src='./images/Isotipo Kirbank blanco.svg'
								alt='Kirbank Logo'
							/>
							<Text as='b' fontSize='lg' ml='3'>Clear targets</Text>
						</Flex>
						<Text>Curabitur mattis orci eu vehicula malesuada. Nam in sodales neque. Quisque commodo efficitur suscipit. Morbi at aliquam mauris, eget dignissim nisi.</Text>
					</Box>
					<Divider/>
					<Box >
						<Flex  w="full" direction='row' align='center' mb='3' >
							<Image
								h='40px'
								w='40px'
								objectFit='cover'
								src='./images/Isotipo Kirbank blanco.svg'
								alt='Kirbank Logo'
							/>
							<Text as='b' fontSize='lg' ml='3'>Promissing progress</Text>
						</Flex>
						<Text>Curabitur mattis orci eu vehicula malesuada. Nam in sodales neque. Quisque commodo efficitur suscipit. Morbi at aliquam mauris, eget dignissim nisi.</Text>
					</Box>
				</Stack>
			</Stack>

			{/* ============================================================================================================================================================ */}
			{/* PART #3 */}
			<Stack direction="column" p='10' my='14' mx='10' spacing='4'>
				{/* CONTAINER */}
				<Stack
					direction='column'
					spacing='3'
					align="center"
					justify='center'
					w="full"
					bg='blackAlpha.800'
					borderTopRadius='xl'
				>
					<Text color='green.400' bg='#fff' px='4' py='1' borderBottomRadius='md' as='b' fontSize='lg'>Monitor easily</Text>
					<Flex direction='row' align='center' justify='space-around' py='5' px='7' mb='8' >
						<Stack direction='column' align='start' justify='center' spacing='4' maxW='55%' >
							<Text color='#fff' fontSize='4xl'>Connecting your beliefs with discourse with friends</Text>
							<Text color='gray.400'>Stay up data on the program of your plan</Text>
							<Button variant='solid' colorScheme='green' color='#fff' mt='8'>Learn More</Button>
						</Stack>
						<Stack direction='column' align='center' justify='center' maxW='45%' >
							<Image
								h='200px'
								w='250px'
								objectFit='cover'
								display={{ base: "none", lg: "flex" }}
								src='./images/Isotipo Kirbank blanco.svg'
								alt='Kirbank Isotipo'
							/>
						</Stack>
					</Flex>
				</Stack>
				{/* FILA CONTAINER */}
				<Stack
					direction='row'
					spacing='4'
					w="full"
				>
					<Flex  w="full" direction='column' align='start' px='6' py='5' bg="blackAlpha.300" borderBottomLeftRadius='xl' >
						<Image
							h='40px'
							w='40px'
							objectFit='cover'
							src='./images/Isotipo Kirbank blanco.svg'
							alt='Kirbank Logo'
							mb='3'
						/>
						<Text as='b' fontSize='lg' >Segurity and compliance</Text>
						<Text mb='5'>Duis laoreet, ante eget interdum placerat, libero elit euismod lectus</Text>
						<Button variant='link' colorScheme='teal'>Learn More</Button>
					</Flex>
					<Flex  w="full" direction='column' align='start' px='6' py='5' bg="blackAlpha.300" borderBottomRightRadius='xl' >
						<Image
							h='40px'
							w='40px'
							objectFit='cover'
							src='./images/Isotipo Kirbank blanco.svg'
							alt='Kirbank Logo'
							mb='3'
						/>
						<Text as='b' fontSize='lg' >Integrations</Text>
						<Text mb='5'>Duis laoreet, ante eget interdum placerat, libero elit euismod lectus</Text>
						<Button variant='link' colorScheme='teal'>Learn More</Button>
					</Flex>
				</Stack>
			</Stack>

			{/* ============================================================================================================================================================ */}
			{/* PART #4 */}
			<Stack direction="row" align='center' spacing='10' p='12' my='14' >
				{/* IMAGEN ROUNDED */}
				<Box
					w="40%"
					h='300px'
					bg='gray.100'
				>
				</Box>
				{/* INFORMATION */}
				<Stack
					direction='column'
					spacing='4'
					align="start"
					justify='center'
					w="60%"
					h="full"
				>
					<Heading >Connecting with each other for the same purpose</Heading>
					<Text mb='5'>Pellentesque et maximus nulla. Duis laoreet, ante eget interdum placerat, libero elit euismod lectus, sit amet euismod lacus neque nec arcu.</Text>
					<Button variant='solid' bg='black' color='gray.100'>Learn More</Button>
				</Stack>
			</Stack>

			{/* ============================================================================================================================================================ */}
			{/* PART #5 */}
			<Stack direction="column" align='center' spacing='8' py='12' px='10' my='14' mb='100px' >
				{/* HEADING INFO */}
				<Flex
					direction='row'
					align="center"
					justify='space-between'
					w="full"
					mb='5'
				>
					<Heading >What our users who have used it say</Heading>
					<Stack direction='row' spacing='4'>
						<Button>{'<'}</Button>
						<Button>{'>'}</Button>
					</Stack>
				</Flex>
				{/* CARDS */}
				<Wrap spacing='6' justify='space-around'>
					<Card maxW='sm' boxShadow="lg" variant="solid" bg='gray.100'>
						<CardBody>
							<Flex direction='row' align='center' justify='start' mb='4'>
								<Image src='./images/Isotipo Kirbank blanco.svg' alt="user-nft" borderRadius='full' w='50px' h='50px' />
								<Text noOfLines={1} ml='3'>
									investment: <Badge colorScheme="green">Samuel Smith</Badge>
								</Text>
							</Flex>
							<Text color='gray.500'>Pellentesque et maximus nulla. Duis laoreet, ante eget interdum placerat, libero elit euismod lectus, sit amet euismod lacus neque nec arcu. Nulla sollicitudin auctor enim et bibendum. Nullam luctus faucibus hendrerit.</Text>
						</CardBody>
					</Card>
					<Card maxW='sm' boxShadow="lg" variant="solid" bg='gray.100'>
						<CardBody>
							<Flex direction='row' align='center' justify='start' mb='4'>
								<Image src='./images/Isotipo Kirbank blanco.svg' alt="user-nft" borderRadius='full' w='50px' h='50px' />
								<Text noOfLines={1} ml='3'>
									investment: <Badge colorScheme="green">Samuel Smith</Badge>
								</Text>
							</Flex>
							<Text color='gray.500'>Pellentesque et maximus nulla. Duis laoreet, ante eget interdum placerat, libero elit euismod lectus, sit amet euismod lacus neque nec arcu. Nulla sollicitudin auctor enim et bibendum. Nullam luctus faucibus hendrerit.</Text>
						</CardBody>
					</Card>
					<Card maxW='sm' boxShadow="lg" variant="solid" bg='gray.100'>
						<CardBody>
							<Flex direction='row' align='center' justify='start' mb='4'>
								<Image src='./images/Isotipo Kirbank blanco.svg' alt="user-nft" borderRadius='full' w='50px' h='50px' />
								<Text noOfLines={1} ml='3'>
									investment: <Badge colorScheme="green">Samuel Smith</Badge>
								</Text>
							</Flex>
							<Text color='gray.500'>Pellentesque et maximus nulla. Duis laoreet, ante eget interdum placerat, libero elit euismod lectus, sit amet euismod lacus neque nec arcu. Nulla sollicitudin auctor enim et bibendum. Nullam luctus faucibus hendrerit.</Text>
						</CardBody>
					</Card>
				</Wrap>
			</Stack>

			{/* ============================================================================================================================================================ */}
			{/* PART #6 FOOTER */}
			<Stack direction="column" align='center' py='12' px='10' mt='14' bg='blackAlpha.800' w='full' position='relative' >
				{/* BOX ABSOLUTE */}
				<Stack
					w="full"
					color='#fff'
					borderRadius='xl'
					maxW='container.xl'
					className={Styles.container_footer_box}
					direction='row'
				>
					<Stack direction='column' spacing='4' p='10'>
						<Text fontSize='4xl'>Plan your budget now with your friends together</Text>
						<Button variant='solid' bg='blackAlpha.900' color='#fff' w='100px'> Download </Button>
					</Stack>
					<Box w='40%' h='100px'></Box>
				</Stack>
				{/* INFORMATION FOOTER */}
				<Stack direction='row' w='full' align='start' justify='space-between' maxW='container.xl' mt='150px' >
					{/* FOOTER INFO PART #1 */}
					<Stack direction='column' spacing='4' maxW='25%'>
						<Heading color='#fff'>KIRBANK</Heading>
						<Text color='gray.500'>Pellentesque et maximus nulla. Duis laoreet, ante eget interdum placerat, libero elit euismod lectus, sit amet euismod lacus neque nec arcu.</Text>
						<Stack direction='row' spacing='3' mt='6'>
							<Heading bg='gray.100' >F</Heading>
							<Heading bg='gray.100' >T</Heading>
							<Heading bg='gray.100' >Y</Heading>
						</Stack>
					</Stack>
					{/* FOOTER INFO PART #2 */}
					<Stack direction='row' spacing='14' maxW='40%'>
						<Stack direction='column' spacing='7'>
							<Text color="gray.100">About</Text>
							<Text color="gray.500">about us</Text>
							<Text color="gray.500">Features</Text>
							<Text color="gray.500">Blog</Text>
						</Stack >
						<Stack direction='column' spacing='7'>
						<Text color="gray.100">Company</Text>
							<Text color="gray.500">How we work</Text>
							<Text color="gray.500">Jobs</Text>
							<Text color="gray.500">Community</Text>
						</Stack >
						<Stack direction='column' spacing='7'>
						<Text color="gray.100">Legal</Text>
							<Text color="gray.500">Terms of use</Text>
							<Text color="gray.500">Provacy policy</Text>
							<Text color="gray.500">Security Policy</Text>
						</Stack >
					</Stack>
				</Stack>
				<Divider my='3'/>
				<Text color='gray.600'>Pellentesque et maximus nulla. Duis laoreet, ante eget interdum placerat, libero elit euismod lectus, sit amet euismod lacus neque nec arcu.</Text>
			</Stack>

			{/* ============================================================================================================================================================ */}
			{/* MODAL */}
			<Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isModal} onClose={() => setOptModal(false)} size={{ base: "xl" }} isCentered>
				<ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />
				<ModalContent>
					<ModalHeader>Transfer your NFT</ModalHeader>
					<ModalCloseButton />

					<ModalBody pb={6}>
						<Stack direction={{ base: "column", md: "row" }} gap="6" align={{ base: "center", md: "end" }} justify={{ base: "center" }}>
							<WrapItem>
								<Card boxShadow="lg" variant="outline" direction="row" maxW={{ base: "300px", md: "max-content" }}>
									<CardBody>
										<Image src={'https://i.ibb.co/wh5SLBg/Isotipo-Kirbank-fondo-azul.png'} alt="Kirbank NFT Token" borderRadius="lg" />
										<Stack mt="6" spacing="2">
											<Heading size="sm">Kirbank Token #KBT</Heading>
											<Text>
											</Text>
											<Text>
											</Text>
											<Text>
												percentage:{" "}
												<Badge colorScheme="purple">
													PERCENTAGE
												</Badge>
											</Text>
										</Stack>
									</CardBody>
								</Card>
							</WrapItem>
							<FormControl minW={{ base: "max-content" }}>
								<Text mb="3">Before transferring lets make sure:</Text>
								<Tag color="white" bg={red ? "green.500" : "red.400"}>
									{red ? <CheckIcon fill="white" mr="2" /> : <SmallCloseIcon fill="white" mr="2" />}
									<TagLabel>{red ? "Network connected" : "Network offline"}</TagLabel>
								</Tag>
								<Spacer my="3" />
								<Tag color="white" bg={user ? "green.500" : "red.400"}>
									{user ? <CheckIcon fill="white" mr="2" /> : <SmallCloseIcon fill="white" mr="2" />}
									<TagLabel>{user ? "Wallet connected" : "Wallet offline"}</TagLabel>
								</Tag>
								<FormLabel mt="4">Enter the address to transfer</FormLabel>
								<Input ref={initialRef} placeholder="0x735...0x0" />
							</FormControl>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3}>
							Transfer
						</Button>
						<Button onClick={() => setOptModal(false)}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Stack>
	);
}
