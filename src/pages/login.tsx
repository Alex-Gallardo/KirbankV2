import { Box, Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";

import Link from "next/link";
import WalletButton from "@/components/wallet-buttton/wallet-button";

const LoginIndex = () => {
	return (
		<Stack direction={{ base: "column", lg: "row" }} justify="stretch" w="100vw" h="100vh">
			<Box w={{ base: "100vw", md: "100%", lg: "30%" }} h={{ base: "40%", md: "40%", lg: "100%" }}>
				<div className="background-pattern" style={{ width: "100%", height: "100%" }}></div>
			</Box>
			<VStack w="full" h="full" align="flex-start" justify={{ base: "start", lg: "center" }} px={10} py={5} spacing={4}>
				<Heading>Kirbank NFT</Heading>
				<Text>1 KBTK = $1.24</Text>
				<Text>
					Join us and become part of the excitement of creating a unique and valuable NFT! We mint an NFT with an exclusive design and an opportunity to generate recurring income.
					Dont miss this opportunity to own a unique and valuable digital asset! Secure your NFT now!
				</Text>
				<WalletButton></WalletButton>
				{/* <Button background="#DBF227">
					<Link href="/">Connect your wallet</Link>
				</Button> */}
			</VStack>
		</Stack>
	);
};

export default LoginIndex;
