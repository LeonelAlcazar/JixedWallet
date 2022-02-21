import { Flex, Heading } from "@chakra-ui/react";
import { Header } from "../../components/Header";

export function ApiDocs() {
	return (
		<Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
			<Header position="fixed" top={0} left={0} right={0} />
			<Heading>Api docs in coming...</Heading>
		</Flex>
	);
}
