import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import TyreImg1 from "@/assets/TyreImg1.svg";
import Image from "next/image";
import Star from "@/assets/Star.svg";
import { useCart } from "@/context/context";
import { ProdFeats } from "@/types/types";

interface ProductListProps {
	selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
	const { addToCart, cartItems } = useCart();

	const [products, setProducts] = useState<ProdFeats[]>([]);
	const [hasDiscount, setHasDiscount] = useState(true);

	const handleAddToCart = (product: ProdFeats) => {
		const cartItem = { ...product, id: product.id.toString() };

		addToCart(cartItem);
	};

	const isInCart = (productId: string) => {
		return cartItems.some((item) => item.id === productId);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data, error } = await supabase
					.from(selectedCategory)
					.select("*");

				if (error) throw error;
				setProducts(data as ProdFeats[]);
			} catch (err) {
				console.error("Unexpected error:", err);
				setProducts([]);
			}
		};

		fetchProducts();
	}, [selectedCategory]);

	return (
		<div className="grid grid-cols-2 gap-6 grid-rows-6 w-full mt-6 mx-2 lg:grid-cols-3 lg:grid-rows-4">
			{products.map((product) => (
				<div
					key={product.id}
					className="flex flex-col items-center gap-5 ">
					<div className="flex justify-center items-center gap-2 h-60 w-full rounded-lg bg-[#f4f4f4] sm:w-56 ">
						<Image
							src={product.image_url}
							alt="Tyre"
							width={120}
							height={120}
							className="transition-transform duration-300 ease-in-out hover:scale-125"
						/>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 w-full">
						<p className="text-[#9d9ea2] text-center font-lexend font-light leading-5">
							{product.Brand}
						</p>
						<p className="text-[#1a1e26] font-lexend font-normal leading-7 text-center text-base">
							{product.BrandDescrpt}
						</p>
						<div className="flex h-7 py-1 px-3 justify-center items-center gap-3 rounded bg-[#f2f6f4]">
							<p className="text-[#05422c] font-lexend text-xs font-bold leading-5">
								{product.Year}
							</p>
						</div>
						<div className="flex items-start gap-2">
							<div className="flex h-8 py-1 px-[10px] justify-center items-center gap-3 rounded border border-[#f4f4f4]">
								<p className="text-[#1a1e26] font-lexend text-[12px] font-normal leading-5">
									{product.SizeTag}
								</p>
							</div>
							<div className="flex h-8 py-1 px-[10px] justify-center items-center gap-3 rounded border border-[#f4f4f4]">
								<p className="text-[#1a1e26] font-lexend text-[12px] font-normal leading-5">
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
									{product.Rating}/5
								</p>
							</div>
							<div className="w-[1px] h-[12px] bg-[#c8c9cb]"></div>
							<div className="flex items-center gap-1">
								<p className="text-[#060709] font-lexend text-xs font-normal leading-5">
									{product.NumOfReviews}
								</p>
								<p className="text-[#c8c9cb] font-lexend text-xs font-light leading-5">
									Reviews
								</p>
							</div>
						</div>
						{product.Discount ? (
							<div className="flex items-center gap-2 mx-auto">
								<p className="text-[#9d9ea2] font-lexend text-sm font-normal leading-5 line-through">
									${product.Price}
								</p>
								<p className="text-[#eb2606] font-lexend text-sm font-normal leading-5">
									${product.Discount}
								</p>
							</div>
						) : (
							<p className="text-[#eb2606] font-lexend text-sm leading-5 mx-auto">
								{product.Price}
							</p>
						)}
						<button
							onClick={() => handleAddToCart(product)}
							className="flex w-36 h-10 px-6 justify-center items-center gap-2 self-stretch rounded-[100px] bg-[#17af26] mx-auto">
							<p className="text-[#fff] font-lexend text-xs font-medium leading-5">
								{isInCart(product.id.toString())
									? "Added to Cart"
									: "Add to cart"}
							</p>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductList;
