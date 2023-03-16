import { AddressModel } from './AddressModel';

export interface UserModel {
	user_id?: number;
	email: string;
	password: string;
	phone: string;
	salt: string;
	userType: 'BUYER' | 'SELLER';
	verification_code?: number;
	first_name?: string;
	last_name?: string;
	profile_pic?: string;
	expiry?: string;
	address?: AddressModel[];
}
