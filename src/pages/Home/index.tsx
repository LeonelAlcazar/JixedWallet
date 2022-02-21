import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Header } from "../../components/Header";

export function Home() {
	return (
		<Flex w="100%" h="100vh" flexDirection={"column"}>
			<Header />
			<Flex
				justifyContent="center"
				alignItems={"center"}
				flex={1}
				flexDirection="column"
				textAlign={"center"}
			>
				<Heading>jixed, the simple bitcoin wallet</Heading>
				<Text>Simple, fast and secure. Use jixed</Text>
			</Flex>
		</Flex>
	);
}
