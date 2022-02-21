import React, { Component, createContext, useEffect } from "react";
import { Login } from "../actions/login-action";
import Cookies from "js-cookie";
import { GetUser } from "../actions/get-user-action";

export const AuthContext = createContext<{
	state: any;
	dispatch: React.Dispatch<any>;
} | null>(null);
function AuthReducer(state: any, action: any) {
	switch (action.type) {
		case "set":
			return { ...state, ...action.newState };
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}
function AuthProvider(props: any) {
	const [state, dispatch] = React.useReducer(AuthReducer, {
		user: null,
		Authenticate,
		LogOut,
		Update,
	});
	const value = { state, dispatch };
	async function LogOut() {
		Cookies.remove("sessionToken");
		dispatch({ type: "set", newState: { user: null } });
	}

	async function Authenticate(email: string, password: string) {
		console.log("Auth");
		try {
			const token = await Login(email, password);
			Cookies.set("sessionToken", token);
			const user = await GetUser("me");
			dispatch({ type: "set", newState: { user: user } });
			return user;
		} catch (e) {
			throw e;
		}
	}

	function Update() {
		const token = Cookies.get("sessionToken");
		if (token) {
			GetUser("me")
				.then((user) => {
					dispatch({
						type: "set",
						newState: { user: user },
					});
				})
				.catch((e) => Cookies.remove("sessionToken"));
		}
	}

	useEffect(() => {
		const token = Cookies.get("sessionToken");
		if (token) {
			GetUser("me")
				.then((user) => {
					dispatch({
						type: "set",
						newState: { user: user },
					});
				})
				.catch((e) => Cookies.remove("sessionToken"));
		}
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
}
export function useAuth() {
	const context = React.useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within a NewToProvider");
	}

	return context;
}

export default AuthProvider;
