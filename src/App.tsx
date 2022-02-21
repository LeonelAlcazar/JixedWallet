import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { Dashboard } from "./pages/Dashboard";
import AuthProvider from "./providers/AuthProvider";
import { Receive } from "./pages/Receive";
import { Send } from "./pages/Send";
import { SignUp } from "./pages/SignUp";
import { ApiDocs } from "./pages/ApiDocs";

function App() {
	return (
		<ChakraProvider>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route
							path="/dashboard/receive"
							element={<Receive />}
						/>
						<Route path="/dashboard/send" element={<Send />} />
						<Route path="/api/docs/" element={<ApiDocs />} />
					</Routes>
				</Router>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default App;
