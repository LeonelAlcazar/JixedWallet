import React, { useState, useEffect } from "react";

import {
	Box,
	Heading,
	useToast,
	Text,
	Tooltip,
	HStack,
	Button,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/AuthProvider";
import { DashboardHeader } from "../../components/DashboardHeader";
import { useBalance } from "../../hooks/useBalance";
import { UnconfirmedIcon } from "../../components/UnconfirmedIcon";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

export function Dashboard() {
	const authContext = useAuth();
	const toast = useToast();
	const navigate = useNavigate();

	const { balance, hasUnconfirmed, satoshiToBtcString } = useBalance();

	return (
		<>
			<Header position="fixed" top={0} left={0} right={0} />
			<Box
				w="100%"
				h="100vh"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Heading>
						{hasUnconfirmed && <UnconfirmedIcon />}
						{balance !== null
							? satoshiToBtcString(balance)
							: "loading"}{" "}
						BTC
					</Heading>
					<HStack mt={4} w="100%">
						<Button
							w="100%"
							onClick={() => navigate("/dashboard/receive")}
						>
							Receive
						</Button>
						<Button
							w="100%"
							onClick={() => navigate("/dashboard/send")}
						>
							Send
						</Button>
					</HStack>
					{/*<Button variant="link" mt={4} textAlign="center">
						Transactions
						</Button>*/}
				</Box>
			</Box>
		</>
	);
}
