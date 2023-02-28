import { Button, Flex, Text } from "@chakra-ui/react";

import WalletButton from "@/components/wallet-buttton/wallet-button";

const Header = () => {
	return (
		<Flex flexDirection="row" align="center" justify="space-between" px={{ base: 5, md: 8, lg: 10 }} py={{base: 1, md:3}}>
			<Text fontSize={{base: 'sm', md: 'md'}}>1 KBTK = $1.24</Text>
			<WalletButton display={{ base: "none", lg: "flex" }}></WalletButton>
		</Flex>
	);
};

export default Header;
