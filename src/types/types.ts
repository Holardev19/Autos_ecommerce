// types.ts
export interface ProdFeats {
	id: number;
	created_at: Date;
	Brand: string;
	BrandDescrpt: string;
	Year: string;
	SizeTag: string;
	Size: string;
	Rating: string;
	NumOfReviews: number;
	ReviewTag: string;
	Discount?: number;
	Price: number;
	image_url: string;
	quantity: number;
}
