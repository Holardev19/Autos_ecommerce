// src/components/TopSelling.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TyreImg1 from "@/assets/TyreImg1.svg";
import TyreImg2 from "@/assets/TyreImg2.svg";
import TyreImg3 from "@/assets/TyreImg3.svg";
import Star from "@/assets/Star.svg";
import ArrowLeft from "@/assets/ArrowLeft.svg";
import ArrowRight from "@/assets/ArrowRight.svg";
import { supabase } from "@/lib/supabaseClient";
import ProductList from "./ProductList";
import { useCart } from "@/context/context";
import { ProdFeats } from "@/types/types";

interface SelectedProductProps {
	products: ProdFeats[];
}

export const FetchProducts = async (category: string): Promise<ProdFeats[]> => {
	try {
		// Log the start of the function and any potential API calls
		console.log(`Fetching ${category} products from Supabase...`);

		const { data, error } = await supabase
			.from(category)
			.select("*")
			// .eq("Category", category)
			.limit(3);

		// Log the raw data and error response
		console.log("Data:", data);
		console.log("Error:", error);

		if (error) throw error;
		return data as ProdFeats[];
	} catch (err) {
		console.error("Unexpected error:", err);
		return [];
	}
};

export const Top: React.FC = () => (
	<div className="mt-16 mx-6 mb-6">
		<p className="text-[#060709] font-lexend text-lg font-medium leading-7">
			Top Selling
		</p>
	</div>
);

export const SelectedProduct: React.FC<SelectedProductProps> = ({
	products = [],
}) => {
	const { cartItems, addToCart, removeFromCart, cartItemCount } = useCart();

	const [hasDiscount, setHasDiscount] = React.useState(true);
	const [error, setError] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleAddToCart = (product: ProdFeats) => {
		const cartItem = { ...product, id: product.id.toString() }; // Convert id to string
		addToCart(cartItem);
	};

	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="relative w-full overflow-hidden bg-[#fff] p-4">
			{products.length === 0 ? (
				<p className="text-[black]">No products available</p>
			) : (
				<React.Fragment>
					<button
						onClick={scrollLeft}
						className="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-[#fff] shadow-md absolute left-5 top-56 sm:hidden">
						<Image
							src={ArrowLeft}
							width={20}
							height={20}
							alt="Arrow Left"
						/>
					</button>
					<button
						onClick={scrollRight}
						className="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-[#fff] shadow-md absolute right-5 top-56 sm:hidden">
						<Image
							src={ArrowRight}
							width={20}
							height={20}
							alt="Arrow Right"
						/>
					</button>
					<div
						className="w-full flex items-center justify-between gap-4 overflow-x-hidden whitespace-nowrap no-scrollbar"
						ref={containerRef}>
						{products.map((product) => (
							<div
								key={product.id}
								className="flex w-40 flex-col items-start justify-center gap-3 bg-[#fff] sm:w-60 md:w-64">
								<div className="flex items-center justify-center h-40 w-40 gap-2 bg-[#f4f4f4] mx-auto rounded-lg md:w-full">
									<Image
										src={product.image_url}
										alt={product.Brand}
										width={100}
										height={100}
									/>
								</div>
								<p className="text-[#9d9ea2] text-center font-lexend text-xs font-normal leading-5 w-full">
									{product.Brand}
								</p>
								<p
									className={`text-[#1a1e26] text-center font-lexend text-sm font-normal leading-6 w-40 whitespace-pre-wrap mx-auto`}>
									{product.BrandDescrpt}
								</p>
								<div className="flex h-7 px-3 pt-1 pb-1 bg-[#f2f6f4] items-center justify-center mx-auto rounded-md">
									<p className="text-[#05422c] font-lexend text-xs font-bold leading-5">
										{product.Year}
									</p>
								</div>
								<div className="flex items-start gap-2 text-[#1a1e26] mx-auto">
									<div className="flex h-7 py-1 px-2 justify-center items-center gap-3 rounded border border-[rgb(244,244,244)] bg-[#fff]">
										<p className="text-[#1a1e26] font-lexend text-xs font-normal leading-5">
											{product.SizeTag}
										</p>
									</div>
									<div className="flex h-7 py-1 px-2 justify-center items-center gap-3 rounded border border-[rgb(244,244,244)] bg-[#fff]">
										<p className="text-[#1a1e26] font-lexend text-xs font-normal leading-5">
											{product.Size}
										</p>
									</div>
								</div>
								<div className="flex justify-center items-center gap-2 rounded-[100px] bg-[#fff] mx-auto">
									<div className="flex items-center gap-1">
										<Image
											src={Star}
											alt="star"
											width={10}
											height={10}
										/>
										<p className="text-[#060709] font-lexend text-xs font-normal leading-5">
											{product.Rating}
										</p>
									</div>
									<div className="w-[1px] h-[12px] bg-[#c8c9cb]"></div>
									<div className="flex items-center gap-1">
										<p className="text-[#060709] font-lexend text-xs font-normal leading-5">
											{product.NumOfReviews}
										</p>
										<p className="text-[#c8c9cb] font-lexend text-xs font-light leading-5">
											{product.ReviewTag}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

interface TopSellingProps {
	selectedCategory: string;
	products: ProdFeats[];
}

const TopSelling: React.FC<TopSellingProps> = ({
	selectedCategory,
	products,
}) => {
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (products.length === 0) {
			setError("No Products available");
		} else {
			setError(null); // Clear error if products exist
		}
	}, [products]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<Top />
			<SelectedProduct products={products} />
			<ProductList selectedCategory={selectedCategory} />
		</>
	);
};

export default TopSelling;
