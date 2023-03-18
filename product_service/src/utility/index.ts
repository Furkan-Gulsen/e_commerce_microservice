import { ConnectDB } from './db-connection';

ConnectDB()
	.then(() => {
		console.log('DB Connected');
	})
	.catch((error) => {
		console.log('DB Connection Error: ', error);
	});
