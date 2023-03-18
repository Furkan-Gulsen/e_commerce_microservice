import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const ConnectDB = async () => {
	const DB_URL = 'mongodb+srv://furkangulsen:BzVoEyLU2pwQEevU@systemdesign.vav4zsk.mongodb.net/mic_product_service?retryWrites=true&w=majority';

	try {
		await mongoose.connect(DB_URL);
	} catch (error) {
		console.log('MongoDB Error: ', error);
	}
};

export { ConnectDB };
