import React from "react";
import Image, { StaticImageData } from "next/image";
import Menu from "@/assets/Menu.svg";
import Logo from "@/assets/Logo.svg";
import Bag from "@/assets/Bag.svg";
import Search from "@/assets/Search.svg";
import Truck from "@/assets/Truck.svg";
import Time from "@/assets/Time.svg";
import Coin from "@/assets/Coin.svg";
import { useCart } from "@/context/context";
import Link from "next/link";

interface Header {
	id: number;
	imgSrc: StaticImageData;
	imgAlt: string;
	description: string[];
	descriptionBlock: string;
}

const headers: Header[] = [
	{
		id: 1,
		imgSrc: Truck,
		imgAlt: "Truck",
		description: ["Reliable", "Shipping"],
		descriptionBlock: "Reliable Shipping",
	},
	{
		id: 2,
		imgSrc: Time,
		imgAlt: "Time",
		description: ["You're Safe", "With Us"],
		descriptionBlock: "You're Safe With Us",
	},
	{
		id: 3,
		imgSrc: Coin,
		imgAlt: "Coin",
		description: ["Best Quality", "& Pricing"],
		descriptionBlock: "Best Quality & Pricing",
	},
];

const Header: React.FC = () => {
	const { cartItems, addToCart, removeFromCart, cartItemCount } = useCart();

	return (
		<>
			<div className="w-full flex py-4 px-6 justify-between items-center border-b border-[#f4f4f4]">
				<div className="flex items-center gap-3">
					<Image
						src={Menu}
						alt="Menu"
						width={24}
						height={24}
						className="cursor-pointer"
					/>

					<Image
						src={Logo}
						alt="logo"
						width={119}
						height={28}
						className="cursor-pointer"
					/>
				</div>

				<div className="hidden sm:flex items-start gap-2">
					<div className="flex py-1 px-5 items-center gap-2 flex-1 w-64 h-9 rounded-[100px] border">
						<input
							className="w-full text-[#c8c9cb] font-lexend font-normal leading-5 outline-none"
							placeholder="Search"
						/>
					</div>

					<div className="flex w-8 h-8 p-2 justify-center items-center gap-2 flex-shrink-0 rounded-full bg-[#17af26] cursor-pointer">
						<Image
							src={Search}
							width={16}
							height={16}
							alt="Search"
						/>
					</div>
				</div>

				<div className="flex justify-end items-center gap-4 relative">
					<div className="w-[1px] h-3 bg-[#C8C9CB]"></div>
					<Link href="/Cart">
						<Image
							src={Bag}
							alt="Bag"
							width={26}
							height={26}
							className="cursor-pointer"
						/>
						<div className="flex flex-col justify-center items-center gap-2 w-4 h-4 rounded-full bg-[#eb2606] absolute top-2 right-[-0.3rem]">
							<p className="text-[#fff] items-center font-lexend font-normal text-[8px] leading-3">
								{cartItemCount}
							</p>
						</div>
					</Link>
				</div>
			</div>

			<div className="flex justify-center w-full border-t border-[#f4f4f4] py-3 px-6 items-start gap-2 sm:h-10 ">
				<div className="flex py-1 px-5 items-center gap-2 flex-1 w-64 h-9 rounded-[100px] border sm:hidden">
					<input
						className="w-full text-[#c8c9cb] font-lexend font-normal leading-5 outline-none"
						placeholder="Search"
					/>
				</div>

				<div className="flex w-8 h-8 p-2 justify-center items-center gap-2 flex-shrink-0 rounded-full bg-[#17af26] cursor-pointer sm:hidden">
					<Image src={Search} width={16} height={16} alt="Search" />
				</div>
			</div>

			<div className="flex w-full py-4 px-6 items-start gap-5 bg-[#f2f6f4]">
				{headers.map((header) => (
					<React.Fragment key={header.id}>
						<div className="flex flex-col justify-center items-start gap-2 flex-1 flex-shrink-0 md:flex-row md:items-center">
							<div className="flex w-8 h-8 p-2 justify-center items-center gap-2 rounded-full bg-[#fff]">
								<Image
									src={header.imgSrc}
									alt={header.imgAlt}
									width={18}
									height={18}
								/>
							</div>

							<div className="font-lexend text-[#1a1e26] text-sm font-normal leading-5">
								{header.description.map((line, index) => (
									<span
										key={index}
										className={`block ${
											index === 0
												? "whitespace-nowrap sm:hidden"
												: "sm:hidden"
										}`}>
										{line}
									</span>
								))}
								<div className="hidden sm:block text-[#1a1e26] text-sm">
									{header.descriptionBlock}
								</div>
							</div>
						</div>

						{/* Divider */}
						{header.id < headers.length && (
							<div className="w-[1px] h-6 flex-shrink-0 bg-[#C3D2CC] md:h-6"></div>
						)}
					</React.Fragment>
				))}
			</div>
		</>
	);
};

export default Header;
