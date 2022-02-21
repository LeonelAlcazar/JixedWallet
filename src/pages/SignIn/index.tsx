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

const ERROR_CODES: { [key: string]: string } = {
	user_doesnt_exist: "User doesn't exist",
	incorrect_password: "Incorrect password",
	internal: "Internal error",
	bad_request: "Bad request",
};

export function SignIn() {
	const authContext = useAuth();
	const navigate = useNavigate();
	const toast = useToast();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submit");

		setLoading(true);
		setError(null);

		console.log("ctx", authContext);

		authContext?.state
			.Authenticate(email, password)
			.then((user: any) => {
				console.log("user", user);
				setLoading(false);
				setError(null);
				toast({
					title: "Success",
					description: "You have successfully signed in",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "top-right",
				});
				navigate("/dashboard");
			})
			.catch((err: any) => {
				console.log(err);
				setError(ERROR_CODES[err.body.code]);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Flex w="100%" h="100vh" flexDirection={"column"}>
			<Header />
			<Box flex={1} w={["90%", "70%", "50%"]} m={"auto"} mt={8}>
				<Heading>Sign In</Heading>
				<Divider my={2} />
				<Box paddingX={[4, 8]} mt={4}>
					<form onSubmit={handleSubmit}>
						<VStack spacing={4}>
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
								<FormHelperText>
									Forgot your password?{" "}
									<Link to="/">Reset</Link>
								</FormHelperText>
							</FormControl>
							<FormControl>
								<Button
									type="submit"
									w="100%"
									isLoading={loading}
								>
									Go
								</Button>
								<FormHelperText>
									Dont have an account?{" "}
									<Link to="/signup">Sign up</Link>
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
