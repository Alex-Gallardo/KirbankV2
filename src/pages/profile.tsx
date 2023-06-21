import {
    Avatar,
    AvatarBadge,
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Select,
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

export default function Profile() {
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

	// Activa el modal
	const activeModal = (token: any)=>{
		console.log("token recibido:", token, typeof token)
		setToken(token)
		setOptModal(true)
	}
    let coin = "ETH"

    // Cambios input
	const handleChange = (event: any, op: string) => {
		let valor: any = 0 
		valor = event.target.value 
		// if(valor == "") valor = 0

        console.log("Campos de entrada :)", valor, op)
		// switch(op){
		// 	case "ammount":
		// 		break;
		// 	case "year":
		// 		break;
		// 	case "link":
		// 		break;
		// 	default:
		// 		break
		// }
	}

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="max" my={{base: 8, md:12}}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }} align="center" justify="center" w="full" >
					<Flex>
                        <Avatar size="full" width={{ base: "150px" }} name="Alex Gallardo" src="https://bit.ly/dan-abramov">
                        </Avatar>
                    </Flex>
                    <Box mx='10'>
						<Heading>Alex Gallardo</Heading>
						<Text>gallardoalex069@gmail.com</Text>
					</Box>
				</Flex>
                
                {/* BODY - CONTAINER */}
				<Container mt={12} mb='500px'>
					<VStack
						divider={<StackDivider borderColor="gray.400" />}
						spacing={5}
						align="stretch"
						w={{ base: "full" }}
						mt={{ base: 3, lg: 0 }}
						rounded="lg"
						overflow="hidden"
					>
						<VStack p="2">
                            {/* NOMBRE */}
                            <Flex w='full' justify='start'>
                                <Text>Nombre completo:</Text>
                            </Flex>
							<InputGroup>
								{/* <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >$</InputLeftElement> */}
								<Input value='Alex Gallardo' placeholder="" type='text' onChange={(e)=>handleChange(e, 'ammount')}/>
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
                            
                            {/* EMAIL */}
                            <Flex w='full' justify='start'>
                                <Text>Correo electronico:</Text>
                            </Flex>
							<InputGroup>
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >@</InputLeftElement>
								<Input value='gallardoalex069@gmail.com' placeholder="@gmail.com" type='text' onChange={(e)=>handleChange(e, 'ammount')}/>
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
                            {/* NO CUENTA */}
                            <Flex w='full' justify='start'>
                                <Text>Wallet:</Text>
                            </Flex>
							<Box w='full'>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >i</InputLeftElement>
									<Input value='0xA7Bd319F1EA641299B2E38F30653763fd545F4Ea' placeholder="/..." onChange={(e)=>handleChange(e, 'link')} />
								</InputGroup>
							</Box>
                            {/* NO CUENTA */}
                            <Flex w='full' justify='start'>
                                <Text>Número de cuenta:</Text>
                            </Flex>
							<InputGroup>
								{/* <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >$</InputLeftElement> */}
								<Input value='GB33BUKB20201555555555' placeholder="GB33BU...555" type='text' onChange={(e)=>handleChange(e, 'ammount')}/>
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
                            {/* CUENTA */}
                            <Flex w='full' justify='start'>
                                <Text>Tipo de cuenta</Text>
                            </Flex>
							<Stack direction={{base:'column', md: 'row'}} divider={<StackDivider display={{base:'none', md: 'flex'}} borderColor="gray.400" />} spacing={0} align="center" w="full" overflow="hidden">
								<Select value={coin} pr={{base:'0', md: '2'}}  color="gray.500" onChange={(e)=>handleChangeSelect(e)} flex={{base:'1'}} >
									<option value='ETH'>Monetaria</option>
									<option value='BTC'>Ahorro</option>
									{/* <option value='matic'>Polygon</option> */}
								</Select>
							</Stack>
                            {/* GUARDAR CAMBIOS */}
                            <Flex w='full' justify='start' mt='20px'>
                                <Button
                                    isLoading={false}
                                    loadingText="Guardando"
                                    bg="blue.600"
                                    variant="solid"
                                    color="white"
                                    spinnerPlacement="end"
                                    w="full"
                                    mt='30px'
                                >
                                    Guardar cambios
                                </Button>
                            </Flex>
						</VStack>
						
						
					</VStack>
				</Container>

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
												</Stack>
											</CardBody>
										</Card>
									</WrapItem>
									<FormControl minW={{base: 'max-content', }}>
										<Text mb='3'>Before transferring lets make sure:</Text>
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
