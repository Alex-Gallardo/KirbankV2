import { Box, Container, Divider, Flex, Heading, SimpleGrid, Spacer, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useState, useEffect } from "react";

export default function Footer() {
	const router = useRouter();
	return (
		<Container minWidth="full" h="auto" p={4} borderTop={"2px"} borderColor="gray.200">
			<Flex flexDirection="row" justify="space-between" align="center" width="full" px={5}>
				<Text color="gray.300">© Kirbank 2023 all rights reserved</Text>
				<Flex justify="space-between" align="center" px={{ sm: "0", md: "1", lg: "5" }}>
					<Box p="2" bg="red.400">
						Red conectada
					</Box>
					<Spacer />
					<Box p="2" bg="green.400">
						Wallet conectada
					</Box>
				</Flex>
			</Flex>
		</Container>
	);
}
