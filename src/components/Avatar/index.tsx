import { Box, Text } from "@chakra-ui/react";

export function Avatar(props: {
	size: number | string | (number | string)[];
	name?: string;
}) {
	return (
		<Box
			w={props.size}
			h={props.size}
			bg="black"
			borderRadius={"100%"}
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Text color="white" textAlign="center">
				{props.name?.charAt(0)}
			</Text>
		</Box>
	);
}
