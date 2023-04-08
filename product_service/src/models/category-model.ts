import mongoose from 'mongoose';

type CateogryModel = {
	name: string;
	nameTranslation: string;
	parentId: string;
	subCategories: CategoryDoc[];
	products: string[];
	displayOrder: number;
	imageUrl: string;
};

export type CategoryDoc = mongoose.Document & CateogryModel;

const categorySchema = new mongoose.Schema(
	{
		name: String,
		nameTranslation: { en: { type: String }, de: { type: String } },
		parentId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'categories',
		},
		subCategories: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'categories',
			},
		],
		products: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'products',
			},
		],
		displayOrder: { type: Number, default: 1 },
		imageUrl: String,
	},
	{
		toJSON: {
			transform: function (doc, ret, options) {
				delete ret.__v;
				delete ret.createdAt;
				delete ret.updatedAt;
			},
			timestamps: true,
		},
	},
);

const categories = mongoose.models.categories || mongoose.model<CategoryDoc>('categories', categorySchema);

export { categories };
