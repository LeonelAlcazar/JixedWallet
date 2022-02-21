import { Tooltip, Text } from "@chakra-ui/react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function UnconfirmedIcon() {
	return (
		<Tooltip label="You have unconfirmed balance">
			<Text display="inline" color="yellow.500" mr={4}>
				<FontAwesomeIcon icon={faClock} color="" />
			</Text>
		</Tooltip>
	);
}
