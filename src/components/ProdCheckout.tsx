import React from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "@/assets/Search.svg";
import Menu from "@/assets/Menu.svg";
import Logo from "@/assets/Logo.svg";
import NewBag from "@/assets/NewBag.svg";
import Wallet from "@/assets/Wallet.svg";
import Ticket from "@/assets/Ticket.svg";
import Tick from "@/assets/Tick.svg";
import NewWallet from "@/assets/NewWallet.svg";
import BackLeft from "@/assets/BackLeft.svg";
import UserForm from "@/components/userForm";
import { useCart } from "@/context/context";
import { useCheckout } from "@/context/CheckoutContext";

const ProdCheckout = () => {
	const {
		addToCart,
		cartItems,
		cartItemCount,
		handleSubtract,
		removeFromCart,
		total,
	} = useCart();

	const {
		subtotal,
		setSubtotal,
		discount,
		setDiscount,
		shippingCost,
		setShippingCost,
		setTotal,
	} = useCheckout();

	const sumtotal = subtotal - discount + shippingCost;

	return (
		<>
			<div>
				<div className="bg-[#05422c] w-full h-[18px]"></div>

				<div className="mt-[14px] flex items-start py-3 px-6 gap-6 border-b border-[#f4f4f4] justify-between w-full">
					<div className="flex items-center gap-3">
						<Image src={Menu} alt="Menu" width={24} height={24} />
						<Image src={Logo} alt="Logo" width={119} height={28} />
					</div>

					<div className=" px-6 items-start gap-2  hidden sm:flex justify-end">
						<div className="flex h-9 py-1 px-5 items-center gap-2 flex-1 flex-shrink-0 rounded-[100px] border">
							<input
								type="text"
								placeholder="Search"
								className="flex-1 flex-shrink-0 text-[#c8c9cb] font-lexend text-sm font-normal leading-5 outline-none"
							/>
						</div>

						<div className="flex w-9 h-9 p-2 justify-center items-center gap-2 flex-shrink-0 rounded-[100px] bg-[#17af26] ">
							<Image
								src={Search}
								alt="Search"
								width={16}
								height={16}
							/>
						</div>
					</div>
				</div>

				<div className="py-3 px-6 flex items-start gap-2 border-b border-[#f4f4f4]">
					<div className="flex h-9 py-1 px-5 items-center gap-2 flex-1 flex-shrink-0 rounded-[100px] border sm:hidden">
						<input
							type="text"
							placeholder="Search"
							className="flex-1 flex-shrink-0 text-[#c8c9cb] font-lexend text-sm font-normal leading-5 outline-none"
						/>
					</div>

					<div className="flex w-9 h-9 p-2 justify-center items-center gap-2 flex-shrink-0 rounded-[100px] bg-[#17af26] sm:hidden">
						<Image
							src={Search}
							alt="Search"
							width={16}
							height={16}
						/>
					</div>
				</div>
			</div>

			<div className="flex w-full py-4 px-6 gap-4 bg-[#f4f4f4] justify-center items-center">
				<div className="flex w-8 h-8 justify-center items-center gap-2 rounded-[100px] bg-[#c3d2cc]">
					<Image src={Tick} alt="Bag" width={14} height={14} />
				</div>

				<div className="w-[39.5px] h-[1px] bg-[#c3d2cc] sm:w-[8rem]"></div>

				<div className="flex justify-center items-center gap-2">
					<div className="flex w-8 h-8 justify-center items-center gap-2 rounded-[100px] bg-[#05422c]">
						<Image
							src={NewWallet}
							alt="Bag"
							width={14}
							height={14}
						/>
					</div>

					<p className="text-[#060709] font-lexend text-sm font-medium leading-5">
						Checkout{" "}
					</p>
				</div>

				<div className="w-[39.5px] h-[1px] bg-[#c3d2cc] sm:w-[8rem]"></div>

				<div className="flex w-8 h-8 justify-center items-center gap-2 rounded-[100px] bg-[#fff]">
					<Image src={Ticket} alt="Ticket" width={14} height={14} />
				</div>
			</div>

			{/* Main Body (Form and Payment) */}
			<div className="flex p-6 flex-col items-start gap-10">
				<div className="flex flex-col items-start gap-5 self-stretch">
					<div className="flex pb-4 justify-between items-center self-stretch border-b">
						<div className="flex w-[220.5px] items-center gap-3">
							<Link href="/Cart">
								<Image
									src={BackLeft}
									alt="Left"
									width={24}
									height={24}
								/>
							</Link>

							<p className="text-[#060709] font-lexend text-[20px] font-normal leading-8">
								Shipping
							</p>
						</div>

						<p className="text-[#9d9ea2] font-lexend text-sm font-light leading-5">
							&#40;{cartItemCount}&#41;
						</p>
					</div>

					{/* Form */}
					<UserForm />
				</div>

				<Link
					href="/Success"
					className="flex h-14 px-10 justify-center items-center gap-4 self-stretch rounded-[100px] bg-[#17af26]">
					<button type="submit">
						<p className="text-[#fff] font-lexend text-base font-medium leading-6">
							Place Order
						</p>
					</button>
				</Link>
			</div>
		</>
	);
};

export default ProdCheckout;
