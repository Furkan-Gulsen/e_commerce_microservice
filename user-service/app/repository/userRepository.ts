import { DBClient } from '../utility/databaseClient';
import { UserModel } from '../models/UserModel';

export class UserRepository {
	constructor() {}

	async createAccount({ email, password, salt, phone, userType }: UserModel) {
		const client = await DBClient();
		await client.connect();

		const queryString = 'INSERT INTO users (email, password, salt, phone, user_type) VALUES ($1, $2, $3, $4, $5)';
		const values = [email, password, salt, phone, userType];
		const result = await client.query(queryString, values);
		await client.end();
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
	}
}
