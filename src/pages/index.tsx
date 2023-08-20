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
	Tag,
	TagLabel,
	Text,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";

import { Inter } from "@next/font/google";
import { TokenSchema } from "@/schemas/TokenSchema";
import UserContext from "@/context/UserContext/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
	// ESTADOS
	const [tokens, setTokens] = useState<TokenSchema[]>([]);
	
	// MODAL
	const [isModal, setOptModal] = useState(false);
	// TOKEN SELECCIONADO

	const initialRef = useRef(null);
	const finalRef = useRef(null);

	const userContext = useContext(UserContext);
	const { user, red, nfts } = userContext;

	// Activa el modal
	const activeModal = (token: any) => {
		console.log("token recibido:", token, typeof token);
		setOptModal(true);
	};

	return (
			<Box w='full' h="max" >
				{/* Texto y data */}
				<Flex flexDirection='row' align="center" justify="space-between" w="full" px='5' py='3'>
					<Flex flexDirection="row" align="center" justify="space-between" >
						<Heading>Kirbank</Heading>
					</Flex>
					<Flex flexDirection="row" align="center" justify="space-between"  >
						<Text mx='3' >Service</Text>
						<Text mx='3' >Product</Text>
						<Text mx='3' >About us</Text>
                    </Flex>
                    <Button colorScheme="green">Got to demo</Button>
				</Flex>

				{/* Contenido y tablas */}
				<Stack direction="column" mt={{ base: 8, lg: 12 }}>
					{/* Data analytics */}
					<Stack
						direction={{ base: "column", lg: "row" }}
						divider={<StackDivider borderColor="gray.200" />}
						spacing={0}
						align="stretch"
						w="full"
						rounded="md"
						overflow="hidden"
						h="full"
					>
						<Box p={3} bg="cyan.300" color="white" w="full">
							<Text mb={{ base: "0", lg: "3" }}>Value percentage total</Text>
							<Heading>%</Heading>
						</Box>
						<Box p={3} bg="cyan.400" color="white" w="full">
							<Text mb={{ base: "0", lg: "3" }}>Profit value per year</Text>
							<Heading>$ </Heading>
						</Box>
						<Box p={3} bg="cyan.500" color="white" w="full">
							<Text mb={{ base: "0", lg: "3" }}>Final win value</Text>
							<Heading>$ </Heading>
						</Box>
					</Stack>
					<Box py={5} w="full">
						<Tag size="lg" variant="subtle" bg="cyan.600" color="white" py="3" w="full">
							<TagLabel as="b">My NFTs</TagLabel>
						</Tag>
					</Box>

					{/* LISTADO #2 */}
					<Wrap spacing='20px' justify='space-around'>
						{[...tokens].reverse().map((token: any, i: number) => {
							// Fecha del token
							let dateToken = new Date(parseInt(token.dateCreate, 10));
							// Imagen del token
							let imageToken ='https://i.ibb.co/wh5SLBg/Isotipo-Kirbank-fondo-azul.png'
							return (
								<WrapItem key={i}>
									<Card maxW={{ base: "sm", md: "xs", lg:'sm' }}  boxShadow="lg" variant="outline">
										<CardBody>
											<Image src={imageToken} alt="Kirbank NFT Token" borderRadius="lg" />
											<Stack mt="6" spacing="2">
												<Heading size="md">Kirbank Token #KBT</Heading>
												<Text noOfLines={1}>
													investment: <Badge colorScheme="green">$ {token.amount}</Badge>
												</Text>
												<Text noOfLines={1}>
													time: <Badge colorScheme="blue">{token.yearsSet} years</Badge>
												</Text>
												<Text noOfLines={1}>
													created: <Badge colorScheme="orange">{`${dateToken.getDate()}.${dateToken.getMonth() + 1}.${dateToken.getFullYear()}`}</Badge>
												</Text>
												<Text noOfLines={1}>
													percentage:{" "}
												</Text>
											</Stack>
										</CardBody>
										<Divider />
										<CardFooter>
											<ButtonGroup spacing="2">
												<Popover
													// initialFocusRef={initialFocusRef}
													placement="bottom"
												>
													<PopoverTrigger>
														<Button variant="solid" colorScheme="blue">
															Share
														</Button>
													</PopoverTrigger>
													<PopoverContent color="white" bg="blue.800" borderColor="blue.800">
														<PopoverHeader pt={4} fontWeight="bold" border="0">
															Share Your NFT
														</PopoverHeader>
														<PopoverArrow />
														<PopoverCloseButton />
														<PopoverBody>Share your NFT the different platforms</PopoverBody>
														<PopoverFooter border="0" display="flex" alignItems="center" justifyContent="space-between" pb={4}>
															<Box fontSize="sm">Step 2 of 4</Box>
															<ButtonGroup size="sm">
																<Button colorScheme="green">Setup Email</Button>
															</ButtonGroup>
														</PopoverFooter>
													</PopoverContent>
												</Popover>

												<Button variant="ghost" colorScheme="blue" onClick={() => activeModal(token)}>
													Transfer
												</Button>
											</ButtonGroup>
										</CardFooter>
									</Card>
								</WrapItem>
							);
						})}
					</Wrap>
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
			</Box>
	);
}
