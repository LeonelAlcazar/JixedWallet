import axios from "axios";
import Cookies from "js-cookie";
import { config } from "../config";
const endpoint = `${config.API_ENDPOINT}/wallet/send`;

export async function SendTransaction(address: string, amount: number) {
	try {
		const token = Cookies.get("sessionToken");
		const response = await axios.post(
			`${endpoint}`,
			{
				address: address,
				amount: amount,
				fee: 170,
			},
			{
				headers: { authorization: `BEARER ${token}` },
			}
		);
		const tx = response.data.body;
		return tx;
	} catch (e) {
		throw e;
	}
}
