import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Text,
	FormControl,
	FormLabel,
	Divider,
	Input,
	VStack,
	FormHelperText,
	Alert,
	AlertIcon,
	useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { useAuth } from "../../providers/AuthProvider";
import { RegisterUser } from "../../actions/register-user-action";

const ERROR_CODES: { [key: string]: string } = {
	internal: "Internal error",
	bad_request: "Bad request",
	email_in_use: "Email already in use",
};

export function SignUp() {
	const authContext = useAuth();
	const navigate = useNavigate();
	const toast = useToast();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submit");

		setLoading(true);
		setError(null);

		RegisterUser(name, email, password)
			.then((user) => {
				console.log("user", user);
				setError(null);
				toast({
					title: "Registration Successful",
					description: "You have successfully registered",
					status: "success",
					duration: 9000,
				});
				navigate("/signin");
			})
			.catch((error) => {
				console.log("error", error);
				if (error.code !== "validation_failed") {
					setError(error.message);
				} else {
					setError(ERROR_CODES[error.code]);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Flex w="100%" h="100vh" flexDirection={"column"}>
			<Header />
			<Box flex={1} w={["90%", "70%", "50%"]} m={"auto"} mt={8}>
				<Heading>Sign Up</Heading>
				<Divider my={2} />
				<Box paddingX={[4, 8]} mt={4}>
					<form onSubmit={handleSubmit}>
						<VStack spacing={4}>
							<FormControl>
								<FormLabel htmlFor="name">Name</FormLabel>
								<Input
									type="name"
									id="name"
									value={name}
									onChange={(e) => {
										setName(e.currentTarget.value);
									}}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									type="email"
									id="email"
									value={email}
									onChange={(e) => {
										setEmail(e.currentTarget.value);
									}}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="password">
									Password
								</FormLabel>
								<Input
									type="password"
									id="password"
									value={password}
									onChange={(e) => {
										setPassword(e.currentTarget.value);
									}}
								/>
							</FormControl>
							<FormControl>
								<Button
									type="submit"
									w="100%"
									isLoading={loading}
								>
									Register
								</Button>
								<FormHelperText>
									Do you have an account?{" "}
									<Link to="/signin">Sign in</Link>
								</FormHelperText>
							</FormControl>
							{error && (
								<Alert status="error">
									<AlertIcon />
									{error}
								</Alert>
							)}
						</VStack>
					</form>
				</Box>
			</Box>
		</Flex>
	);
}
