import { DBClient } from '../utility/databaseClient';
import { UserModel } from '../models/UserModel';
import { DBOpreation } from './dbOperation';
import { ProfileInput } from '../models/dto/AddressInput';
import { AddressModel } from '../models/AddressModel';

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

	async updateVerificationCode(userId: number, code: number, expiry: Date) {
		const queryString = 'UPDATE users SET verification_code = $1, expiry = $2 WHERE user_id = $3 RETURNING *';
		const values = [code, expiry, userId];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
		throw new Error('User is already verified!');
	}

	async updateVerificationUser(userId: number) {
		const queryString = 'UPDATE users SET verified = TRUE WHERE user_id = $1 AND verified = FALSE RETURNING *';
		const values = [userId];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
		throw new Error('User is already verified!');
	}

	async updateUser(user_id: number, firstName: string, lastName: string, userType: string) {
		const queryString = 'UPDATE users SET first_name=$1, last_name=$2, user_type=$3 WHERE user_id=$4 AND verified = FALSE RETURNING *';
		const values = [firstName, lastName, userType, 2];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
		throw new Error('Error while updating user!');
	}

	async createProfile(user_id: number, { firstName, lastName, userType, address: { addressLine1, addressLine2, city, postCode, country } }: ProfileInput) {
		await this.updateUser(user_id, firstName, lastName, userType);
		const queryString = 'INSERT INTO address(user_id, address_line1, address_line2, city, post_code, country) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
		const values = [user_id, addressLine1, addressLine2, city, postCode, country];
		const result = await this.executeQuery(queryString, values);
		if (result.rowCount > 0) {
			return result.rows[0] as UserModel;
		}
		throw new Error('Error while creating prfoile!');
	}

	async getUserProfile(user_id: number) {
		const profileQuery = 'SELECT first_name, last_name, email, phone, user_type, verified FROM users WHERE user_id = $1;';
		const profileValues = [user_id];

		const profileResult = await this.executeQuery(profileQuery, profileValues);
		if (profileResult.rowCount < 1) {
			throw new Error('Error while fetching profile!');
		}

		const userProfile = profileResult.rows[0] as UserModel;

		const addressQuery = 'SELECT id, address_line1, address_line2, city, post_code, country FROM address WHERE user_id = $1;';
		const addressValues = [user_id];
		const addressResult = await this.executeQuery(addressQuery, addressValues);
		if (addressResult.rowCount > 0) {
			userProfile.address = addressResult.rows[0] as AddressModel[];
		}

		return userProfile;
	}
}
