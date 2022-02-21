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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { DashboardHeader } from "../../components/DashboardHeader";
import { useBalance } from "../../hooks/useBalance";
import QRCode from "react-qr-code";
import { Header } from "../../components/Header";

export function Receive() {
	const authContext = useAuth();
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
					<QRCode
						value={`bitcoin:${authContext?.state.user?.wallet?.address}`}
					/>
					<Text mt={4} fontWeight={"bold"}>
						{authContext?.state.user?.wallet?.address}
					</Text>
					<Box mt={16}>
						<Text>Receive money has no fee!</Text>
					</Box>
				</Box>
			</Box>
		</>
	);
}
