import { Avatar, Box, Button, Container, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Select, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { getDataFromCollection, getFromCollection, upDataFromCollection } from "@/utils/firebase/DB";
import { useContext, useEffect, useState } from "react";

import { Inter } from "@next/font/google";
import Nav from "@/layouts/nav/nav";
import UserContext from "@/context/UserContext/UserContext";
import { UserSchema } from "@/schemas/UserSchema";
import WalletButton from "@/components/wallet-buttton/wallet-button";
import { googleLogin } from "@/utils/firebase/Auth";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
	// ESTADOS
	const [image, setImage] = useState<string>("https://i.ibb.co/wh5SLBg/Isotipo-Kirbank-fondo-azul.png");
	const [saving, setSaving] = useState<boolean>(false);
	const [dataUser, setDataUser] = useState<UserSchema>({
		_id: '',
		name: '',
		lastName: '',
		displayName: '',
		authMode: '',
		mail: '',
		phone: '',
		tokens: [],
	})

	// CONTEXT
	const userContext = useContext(UserContext);
	const { user, wallet, upWallet, upUser, upNFT }: { user: null | UserSchema, wallet: string, upWallet: any, upUser: any, upNFT: any } = userContext;

	// Cambios input
	const handleChange = (event: any, op: string) => {
		let valor: any = 0;
		valor = event.target.value;
		// if(valor == "") valor = 0
		let bkInfo = { ...dataUser.bankInfo }

		console.log("Campos de entrada :)", valor, op);
		switch (op) {
			case "name":
				setDataUser({ ...dataUser, name: valor })
				break;
			case "lastName":
				setDataUser({ ...dataUser, lastName: valor })
				break;
			case "phone":
				setDataUser({ ...dataUser, phone: valor })
				break;
			case "bank":
				bkInfo.bank = valor
				setDataUser({ ...dataUser, bankInfo: bkInfo })
				break;
			case "accountNumber":
				bkInfo.accountNumber = valor
				setDataUser({ ...dataUser, bankInfo: bkInfo })
				break;
			case "typeAccount":
				bkInfo.typeAccount = valor
				setDataUser({ ...dataUser, bankInfo: bkInfo })
				break;
			default:
				setDataUser({ ...dataUser })
				break
		}
	};

	// CAMBIOS EN EL SELECT
	const handleChangeSelect = (event: any) => {
		const val = event.target.value;

		let bkInfo = { ...dataUser.bankInfo }
		switch (val) {
			case "MTR": // Monetaria
				bkInfo.typeAccount = val
				setDataUser({ ...dataUser, bankInfo: bkInfo })
				break;
			case "AHR": // Ahorro
				bkInfo.typeAccount = val
				setDataUser({ ...dataUser, bankInfo: bkInfo })
				break;
			default:
				setDataUser({ ...dataUser, bankInfo: bkInfo })
				break;
		}
	};

	// Ingresar con Google
	const singInGoogle = async () => {
		let res = await googleLogin();
		if (res != undefined) {
			// Obtenemos/actualizamos el usuario
			let user: any = await getFromCollection(res.user.uid, 'users')
			if(user){
				
				upUser(user);
				setDataUser(user)
				setImage(user.photoURL || "");

				// Obtenemos/actualizamos los tokens
				let tokens = await getDataFromCollection('tokens', 'owner', "==", res.user.uid)
				upNFT(tokens)
			}
			// Si todo esta OK, redireccionamos
			// router.push("/home");
		}
		console.log("Obtenemos login:", res);
	};

	// Guardar y actualizar
	const saveUpdatedData = async () => {
		setSaving(true)
		let data = dataUser
		await upDataFromCollection(data, data._id, 'users')
		setSaving(false)
	}

	useEffect(() => {
		console.log("User encontrado context-Profile.tsx:", user);
		// @ts-ignore
		if (!!user) {
			setDataUser(user)
			// @ts-ignore
			setImage(user.photoURL || "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Nav>
			<Box minWidth="full" maxWidth="container.xl" h="max" my={{ base: 8, md: 12 }}>
				{/* Texto y data */}
				<Flex flexDirection={{ base: "column", sm: "column", md: "column", lg: "row" }} align="center" justify="center" w="full">
					<Flex>
						<Avatar size="full" width={{ base: "120px" }} name="Alex Gallardo" src={image}></Avatar>
					</Flex>
					<Box mx="10" textAlign={{ base: 'center', lg: 'start' }}>
						<Heading>{dataUser.displayName || 'No user'}</Heading>
						<Text>{dataUser.mail || 'No mail'}</Text>
					</Box>
				</Flex>

				{/* BODY - CONTAINER */}
				{!!user ?
					<Container mt={12}>
						<VStack divider={<StackDivider borderColor="gray.400" />} spacing={5} align="stretch" w={{ base: "full" }} mt={{ base: 3, lg: 0 }} rounded="lg" overflow="hidden">
							<VStack p="2">
								{/* DATOS BASICOS */}

								{/* NOMBRE */}
								<Flex w="full" justify="start">
									<Text>Name:</Text>
								</Flex>
								<InputGroup>
									<Input value={dataUser.name || ''} placeholder="" type="text" onChange={(e) => handleChange(e, "name")} />
								</InputGroup>

								{/* APELLIDOS */}
								<Flex w="full" justify="start">
									<Text>Last name:</Text>
								</Flex>
								<InputGroup>
									<Input value={dataUser.lastName || ''} placeholder="" type="text" onChange={(e) => handleChange(e, "lastName")} />
								</InputGroup>

								{/* EMAIL */}
								<Flex w="full" justify="start">
									<Text>Mail:</Text>
								</Flex>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
										@
									</InputLeftElement>
									{/* onChange={(e)=>handleChange(e, 'ammount')} */}
									<Input value={dataUser.mail || ""} placeholder="@gmail.com" type="text" onChange={(e) => handleChange(e, "mail")} />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>

								{/* PHONE */}
								<Flex w="full" justify="start">
									<Text>Phone number:</Text>
								</Flex>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
										#
									</InputLeftElement>
									{/* onChange={(e)=>handleChange(e, 'ammount')} */}
									<Input value={dataUser.phone || ""} placeholder="502 4455 6600" type="text" onChange={(e) => handleChange(e, "phone")} />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
								<Divider pt="4" />
								{/* ---------------------------------------------------------------------------------------------------------------------------- */}
								{/* DATOS DE CUENTA */}
								{/* NO CUENTA */}
								{/* BANCO */}
								<Flex w="full" justify="start" pt="3">
									<Text>Bank:</Text>
								</Flex>
								<InputGroup>
									{/* <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >$</InputLeftElement> */}
									{/* onChange={(e)=>handleChange(e, 'ammount')} */}
									<Input value={dataUser.bankInfo?.bank || ""} placeholder="Industrial..." type="text" onChange={(e) => handleChange(e, "bank")} />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
								{/* NO CUENTA */}
								<Flex w="full" justify="start">
									<Text>Account number:</Text>
								</Flex>
								<InputGroup>
									{/* <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" >$</InputLeftElement> */}
									<Input value={dataUser.bankInfo?.accountNumber || ""} placeholder="GB33BU...555" type="text" onChange={(e) => handleChange(e, "accountNumber")} />
									{/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
								</InputGroup>
								{/* CUENTA */}
								<Flex w="full" justify="start">
									<Text>Type account:</Text>
								</Flex>
								<Stack
									direction={{ base: "column", md: "row" }}
									divider={<StackDivider display={{ base: "none", md: "flex" }} borderColor="gray.400" />}
									spacing={0}
									align="center"
									w="full"
									overflow="hidden"
								>
									<Select value={dataUser.bankInfo?.typeAccount} pr={{ base: "0", md: "2" }} color="gray.500" flex={{ base: "1" }} onChange={(e) => handleChangeSelect(e)}>
										<option value="">None</option>
										<option value="MTR">Monetary</option>
										<option value="AHR">Saving</option>
									</Select>
								</Stack>
								<Divider pt="4" />
								{/* ---------------------------------------------------------------------------------------------------------------------------- */}
								{/* DATOS WALLET */}
								<Flex w="full" justify="start" pt="3">
									<Text>Wallet:</Text>
								</Flex>
								<Box w="full">
									<WalletButton></WalletButton>
								</Box>
								{/* ---------------------------------------------------------------------------------------------------------------------------- */}
								{/* GUARDAR CAMBIOS */}
								<Flex w="full" justify="start" mt="20px">
									<Button isLoading={saving} loadingText="Saving..." bg="blue.600" colorScheme="blue" variant="solid" color="white" spinnerPlacement="end" w="full" mt="30px" onClick={saveUpdatedData}>
										Save changes
									</Button>
								</Flex>
							</VStack>
						</VStack>
					</Container> : <Flex w="full" justify="center" align='center' mt="20px">
						<Button colorScheme="teal" variant="solid" w={{ base: "full", md: '500px' }} mt="30px" onClick={singInGoogle}>
							Login
						</Button>
					</Flex>}
			</Box>
		</Nav>
	);
}
