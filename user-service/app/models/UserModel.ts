export interface UserModel {
	user_id?: string;
	email: string;
	password: string;
	phone: string;
	salt: string;
	userType: 'BUYER' | 'SELLER';
}
