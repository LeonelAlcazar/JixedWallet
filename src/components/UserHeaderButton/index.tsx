import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { Avatar } from "../Avatar";
import { useNavigate } from "react-router-dom";

export function UserHeaderButton() {
	const authContext = useAuth();
	const navigate = useNavigate();

	const logout = () => {
		authContext?.state.LogOut();
		navigate("/");
	};
	return (
		<Flex justifyContent="center" alignItems="center" gap={2}>
			<Avatar size={12} name={authContext?.state.user?.name} />
			<Box>
				<Heading as="h4" size="sm">
					{authContext?.state.user?.name}
				</Heading>
				<Button variant="link" colorScheme={"red"} onClick={logout}>
					Logout
				</Button>
			</Box>
		</Flex>
	);
}
