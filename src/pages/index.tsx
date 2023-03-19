import {
	Badge,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
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
	StackDivider,
	Stat,
	StatArrow,
	StatHelpText,
	StatNumber,
	Tag,
	TagLabel,
	Text,
	Wrap,
	WrapItem,
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	PopoverFooter
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";

// import Image from "next/image";
import { Inter } from "@next/font/google";
import KirbankToken from '@/utils/abi/KirbankToken.json'
import Nav from "@/layouts/nav/nav";
import UserContext from "@/context/UserContext";
import { abiKirbankTokenAddress } from "config";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// ESTADOS
	const [tokens, setTokens] = useState<any>([])
	const [data, setData] = useState<{day: number, percent: number, total: number, finalTotal: number}>({
		day: 0,
		percent: 0,
		total: 0,
		finalTotal: 0,
	})
	const [isModal, setOptModal] = useState(false)
	const [isToken, setToken] = useState<any>({})

	const initialRef = useRef(null)
	const finalRef = useRef(null)

	const userContext = useContext(UserContext);
	const { usuario, red, actualizarRed } = userContext;

	// Ordenar los datos
	const orderData = (arrTokens: any)=>{
		let total: number[] = [0,0,0,0]
		let arrDates: number[][] = []

		// Variable tipo fecha - Hoy
		let t = Date.now()
		let today = new Date(t)

		// Recorremos los tokens
		arrTokens.map((token: any, i: number)=>{
			let { percent, profit, final} = computeTableValues(parseInt(token[2], 10), parseInt(token[3], 10))

			total[1] += percent
			total[2] += final
			total[3] += (profit * parseInt(token[3], 10)) + parseInt(token[2], 10)
		
			// Asignamos las fechas de creacion de cada token
			let dateToken = new Date(parseInt(token[4],10))
			let diff = today.getTime() - dateToken.getTime()
			 
			arrDates.push([ Math.trunc(diff/(1000*60*60*24)) ,  parseInt(token[3]), profit/365, ((profit/365) * Math.trunc(diff/(1000*60*60*24))) ])
			// arrDates.push([dateToken.getDate(), dateToken.getMonth() + 1, dateToken.getFullYear(), dateToken.getHours() , parseInt(token[3])])
			console.log('data Dates', dateToken.getUTCDate(), dateToken.getDate(),'/', dateToken.getMonth() + 1,'/', dateToken.getFullYear(), dateToken.getHours(),':',dateToken.getMinutes() )
		})

		let day: number = 0
		arrDates.forEach((arr: number[], i: number)=>{
			day += arr[3]
		})


		setData({...data, percent: total[1], total: total[2], finalTotal: total[3], day})
		console.log("data Dates:", arrDates)
	}

	// Computa los calculos
	const computeTableValues = (ammount: number, year: number) => {
		let a:number = 0
		let b: number = 0

		// Cantidad
		if(ammount > 0 && ammount <= 1000){
			a = 0.001
		}else if(ammount > 1000 && ammount <= 10000){
			a = 0.002
		}else if(ammount > 10000 && ammount <= 50000){
			a = 0.004
		}else if(ammount > 50000 && ammount <= 100000){
			a = 0.006
		}else if(ammount > 100000 && ammount <= 500000){
			a = 0.008
		}else if(ammount > 500000 && ammount <= 1000000){
			a = 0.01
		}else {
			a = 0
		}

		// Años
		if(year > 0 && year <= 1){
			b = 0.001
		}else if(year > 1 && year <= 2){
			b = 0.002
		}else if(year > 2 && year <= 3){
			b = 0.004
		}else if(year > 3 && year <= 4){
			b = 0.006
		}else if(year > 4 && year <= 5){
			b = 0.008
		}else if(year > 5 && year <= 10){
			b = 0.01
		}else if(year > 10 && year <= 15){
			b = 0.012
		}else if(year > 15 && year <= 20){
			b = 0.014
		}else {
			b = 0
		}

		let percent: number = a + b;
		let profit: number = (ammount * percent)
		let final: number = (ammount * percent)+ ammount;
		return { percent, profit, final}
	}
	
	useEffect(()=>{
		// Obtener tokens
		const {ethereum}: any = window
	
		// Da error al iniciar desde 0
		// try {
			if(ethereum){
				let provider = new ethers.providers.Web3Provider(ethereum)
				let signer = provider.getSigner()
				// console.log("-- signer --", await signer.getAddress())
				let contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken.abi, signer)
				contract.getKirbankTokensByOwner().then((tokens: any) =>{
					setTokens([...tokens])
					orderData(tokens)
				})
			}
		// }catch(e){
			// alert('Error, unable: Intenta recargar la pagina')
			// console.log('Error inicial:', e)
		// }
		
	},[])

	// Activa el modal
	const activeModal = (token: any)=>{
		console.log("token recibido:", token, typeof token)
		setToken(token)
		setOptModal(true)
	}

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="max" my={{base: 8, md:12}}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }} align="center" justify="space-between" w="full" >
					<Box>
						<Heading>Kirbank Token ({tokens.length}/50)</Heading>
						<Text>24 day, 7 hrs, 9 min to next rebase</Text>
					</Box>
					<Flex flexDirection="row" align="center" justify="space-between" rounded="md" bg="green.600" px={6} py={2} minW={{ base: "100%", lg: "50%" }} mt={{ base: 8, lg: 0 }}>
						{/* <Heading color="#fff">$ 100.00</Heading> */}
						<Stat color="white"  >
							{/* <StatLabel>Feb 12 - Feb 28</StatLabel> */}
							<StatNumber>$ {data.day.toFixed(2)}</StatNumber>
							<StatHelpText  >
								<StatArrow type="increase" />
								{data.percent.toFixed(3)} %
							</StatHelpText>
						</Stat>
						<Text color="#fff">Your earnings / day</Text>
					</Flex>
				</Flex>

				{/* Contenido y tablas */}
				<Stack direction="column" mt={{base: 8, lg: 12}}>
					{/* Data analytics */}
					<Stack direction={{base: 'column', lg:'row'}} divider={<StackDivider borderColor="gray.200" />} spacing={0} align="stretch" w="full" rounded="md" overflow="hidden" h="full">
						<Box p={3} bg="yellow.600" color="white" w='full'>
							<Text mb={{base: '0', lg:'3'}}>Value percentage total</Text>
							<Heading>{data.percent.toFixed(3)} %</Heading>
						</Box>
						<Box p={3} bg="teal.600" color="white" w='full'>
							<Text mb={{base: '0', lg:'3'}}>Profit value per year</Text>
							<Heading>$ {data.total.toFixed(2)}</Heading>
						</Box>
						<Box p={3} bg="pink.600" color="white" w='full'>
							<Text mb={{base: '0', lg:'3'}}>Final win value</Text>
							<Heading>$ {data.finalTotal.toFixed(2)}</Heading>
						</Box>
					</Stack>
					<Box py={5} w='full'>
						<Tag size='lg' variant='subtle' colorScheme='cyan' py='3' w='full'>
							<TagLabel as='b'>My NFT</TagLabel>
						</Tag>
					</Box>

					{/* LISTADO #2 */}
					<Wrap spacing='30px'>
						{[...tokens].reverse().map((token: any, i:number)=>{
							let dateToken = new Date(parseInt(token.dateCreate,10))
							return(
								<WrapItem key={i}>
									<Card maxW={{base:'sm', md:'xs', lg:'sm'}} boxShadow='lg' variant='outline'>
										<CardBody>
											<Image
											src={token.imageUrl}
											alt='Kirbank NFT Token'
											borderRadius='lg'
											/>
											<Stack mt='6' spacing='2'>
											<Heading size='md'>Kirbank Token #KBT</Heading>
												<Text  noOfLines={1}>investment: <Badge colorScheme='green'>$ {token.cost}</Badge></Text>
												<Text  noOfLines={1}>time: <Badge colorScheme='blue'>{token.yearsSet} years</Badge></Text>
												<Text  noOfLines={1}>created: <Badge colorScheme='orange'>{`${dateToken.getDate()} / ${dateToken.getMonth() + 1} / ${dateToken.getFullYear()}`}</Badge></Text>
												<Text  noOfLines={1}>percentage: <Badge colorScheme='purple'>{computeTableValues(parseInt(token.cost,10), parseInt(token.yearsSet,10) ).percent.toFixed(3)} %</Badge></Text>
											</Stack>
										</CardBody>
										<Divider />
										<CardFooter>
											<ButtonGroup spacing='2'>

												<Popover
													// initialFocusRef={initialFocusRef}
													placement='bottom'
													>
													<PopoverTrigger>
													<Button variant='solid' colorScheme='blue'>
														Share
													</Button>
														</PopoverTrigger>
														<PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
															<PopoverHeader pt={4} fontWeight='bold' border='0'>
																Share Your NFT
															</PopoverHeader>
															<PopoverArrow />
															<PopoverCloseButton />
															<PopoverBody>
																Share your NFT the different platforms
															</PopoverBody>
															<PopoverFooter
															border='0'
															display='flex'
															alignItems='center'
															justifyContent='space-between'
															pb={4}
															>
															<Box fontSize='sm'>Step 2 of 4</Box>
															<ButtonGroup size='sm'>
																<Button colorScheme='green'>Setup Email</Button>
															</ButtonGroup>
															</PopoverFooter>
														</PopoverContent>
													</Popover>

												<Button variant='ghost' colorScheme='blue' onClick={()=> activeModal(token)}>
													Transfer
												</Button>
											</ButtonGroup>
										</CardFooter>
									</Card>
								</WrapItem>
							)})}
					</Wrap>
					<Modal
						initialFocusRef={initialRef}
						finalFocusRef={finalRef}
						isOpen={isModal}
						onClose={()=>setOptModal(false)}
						size={{base: 'xl'}}
						isCentered
					>
						<ModalOverlay
							bg='none'
							backdropFilter='auto'
							backdropInvert='80%'
							backdropBlur='2px'
						/>
						<ModalContent>
							<ModalHeader>Transfer your NFT</ModalHeader>
							<ModalCloseButton />
							
							<ModalBody pb={6}>
								<Stack direction={{base: 'column', md: 'row'}} gap='6' align={{base:"center", md: 'end'}} justify={{base: 'center'}}>
									<WrapItem>
										<Card boxShadow='lg' variant='outline' direction='row' maxW={{base:'300px', md: 'max-content'}} >
											<CardBody>
												<Image
												src={isToken.imageUrl}
												alt='Kirbank NFT Token'
												borderRadius='lg'
												/>
												<Stack mt='6' spacing='2'>
												<Heading size='sm'>Kirbank Token #KBT</Heading>
													<Text >investment: <Badge colorScheme='green'>$ {isToken.cost}</Badge></Text>
													<Text >time: <Badge colorScheme='blue'>{isToken.yearsSet} years</Badge></Text>
													<Text >percentage: <Badge colorScheme='purple'>{computeTableValues(parseInt(isToken.cost,10), parseInt(isToken.yearsSet,10) ).percent.toFixed(3)} %</Badge></Text>
												</Stack>
											</CardBody>
										</Card>
									</WrapItem>
									<FormControl minW={{base: 'max-content', }}>
										<Text mb='3'>Before transferring let's make sure:</Text>
										<Tag color='white' bg={red?'green.500':'red.400'}>
											{red?
												<CheckIcon fill='white' mr='2' />
											:
												<SmallCloseIcon fill='white' mr='2' />
											}
											<TagLabel>{red ? "Network connected" : "Network offline"}</TagLabel>
										</Tag>
										<Spacer my='3'/>
										<Tag color='white' bg={usuario?'green.500':'red.400'}>
											{usuario?
												<CheckIcon fill='white' mr='2' />
											:
												<SmallCloseIcon fill='white' mr='2' />
											}
											<TagLabel>{usuario ?  "Wallet connected" : "Wallet offline"}</TagLabel>
										</Tag>
										<FormLabel mt='4'>Enter the address to transfer</FormLabel>
										<Input ref={initialRef} placeholder='0x735...0x0' />
									</FormControl>
								</Stack>
							</ModalBody>

							<ModalFooter>
								<Button colorScheme='blue' mr={3}>
									Transfer
								</Button>
								<Button onClick={()=>setOptModal(false)}>Cancel</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</Stack>
			</Box>
		</Nav>
	);
}
