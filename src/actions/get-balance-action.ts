import axios from "axios";
import Cookies from "js-cookie";
import { config } from "../config";
const endpoint = `${config.API_ENDPOINT}/wallet/me`;
export async function GetBalance() {
	try {
		const token = Cookies.get("sessionToken");
		const response = await axios.get(`${endpoint}`, {
			headers: { authorization: `BEARER ${token}` },
		});
		const wallet = response.data.body;
		return wallet;
	} catch (e) {
		throw e;
	}
}
