import React, { useState, useEffect } from "react";

import {
	Box,
	Heading,
	useToast,
	Text,
	Tooltip,
	HStack,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Divider,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { DashboardHeader } from "../../components/DashboardHeader";
import { useBalance } from "../../hooks/useBalance";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { SendTransaction } from "../../actions/send-transaction-action";
import { Header } from "../../components/Header";

export function Send() {
	const authContext = useAuth();
	const { balance, hasUnconfirmed, satoshiToBtcString } = useBalance();

	const [satoshis, setSatoshis] = useState(0);
	const [loading, setLoading] = useState(false);
	const [address, setAddreess] = useState("");

	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (address.length === 0 || address === "" || satoshis < 560) {
			toast({
				title: "Error",
				description: "Please enter a valid address and amount",
				status: "error",
				duration: 9000,
				isClosable: true,
				position: "top-right",
			});
			return;
		}

		setLoading(true);
		SendTransaction(address, satoshis)
			.then((tx: any) => {
				toast({
					title: "Success",
					description: "Transaction sent",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "top-right",
				});
				setAddreess("");
				setSatoshis(0);
				navigate("/dashboard");
			})
			.catch((err: any) => {
				toast({
					title: "Error",
					description: err.response.data.data.tx_hex,
					status: "error",
					duration: 9000,
					isClosable: true,
					position: "top-right",
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

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
				<form onSubmit={handleSubmit}>
					<Heading as="h1" size="lg" mb={4}>
						Send Bitcoin
						<Divider />
					</Heading>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						gap={4}
					>
						<FormControl>
							<FormLabel htmlFor="address">Address to</FormLabel>
							<Input
								id="address"
								value={address}
								onChange={(e) => {
									setAddreess(e.currentTarget.value);
								}}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Satoshis to send</FormLabel>
							<NumberInput
								value={satoshis}
								onChange={(e) => {
									let value = parseInt(e);
									if (e === "") {
										value = 0;
									}
									if (value < 0) {
										value = 0;
									}

									setSatoshis(value);
								}}
							>
								<NumberInputField
									color={
										satoshis > (balance ? balance : 0)
											? "red"
											: "white"
									}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							<FormHelperText>
								{satoshiToBtcString(satoshis)} BTC
							</FormHelperText>
						</FormControl>
						<Button
							type="submit"
							w="100%"
							isLoading={loading}
							isDisabled={satoshis > (balance ? balance : 0)}
						>
							Send
						</Button>
					</Box>
				</form>
			</Box>
		</>
	);
}
