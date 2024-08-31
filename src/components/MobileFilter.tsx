import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ArrowDown from "@/assets/ArrowDown.svg";

const options: string[] = [
	"Tyres",
	"Brakes",
	"Suspension",
	"Engines",
	"Interior",
	"Electrical",
	"Steering",
	"Exhaust",
	"Drive Train",
	"Exterior",
];

const paragraphs: Record<string, string> = {
	Tyres: "Choosing the right tyres is crucial for vehicle performance, safety, and comfort. Our online store offers a comprehensive selection of high-quality tyres from top brands such as Michelin, Bridgestone, Goodyear, Continental, Pirelli, and more. Whether you drive a sedan, SUV, or sports car, we have the perfect tyres to suit your specific needs and preferences. Our tyre inventory includes options for various driving conditions and requirements. From all-season tyres that offer reliable performance year-round to high-performance tyres designed for superior grip and handling, we have it all. We also offer eco-friendly tyres with low rolling resistance for improved fuel efficiency and reduced environmental impact.",
	Brakes: "Ensuring optimal braking performance is vital for your safety and driving experience. At our store, we offer a wide range of high-quality brake components, including pads, rotors, and calipers, from trusted brands like Brembo, EBC, Akebono, and Bosch. Our selection caters to various vehicle types, from everyday commuters to high-performance sports cars. Whether you need standard replacements or upgraded performance brakes for better stopping power and reduced brake fade, we have the perfect solutions. Choose from options designed for quiet operation, extended durability, or enhanced heat dissipation to suit your driving style and vehicle demands.",
	Suspension:
		"A well-maintained suspension system is essential for a smooth and controlled driving experience. Our extensive collection of suspension components includes shocks, struts, springs, and control arms from leading manufacturers such as Monroe, KYB, Bilstein, and Rancho. Whether you're looking to replace worn-out parts or upgrade for improved handling and ride comfort, our products are designed to enhance your vehicle's performance. From factory replacements to performance-oriented upgrades, we offer solutions to meet your driving needs and ensure a stable, comfortable ride on any road.",
	Engines:
		"The engine is the heart of your vehicle, and maintaining its performance is crucial for reliability and efficiency. Our online store features a wide range of high-quality engine parts, including filters, spark plugs, belts, and gaskets from top brands like Bosch, NGK, Gates, and Mahle. Whether you're performing routine maintenance or tackling a major repair, our selection ensures you get the best parts for your engine. From performance enhancements to everyday replacements, our products help keep your engine running smoothly and efficiently, ensuring a dependable driving experience.",
	Interior:
		"Enhancing your vehicle's interior can transform your driving experience into something extraordinary. Explore our selection of premium interior accessories, including custom-fit floor mats, seat covers, and ergonomic steering wheels from top brands like WeatherTech, Covercraft, and Husky Liners. Our products are designed to improve comfort, add a touch of style, and protect your vehicle's interior from wear and tear. Whether you're looking to upgrade your car’s aesthetics or add practical features, our high-quality accessories offer both functionality and elegance for a personalized driving environment.",
	Electrical:
		"Reliable electrical components are crucial for your vehicle's overall functionality and safety. Our store offers an extensive range of electrical parts, including batteries, alternators, starters, and fuses from renowned brands such as Optima, Bosch, Denso, and ACDelco. Whether you're dealing with a starting issue, charging problems, or need to replace worn-out electrical components, our selection ensures high performance and durability. Trust our products to keep your vehicle’s electrical system running smoothly, providing you with reliable power and performance for all your driving needs.",
	Steering:
		"Precision and control in steering are essential for a safe and enjoyable driving experience. Discover our wide range of steering components, including racks, pumps, and tie rods from trusted manufacturers like Moog, TRW, and Delphi. Our products cater to various vehicle types and driving styles, ensuring you find the right parts for your needs. Whether you're replacing worn components or upgrading for enhanced handling, our steering solutions are designed to provide reliable performance and smooth operation, making every turn and maneuver feel effortless.",
	Exhaust:
		"A high-performance exhaust system can significantly enhance your vehicle's power and sound. Our selection includes exhaust pipes, mufflers, and catalytic converters from leading brands such as MagnaFlow, Borla, and Flowmaster. Designed to improve exhaust flow, reduce engine strain, and deliver a distinctive sound, our products cater to both everyday drivers and performance enthusiasts. Whether you're looking to upgrade for better performance or simply replace worn-out components, our exhaust systems offer a blend of functionality and style for a superior driving experience.",
	"Drive Train":
		"The drive train is crucial for transferring power from your engine to the wheels effectively. Our store provides a comprehensive range of drive train components, including differentials, drive shafts, and axles from top brands like GKN, Dana, and Cardone. Whether you're replacing worn-out parts or upgrading for improved durability and performance, our products are designed to handle the demands of various driving conditions. Trust our high-quality drive train components to ensure smooth power delivery and reliable performance, keeping your vehicle running at its best.",
	Exterior:
		"The exterior of your vehicle not only defines its appearance but also protects it from the elements. Explore our selection of premium exterior accessories, including custom-fit covers, protective films, and stylish trim pieces from top brands like WeatherTech, 3M, and AVS. Our products are designed to enhance your vehicle’s look, provide added protection, and improve aerodynamics. Whether you're looking to upgrade your vehicle’s aesthetics or safeguard it from environmental damage, our exterior accessories offer both style and functionality for a standout look on the road.",
};

interface MobileFilterProps {
	setSelectedCategory: (category: string) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({ setSelectedCategory }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string>("Tyres");
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);
		setSelectedCategory(option);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.addEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			<div
				className="mt-4 flex items-center justify-between w-full px-6 pb-4 border-b
            border-[#f4f4f4]">
				<p className="text-[#1a1e26] font-lexend text-base font-normal leading-6">
					{selectedOption}
				</p>

				<div className="relative w-32" ref={dropdownRef}>
					<button
						className="flex h-9 w-36  justify-between items-center gap-2 rounded-[100px] border border-[#f4f4f4] bg-[#fff] cursor-pointer px-3"
						onClick={toggleDropdown}>
						<div className="text-[#1a1e26] font-lexend text-xs font-normal leading-5">
							Filter
						</div>

						<Image
							src={ArrowDown}
							alt="Arrow Down"
							className={`transition-transform duration-300 ${
								isOpen ? "rotate-180" : "rotate-0"
							}`}
						/>
					</button>

					{isOpen && (
						<ul className="absolute left-0 mt-2 w-36 bg-[#fff] border border-[#f4f4f4] rounded-md shadow-lg z-10">
							{options.map((option) => (
								<li
									key={option}
									onClick={() => handleSelectOption(option)}
									className="px-4 py-2 text-[#1a1e26] hover:bg-[#f4f4f4] cursor-pointer">
									{option}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="border-t border-[#f4f4f4]">
				<p className="mt-6 text-[#5e5f60] font-lexend text-base font-normal leading-5 mx-6">
					{paragraphs[selectedOption]}
				</p>
			</div>
		</>
	);
};

export default MobileFilter;
