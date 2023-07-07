import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Stack,
    StackDivider,
    Text,
    VStack,
} from "@chakra-ui/react";

import { Inter } from "@next/font/google";
import Nav from "@/layouts/nav/nav";
import UserContext from "@/context/UserContext";
import WalletButton from "@/components/wallet-buttton/wallet-button";
import { useContext, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
	// ESTADOS
	const [image, setImage] = useState<string>("https://bit.ly/dan-abramov")

	// CONTEXT
	const userContext = useContext(UserContext);
	const { user, red, actualizarRed } = userContext;

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

	useEffect(()=>{``
		console.log('User encontrado context:', user)
		if(user != null) setImage(user!.photoURL)

	})

	return (
		<Nav>
			{console.log('+user', user?.photoURL)}
			<Box minWidth="full" maxWidth="container.xl" h="max" my={{base: 8, md:12}}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }} align="center" justify="center" w="full" >
					<Flex>
                        <Avatar size="full" width={{ base: "120px" }} name="Alex Gallardo" src={image}>
                        </Avatar>
                    </Flex>
                    <Box mx='10'>
						<Heading>{user?.displayName}</Heading>
						<Text>{user?.email}</Text>
					</Box>
				</Flex>
                
                {/* BODY - CONTAINER */}
				<Container mt={12}>
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
							{/* DATOS BASICOS */}
                            {/* NOMBRE */}
                            <Flex w='full' justify='start'>
                                <Text>Nombre completo:</Text>
                            </Flex>
							<InputGroup>
								{/* <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >$</InputLeftElement> */}
								{/* <Input value={user?.displayName} placeholder="" type='text' onChange={(e)=>handleChange(e, 'ammount')}/> */}
								<Input value={user?.displayName} placeholder="" type='text' />
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
                            {/* EMAIL */}
                            <Flex w='full' justify='start'>
                                <Text>Correo electronico:</Text>
                            </Flex>
							<InputGroup>
								<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >@</InputLeftElement>
								{/* onChange={(e)=>handleChange(e, 'ammount')} */}
								<Input value='gallardoalex069@gmail.com' placeholder="@gmail.com" type='text' />
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
							<Divider pt='4'/>
							{/* ---------------------------------------------------------------------------------------------------------------------------- */}
                            {/* DATOS DE CUENTA */}
                            {/* NO CUENTA */}
							{/* BANCO */}
                            <Flex w='full' justify='start' pt='3'>
                                <Text>Banco:</Text>
                            </Flex>
							<InputGroup>
								{/* <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >$</InputLeftElement> */}
								{/* onChange={(e)=>handleChange(e, 'ammount')} */}
								<Input placeholder="Industrial..." type='text' onChange={(e)=>handleChange(e, 'ammount')}/>
								{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
							</InputGroup>
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
								<Select value='ETH' pr={{base:'0', md: '2'}}  color="gray.500" flex={{base:'1'}} >
									<option value='ETH'>Monetaria</option>
									<option value='BTC'>Ahorro</option>
									{/* <option value='matic'>Polygon</option> */}
								</Select>
							</Stack>
							<Divider pt='4'/>
							{/* ---------------------------------------------------------------------------------------------------------------------------- */}
                            {/* DATOS WALLET */}
                            {/* NO CUENTA */}
                            <Flex w='full' justify='start' pt='3'>
                                <Text>Wallet:</Text>
                            </Flex>
							<Box w='full'>
								<WalletButton ></WalletButton>
							</Box>
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
				
			</Box>
		</Nav>
	);
}
