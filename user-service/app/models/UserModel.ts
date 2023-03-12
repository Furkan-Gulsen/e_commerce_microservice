export interface UserModel {
	user_id?: string;
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
}
