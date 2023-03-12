import { DBClient } from '../utility/databaseClient';
import { UserModel } from '../models/UserModel';
import { DBOpreation } from './dbOperation';

export class UserRepository extends DBOpreation {
	constructor() {
		super();
	}

	async createAccount({ email, password, salt, phone, userType }: UserModel) {
		const queryString = 'INSERT INTO users (email, password, salt, phone, user_type) VALUES ($1, $2, $3, $4, $5)';
		const values = [email, password, salt, phone, userType];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
	}

	async findAccount(email: string) {
		const client = await DBClient();
		await client.connect();
		const queryString = 'SELECT user_id, email, password, phone, salt, verification_code, expiry FROM users WHERE email = $1';
		const values = [email];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount < 1) {
			throw new Error("user doen't exist with provided email id!");
		}
		return result.rows[0] as UserModel;
	}

	async updateVerificationCode(userId: string, code: number, expiry: Date) {
		const queryString = 'UPDATE users SET verification_code = $1, expiry = $2 WHERE user_id = $3 RETURNING *';
		const values = [code, expiry, userId];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
		throw new Error('User is already verified!');
	}

	async updateVerificationUser(userId: string) {
		const queryString = 'UPDATE users SET verified = TRUE WHERE user_id = $1 AND verified = FALSE RETURNING *';
		const values = [userId];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
		throw new Error('User is already verified!');
	}
}
