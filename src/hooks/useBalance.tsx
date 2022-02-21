import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { GetBalance } from "../actions/get-balance-action";
import { useAuth } from "../providers/AuthProvider";

export function useBalance() {
	const authContext = useAuth();
	const toast = useToast();

	const [balance, setBalance] = useState<number | null>(null);
	const [hasUnconfirmed, setHasUnconfirmed] = useState(false);

	useEffect(() => {
		if (authContext?.state.user) {
			GetBalance()
				.then((wallet: any) => {
					console.log("wallet", wallet);
					setBalance(
						wallet.confirmed_balance + wallet.unconfirmed_balance
					);
					if (wallet.unconfirmed_balance > 0) {
						setHasUnconfirmed(true);
					}
				})
				.catch((err: any) => {
					toast({
						title: "Error",
						description: err.message,
						status: "error",
						duration: 9000,
					});
					authContext?.state.LogOut();
				});
		}
	}, [authContext?.state.user]);

	const satoshiToBtcString = (satoshi: number) => {
		return (satoshi / 100000000).toFixed(8);
	};

	return {
		balance,
		hasUnconfirmed,
		satoshiToBtcString,
	};
}
