import axios from "axios";
import { config } from "../config";
const endpoint = `${config.API_ENDPOINT}/user`;

export async function RegisterUser(
	name: string,
	email: string,
	password: string
) {
	try {
		const response = await axios.post(`${endpoint}`, {
			name: name,
			email: email,
			password: password,
		});
		const user = response.data.body;
		return user;
	} catch (e) {
		throw e;
	}
}
