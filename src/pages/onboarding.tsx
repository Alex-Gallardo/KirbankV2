import {
	Badge,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Center,
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
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
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
	VStack,
	Wrap,
	WrapItem,
	useDisclosure
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";

// import Image from "next/image";
import { Inter } from "@next/font/google";
// import KirbankToken from '@/utils/abi/KirbankToken.json'
import KirbankToken721 from '@/utils/abi/KirbankToken721.json'
import Nav from "@/layouts/nav/nav";
import UserContext from "@/context/UserContext";
// import { abiKirbankTokenAddress } from "config";
import { abiKirbankTokenAddress } from "config721";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export default function Onboarding() {
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
	const { user, red, actualizarRed } = userContext;

	
	
	useEffect(()=>{
		// Obtener tokens
		const {ethereum}: any = window
	
		// Da error al iniciar desde 0
		// try {
			if(ethereum){
				let provider = new ethers.providers.Web3Provider(ethereum)
				// Signer necesario para traer el contrato
				let signer = provider.getSigner()
				let contract = new ethers.Contract(abiKirbankTokenAddress, KirbankToken721.abi, signer)
				console.log("-- contract --", contract)
				contract.getKirbankTokensByOwner(user).then((tokens: any) =>{
					console.log("-- tokens: ", tokens)
					setTokens([...tokens])
				})
			}
		// }catch(e){
			// alert('Error, unable: Intenta recargar la pagina')
			// console.log('Error inicial:', e)
		// }

		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	// Activa el modal
	const activeModal = (token: any)=>{
		console.log("token recibido:", token, typeof token)
		setToken(token)
		setOptModal(true)
	}

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
}
