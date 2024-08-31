import React from "react";
import Image from "next/image";
import Circle from "@/assets/Circle.svg";
import TyreImg1 from "@/assets/TyreImg1.svg";
import Star from "@/assets/Star.svg";
import { FetchProducts as fetchSupabaseProducts } from "./TopSelling";
import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { ProdFeats } from "@/types/types";

const ProdCategories = [
	{
		id: 1,
		Product: "Tyres",
		NumAvailable: 15,
	},

	{
		id: 2,

		Product: "Brakes",
		NumAvailable: 40,
	},

	{
		id: 3,

		Product: "Suspension",
		NumAvailable: 20,
	},

	{
		id: 4,

		Product: "Engines",
		NumAvailable: 24,
	},

	{
		id: 5,

		Product: "Interior",
		NumAvailable: 28,
	},

	{
		id: 6,

		Product: "Electrical",
		NumAvailable: 24,
	},

	{
		id: 7,

		Product: "Steering",
		NumAvailable: 12,
	},

	{
		id: 8,

		Product: "Exhaust",
		NumAvailable: 10,
	},

	{
		id: 9,

		Product: "Drive Train",
		NumAvailable: 8,
	},

	{
		id: 10,

		Product: "Exterior",
		NumAvailable: 24,
	},
];

interface Paragraphs {
	[key: string]: string;
}

const paragraphs: Paragraphs[] = [
	{
		Tyres: "Choosing the right tyres is crucial for vehicle performance, safety, and comfort. Our online store offers a comprehensive selection of high-quality tyres from top brands such as Michelin, Bridgestone, Goodyear, Continental, Pirelli, and more. Whether you drive a sedan, SUV, or sports car, we have the perfect tyres to suit your specific needs and preferences. Our tyre inventory includes options for various driving conditions and requirements. From all-season tyres that offer reliable performance year-round to high-performance tyres designed for superior grip and handling, we have it all. We also offer eco-friendly tyres with low rolling resistance for improved fuel efficiency and reduced environmental impact.",
	},

	{
		Brakes: "Ensuring optimal braking performance is vital for your safety and driving experience. At our store, we offer a wide range of high-quality brake components, including pads, rotors, and calipers, from trusted brands like Brembo, EBC, Akebono, and Bosch. Our selection caters to various vehicle types, from everyday commuters to high-performance sports cars. Whether you need standard replacements or upgraded performance brakes for better stopping power and reduced brake fade, we have the perfect solutions. Choose from options designed for quiet operation, extended durability, or enhanced heat dissipation to suit your driving style and vehicle demands.",
	},
	{
		Suspension:
			"A well-maintained suspension system is essential for a smooth and controlled driving experience. Our extensive collection of suspension components includes shocks, struts, springs, and control arms from leading manufacturers such as Monroe, KYB, Bilstein, and Rancho. Whether you're looking to replace worn-out parts or upgrade for improved handling and ride comfort, our products are designed to enhance your vehicle's performance. From factory replacements to performance-oriented upgrades, we offer solutions to meet your driving needs and ensure a stable, comfortable ride on any road.",
	},
	{
		Engines:
			"The engine is the heart of your vehicle, and maintaining its performance is crucial for reliability and efficiency. Our online store features a wide range of high-quality engine parts, including filters, spark plugs, belts, and gaskets from top brands like Bosch, NGK, Gates, and Mahle. Whether you're performing routine maintenance or tackling a major repair, our selection ensures you get the best parts for your engine. From performance enhancements to everyday replacements, our products help keep your engine running smoothly and efficiently, ensuring a dependable driving experience.",
	},
	{
		Interior:
			"Enhancing your vehicle's interior can transform your driving experience into something extraordinary. Explore our selection of premium interior accessories, including custom-fit floor mats, seat covers, and ergonomic steering wheels from top brands like WeatherTech, Covercraft, and Husky Liners. Our products are designed to improve comfort, add a touch of style, and protect your vehicle's interior from wear and tear. Whether you're looking to upgrade your car’s aesthetics or add practical features, our high-quality accessories offer both functionality and elegance for a personalized driving environment.",
	},
	{
		Electrical:
			"Reliable electrical components are crucial for your vehicle's overall functionality and safety. Our store offers an extensive range of electrical parts, including batteries, alternators, starters, and fuses from renowned brands such as Optima, Bosch, Denso, and ACDelco. Whether you're dealing with a starting issue, charging problems, or need to replace worn-out electrical components, our selection ensures high performance and durability. Trust our products to keep your vehicle’s electrical system running smoothly, providing you with reliable power and performance for all your driving needs.",
	},
	{
		Steering:
			"Precision and control in steering are essential for a safe and enjoyable driving experience. Discover our wide range of steering components, including racks, pumps, and tie rods from trusted manufacturers like Moog, TRW, and Delphi. Our products cater to various vehicle types and driving styles, ensuring you find the right parts for your needs. Whether you're replacing worn components or upgrading for enhanced handling, our steering solutions are designed to provide reliable performance and smooth operation, making every turn and maneuver feel effortless.",
	},
	{
		Exhaust:
			"A high-performance exhaust system can significantly enhance your vehicle's power and sound. Our selection includes exhaust pipes, mufflers, and catalytic converters from leading brands such as MagnaFlow, Borla, and Flowmaster. Designed to improve exhaust flow, reduce engine strain, and deliver a distinctive sound, our products cater to both everyday drivers and performance enthusiasts. Whether you're looking to upgrade for better performance or simply replace worn-out components, our exhaust systems offer a blend of functionality and style for a superior driving experience.",
	},
	{
		"Drive Train":
			"The drive train is crucial for transferring power from your engine to the wheels effectively. Our store provides a comprehensive range of drive train components, including differentials, drive shafts, and axles from top brands like GKN, Dana, and Cardone. Whether you're replacing worn-out parts or upgrading for improved durability and performance, our products are designed to handle the demands of various driving conditions. Trust our high-quality drive train components to ensure smooth power delivery and reliable performance, keeping your vehicle running at its best.",
	},
	{
		Exterior:
			"The exterior of your vehicle not only defines its appearance but also protects it from the elements. Explore our selection of premium exterior accessories, including custom-fit covers, protective films, and stylish trim pieces from top brands like WeatherTech, 3M, and AVS. Our products are designed to enhance your vehicle’s look, provide added protection, and improve aerodynamics. Whether you're looking to upgrade your vehicle’s aesthetics or safeguard it from environmental damage, our exterior accessories offer both style and functionality for a standout look on the road.",
	},
];

