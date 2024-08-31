import React, { useState, useEffect } from "react";
import MobileFilter from "./MobileFilter";
import TopSelling from "./TopSelling";
import { ProdFeats } from "@/types/types";
import { FetchProducts } from "./TopSelling";

const ProductPage: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("Tyres");
	const [products, setProducts] = useState<ProdFeats[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const fetchedProducts = await FetchProducts(selectedCategory);
			setProducts(fetchedProducts);
		};

		fetchData();
	}, [selectedCategory]);

	return (
		<>
			<div className="lg:hidden">
				<MobileFilter setSelectedCategory={setSelectedCategory} />
				<TopSelling
					selectedCategory={selectedCategory}
					products={products}
				/>
			</div>
		</>
	);
};

export default ProductPage;
