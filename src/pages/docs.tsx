import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container, Heading, Text, Flex } from "@chakra-ui/react";

import Nav from "@/layouts/nav/nav";

export default function DocsIndex() {
	// ESTADOS

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Flex direction='column' minWidth="full" maxWidth="container.xl" h="max-content" my={12} >
				<Container maxW={{ base: "container.sm", md: 'container.md', lg: "container.xl" }} mb={5}>
					<Heading size='xl' mb='6'>Kirbank Docs</Heading>
					<Heading size='lg'>Policies:</Heading>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Use of the application:</Text> The use of this application is intended solely for the creation of NFTs on the blockchain. Any other use is prohibited and will not be the responsibility of the application.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Intellectual Property:</Text> All intellectual property rights, including, but not limited to, the software, designs, graphics, images and any content related to the application, are the exclusive property of the application and are protected by intellectual property laws.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Use of the blockchain:</Text> The use of the blockchain is the responsibility of the user and the application is not responsible for any damage or loss of funds as a result of its use. It is strongly recommended that users conduct research and assess the associated risks before using the blockchain.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Disclosure of information:</Text> The application will not disclose user information to third parties, except when required by law or by a court.
					</Text>
					<Heading size='lg' mt='6'>Privacy:</Heading>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Information Collected:</Text> The App may collect personal user information such as name, email, and wallet address for registration and authentication purposes.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Use of information:</Text> The information collected will be used solely for registration and authentication purposes, and to contact the user in case of any problem with the account.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Protection of information:</Text> The application will take measures to protect user information from loss, misuse or unauthorized access.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>User rights:</Text> The user has the right to access, modify or delete their personal information at any time.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }} color='gray.600'>
						<Text as='b'>Privacy Policy Changes:</Text> The App reserves the right to update or change its privacy policy at any time. Users will be notified via email or in-app notification of any privacy policy changes.
					</Text>
				</Container>

				<Container maxW={{ base: "container.sm", md: 'container.md', lg: "container.xl" }} mt={5} h='max-content'>
					<Heading size='lg'>Frequent questions</Heading>	
				</Container>

				<Container maxW={{ base: "container.sm", md: 'container.md', lg: "container.xl" }} mt={10} h='max-content'>
					<Accordion allowToggle>
						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940', borderColor: '#DBF227' }}>
								<Box as="span" flex='1' textAlign='left'>
									How can I create my own NFT?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								To create your own NFT, the first thing you need to do is sign up to our platform and follow the on-screen instructions to add details like amount, cryptocurrency, investment years, and other customization options before turning it into an NFT. Once it has been uploaded, it will be published on the blockchain.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									How can I make sure my NFT is authentic and unique?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								Every NFT created on our platform is recorded on the blockchain, ensuring that it is authentic and unique. Blockchain technology is known for its high security and transparency, which means that your NFT will always be protected and verified.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									What happens if I lose my NFT?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								Unlike physical documents, NFTs cannot be physically lost, as they are recorded on the blockchain. However, if you lose access to your cryptocurrency wallet or the private keys needed to access your NFT, you may lose access to your NFT. Therefore, it is important to keep your private keys safe and always make backup copies of your wallets.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									What benefits do I have as an NFT owner?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								As the owner of an NFT, you have sole ownership of that digital certificate and can prove its authenticity. You can also sell it on the secondary market through our platform or any other NFT market, allowing you to earn a profit on your investment.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									Can I sell my NFT on other platforms?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								Yes, you can sell your NFT on any other NFT marketplace. However, please note that our platform offers a safe and reliable marketplace for buying and selling NFTs. We also have a community of collectors and investors who share similar interests and may be interested in your NFT.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									What is the cost of creating an NFT on your platform?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								The cost of creating an NFT on our platform varies depending on how many customization options you want to add. We offer customization options such as amount, cryptocurrency, investment years, and other configuration options so you can customize your NFT to your liking.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									How can I receive payments for the sale of my NFT?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								On our platform, payments are made in cryptocurrencies. Once you sell your NFT, the payment is deposited into your cryptocurrency wallet registered on our platform. You can transfer your cryptocurrencies to other wallets or convert them to fiat if you wish.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									How can I promote my NFT on your platform?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								On our platform, we offer tools to promote your NFT through our community of collectors and investors. You can add your NFT to our featured discoveries list, post to our news and events feed, and share your NFT on your social media and other marketing channels.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									Can I add more details to my NFT after creating it?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								Once you have created and published your NFT on our platform, you will not be able to change the data of the original digital certificate. However, you can update the description, win amount, and other customization details at any time.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
							<AccordionButton _expanded={{ bg: '#DBF227', color: '#042940' }}>
								<Box as="span" flex='1' textAlign='left'>
									How long does it take to create an NFT?
								</Box>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								The time to create an NFT varies depending on the number of customization options you want to add and the file size of your digital certificate. Typically, the process of uploading and setting up an NFT on our platform takes just a few minutes. Once it has been registered on the blockchain, your NFT will be available for buying and selling.
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</Container>
			</Flex>
		</Nav>
	);
}