// const ProdSelected: ProdFeats[] = [
// 	{
// 		id: 1,
// 		Brand: "Michelin",
// 		BrandDescrpt: "Michelin Primacy MXM4",
// 		Year: "2020 BMW 3 Series",
// 		SizeTag: "Tyre size",
// 		Size: "215/55R17",
// 		Rating: "4.6/5",
// 		NumOfReviews: 135,
// 		ReviewTag: "Reviews",
// 		Discount: "$100.00",
// 		Price: "$80.00",
// 		image_url: TyreImg1,
// 	},
// ];

type Category =
	| "Tyres"
	| "Brakes"
	| "Suspension"
	| "Engines"
	| "Interior"
	| "Electrical"
	| "Steering"
	| "Exhaust"
	| "Drive Train"
	| "Exterior";

const DesktopFilter = () => {
	const [selectedCategory, setSelectedCategory] = useState("Tyres");
	const [selectedParagraph, setSelectedParagraph] = useState("");
	const [products, setProducts] = useState<ProdFeats[]>([]);
	const [hasDiscount, setHasDiscount] = React.useState(true);

	useEffect(() => {
		const fetchAndSetProducts = async (Category: string) => {
			// Replace with your actual fetch function from Supabase
			const fetchedProducts = await fetchSupabaseProducts(
				selectedCategory
			);
			setProducts(fetchedProducts);
		};
		fetchAndSetProducts(selectedCategory);

		// Find the corresponding paragraph based on the selected category
		const paragraph = paragraphs.find((p) => p[selectedCategory]);
		if (paragraph) {
			setSelectedParagraph(
				paragraph[selectedCategory as keyof typeof paragraph] || ""
			);
		}
	}, [selectedCategory]);

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
	};

	return (
		<>
			<div className="hidden lg:flex items-start justify-center gap-20 mx-8 mt-6">
				{/* Filter */}
				<div className="flex pr-8 flex-col items-start gap-5 border-r border-[#f4f4f4]">
					<div
						className="flex pt-4 pb-6 items-start gap-2 border-b
                    border-[#f4f4f4] w-full">
						<p className="text-[#1a1e26] font-lexend text-lg font-normal leading-7">
							Filters
						</p>
					</div>

					<div className="flex pb-5 flex-col items-start gap-5 border-b-[#f4f4f4] w-40">
						<p className="text-[#5e5f60] font-lexend text-xs  font-light leading-5">
							PRODUCT CATEGORY
						</p>

						<ul className="flex flex-col items-start gap-3 w-40">
							{ProdCategories.map((ProdCategory) => (
								<li
									key={ProdCategory.id}
									onClick={() =>
										handleCategoryClick(
											ProdCategory.Product
										)
									}
									className="flex items-center gap-3 cursor-pointer">
									<span
										className={`flex w-5 h-5 flex-col justify-center items-center gap-2 rounded-[100px] border ${
											selectedCategory ===
											ProdCategory.Product
												? "bg-[#17af26]"
												: ""
										}`}>
										<Image
											src={Circle}
											alt="Circle"
											height={8}
											width={8}
										/>
									</span>

									<span className="text-[#46494f] font-lexend text-sm font-normal leading-5">
										{ProdCategory.Product}
									</span>

									<span className="w-[1px] h-3 bg-[#f4f4f4]"></span>

									<span className="text-[#9d9ea2] font-lexend text-sm font-light leading-5">
										{ProdCategory.NumAvailable}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col items-start justify-center gap-6 w-full">
					<div className="h-9 flex pb-6 justify-center items-center border-b border-[#f4f4f4] w-full mt-">
						<p className="text-[#1a1e26] font-lexend text-base font-normal leading-9">
							{selectedCategory}
						</p>
					</div>

					<div>
						<p className="text-[#5e5f60] font-lexend text-base font-normal leading-6">
							{selectedParagraph}
						</p>
					</div>

					<div className="flex flex-col items-start py-6 px-8 gap-6 rounded-2xl w-full">
						<p className="text-[#060709] font-lexend text-2xl font-medium leading-9">
							Top Selling
						</p>

						<div className="flex py-1 items-start gap-4 w-full">
							{products.map((product) => (
								<div
									key={product.id}
									className="flex flex-col items-start gap-5 w-full">
									<div className="flex justify-center items-center gap-2 h-60 w-full rounded-lg bg-[#f4f4f4]">
										<Image
											src={product.image_url}
											alt="Tyre"
											width={120}
											height={120}
										/>
									</div>
									<div className="flex flex-col justify-center items-center gap-2 w-full">
										<p className="text-[#9d9ea2] text-center font-lexend font-light leading-5">
											{product.Brand}
										</p>

										<p className="text-[#1a1e26] font-lexend text-lg font-normal leading-7 text-center">
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

										{hasDiscount ? (
											<div className="flex items-center gap-2 mx-auto">
												<p className="text-[#9d9ea2] font-lexend text-sm font-normal leading-5 line-through">
													{product.Discount}
												</p>
												<p className="text-[#eb2606] font-lexend text-sm font-normal leading-5">
													{product.Price}
												</p>
											</div>
										) : (
											<p className="text-[#eb2606] font-lexend text-sm leading-5 mx-auto">
												{product.Price}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					<ProductList selectedCategory={selectedCategory} />
				</div>
			</div>
		</>
	);
};

export default DesktopFilter;
