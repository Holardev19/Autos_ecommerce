"use client";
import React from "react";
import Image from "next/image";
import Menu from "@/assets/Menu.svg";
import Logo from "@/assets/Logo.svg";
import Search from "@/assets/Search.svg";
import NewBag from "@/assets/NewBag.svg";
import Wallet from "@/assets/Wallet.svg";
import Ticket from "@/assets/Ticket.svg";
import BackLeft from "@/assets/BackLeft.svg";
import Link from "next/link";
import { useCart } from "@/context/context";
import CloseCircle from "@/assets/CloseCircle.svg";
import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { useState, useEffect } from "react";
import Transaction from "@/assets/Transaction.svg";
import BoxTime from "@/assets/BoxTime.svg";
import TruckTime from "@/assets/TruckTime.svg";
import MasterCard from "@/assets/MasterCard.svg";
import Visa from "@/assets/Visa.svg";
import Bitcoin from "@/assets/Bitcoin.svg";
import Interac from "@/assets/Interac.svg";
import { useCheckout } from "@/context/CheckoutContext";

const Checkout = () => {
	const {
		addToCart,
		cartItems,
		cartItemCount,
		handleSubtract,
		removeFromCart,
	} = useCart(); // Retrieve cart items using the useCart hook

	const {
		subtotal,
		setSubtotal,
		discount,
		setDiscount,
		shippingCost,
		setShippingCost,
		total,
		setTotal,
	} = useCheckout();

	const [couponCode, setCouponCode] = useState("");
	const [message, setMessage] = useState("");
	const [isCouponApplied, setIsCouponApplied] = useState(false);

	console.log("Cart Items:", cartItems); // Debugging line

	useEffect(() => {
		const newSubtotal = cartItems.reduce(
			(acc, item) => acc + item.quantity * item.Price,
			0
		);
		setSubtotal(newSubtotal);
	}, [cartItems, setSubtotal]);

	useEffect(() => {
		if (subtotal >= 200) {
			setShippingCost(0);
		} else {
			setShippingCost(10);
		}
	}, [setShippingCost, subtotal]);

	const handleAdd = (id: string) => {
		const item = cartItems.find((item) => item.id === id);
		if (item) {
			addToCart(item);
		}
	};

	const handleRemove = (id: string) => {
		removeFromCart(id);
	};

	const handleApplyCoupon = () => {
		// Example coupon code validation
		if (couponCode === "RABBIT30") {
			const calculatedDiscount = subtotal * 0.3; // Calculate 30% of the subtotal

			setDiscount(calculatedDiscount); // Apply discount
			setMessage("Coupon applied successfully!");
			setIsCouponApplied(true);
			setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
		} else {
			setMessage("Invalid coupon code. Please try again.");
			setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
		}
	};

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
				<div className="flex justify-center items-center gap-2">
					<div className="flex w-8 h-8 justify-center items-center gap-2 rounded-[100px] bg-[#05422c]">
						<Image src={NewBag} alt="Bag" width={14} height={14} />
					</div>

					<p className="text-[#060709] font-lexend text-sm font-medium leading-5">
						Shopping Cart
					</p>
				</div>

				<div className="w-[39.5px] h-[1px] bg-[#c3d2cc] sm:w-[8rem]"></div>

				<div className="flex w-8 h-8 justify-center items-center gap-2 rounded-[100px] bg-[#fff]">
					<Image src={Wallet} alt="Wallet" width={14} height={14} />
				</div>

				<div className="w-[39.5px] h-[1px] bg-[#c3d2cc] sm:w-[8rem]"></div>

				<div className="flex w-8 h-8 justify-center items-center gap-2 rounded-[100px] bg-[#fff]">
					<Image src={Ticket} alt="Ticket" width={14} height={14} />
				</div>
			</div>

			{/* Main body layout */}
			<div className="flex w-full p-6 flex-col items-start gap-8 lg:flex-row lg:justify-center lg:items-start lg:py-8 lg:px-[135px] lg:gap-16 lg:w-full">
				<div className="w-full flex flex-col items-start gap-6 self-stretch">
					<div className="flex pb-4 justify-between items-center self-stretch border-b">
						<div className="flex w-[220.5px] items-center gap-3">
							<Link href="/">
								<Image
									src={BackLeft}
									alt="Left"
									width={24}
									height={24}
								/>
							</Link>

							<p className="text-[#060709] font-lexend text-[20px] font-normal leading-8">
								Your Cart
							</p>
						</div>

						<p className="text-[#9d9ea2] font-lexend text-sm font-light leading-5">
							&#40;{cartItemCount}&#41;
						</p>
					</div>

					{/* Cart items and Total */}
					<div className="flex flex-col items-end gap-4 justify-center w-full  ">
						{cartItems.length > 0 ? (
							cartItems.map((item) => (
								<div
									key={item.id}
									className="flex pb-4 items-start gap-4 self-stretch border-b border-[#f4f4f4] w-full justify-center">
									<div className="flex w-14 h-14 justify-center items-center gap-2 rounded-md border border-[#f4f4f4] bg-[#fff]">
										<Image
											src={item.image_url}
											alt="product_image"
											width={40}
											height={40}
										/>
									</div>

									<div className="flex items-center gap-6 self-stretch w-full justify-between">
										<div className="flex flex-col items-start gap-2 flex-1 flex-shrink-0">
											<p className="text-[#1a1e26] font-lexend text-sm font-medium leading-5">
												{item.BrandDescrpt}
											</p>

											<div className="flex w-full items-center gap-3">
												<div
													className="border cursor-pointer rounded"
													onClick={() =>
														handleSubtract(item.id)
													}>
													<GrFormSubtract
														size={15}
														color="#5e5f60"
													/>
												</div>

												<p className="text-[#9d9ea2] font-lexend text-sm font-light leading-5">
													{item.quantity}x
												</p>

												<p className="text-[#5e5f60] font-lexend text-sm font-normal leading-5">
													${item.Price.toFixed(2)}
												</p>

												<div
													className="border cursor-pointer rounded"
													onClick={() =>
														handleAdd(item.id)
													}>
													<IoIosAdd
														size={15}
														color="#5e5f60"
													/>
												</div>
											</div>
										</div>

										<div className="flex w-20 flex-col justify-between items-end self-stretch">
											<div
												className="flex w-6 h-6 justify-center items-center"
												onClick={() =>
													handleRemove(item.id)
												}>
												<Image
													src={CloseCircle}
													alt="Remove"
													width={24}
													height={24}
													className="cursor-pointer"
												/>
											</div>

											<p className="text-[#060709] text-right font-lexend text-sm font-normal leading-5">
												$
												{(
													item.Price * item.quantity
												).toFixed(2)}
											</p>
										</div>
									</div>
								</div>
							))
						) : (
							<p className="text-black">Your cart is empty.</p>
						)}
						<div className="flex pb-4 pl-20 justify-between items-center self-stretch border-b border-[#f4f4f4] w-full mx-auto">
							<p className="text-[#060709] font-lexend text-sm font-normal leading-5">
								TOTAL
							</p>

							<p className="text-[#eb2606] font-lexend text-[20px]  font-medium leading-8">
								${subtotal}
							</p>
						</div>
					</div>

					{/* Promotional section */}
					<div className="flex pt-6 flex-col items-start gap-5 self-stretch border-t border-[#f4f4f4] w-full justify-center">
						<div className="flex flex-col items-start gap-4 self-stretch">
							<p className="text-[#17af26] font-lexend text-base font-normal leading-6">
								Delivery
							</p>

							<div className="flex p-4 flex-col items-start gap-4 self-stretch rounded-xl border-[#f4f4f4] border bg-[#fff]">
								<div className="flex w-12 h-12 justify-center items-center gap-2 rounded-full bg-[#f2f6f4]">
									<Image
										src={Transaction}
										width={22}
										height={22}
										alt="Transaction"
									/>
								</div>

								<p className="text-[#1a1e26] font-lexend text-base font-medium leading-6 self-stretch">
									Order by 10pm for free next day delivery on
									Orders overs $100
								</p>

								<p className="text-[#5e5f60] font-lexend text-sm font-normal leading-5">
									We deliver Monday to Saturday - excluding
									Holidays
								</p>
							</div>

							<div className="flex p-4 flex-col items-start gap-4 self-stretch rounded-xl border-[#f4f4f4] border bg-[#fff]">
								<div className="flex w-12 h-12 justify-center items-center gap-2 rounded-full bg-[#f2f6f4]">
									<Image
										src={BoxTime}
										width={22}
										height={22}
										alt="Transaction"
									/>
								</div>

								<p className="text-[#1a1e26] font-lexend text-base font-medium leading-6 self-stretch">
									Free next day delivery to stores.
								</p>

								<p className="text-[#5e5f60] font-lexend text-sm font-normal leading-5">
									Home delivery is $4.99 for orders under $100
									and is FREE for all orders over $100
								</p>
							</div>
						</div>

						<div className="flex flex-col items-start gap-4 self-stretch">
							<p className="text-[#17af26] font-lexend text-base font-normal leading-6">
								Free Returns
							</p>

							<div className="flex p-4 flex-col items-start gap-4 self-stretch rounded-xl border-[#f4f4f4] border bg-[#fff]">
								<div className="flex w-12 h-12 justify-center items-center gap-2 rounded-full bg-[#f2f6f4]">
									<Image
										src={TruckTime}
										width={22}
										height={22}
										alt="Transaction"
									/>
								</div>

								<p className="text-[#5e5f60] font-lexend text-sm font-normal leading-5">
									30 days to return it to us for a refund. We
									have made returns SO EASY - you can now
									return your order to a store or send it with
									FedEx FOR FREE
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Payment Checkout */}
				<div className="flex p-5 flex-col items-start gap-5 self-stretch rounded-2xl border border-[#f4f4f4]">
					<div className="flex flex-col items-start gap-4 self-stretch">
						<div className="flex justify-between items-center self-stretch">
							<p className="text-[#9d9ea2] font-lexend text-sm font-normal leading-5">
								Subtotal
							</p>

							<p className="text-[#060709] font-lexend text-sm font-normal leading-5">
								${subtotal.toFixed(2)}
							</p>
						</div>

						<div className="flex justify-between items-center self-stretch">
							<p className="text-[#9d9ea2] font-lexend text-sm font-normal leading-5">
								Discount
							</p>

							<p className="text-[#060709] font-lexend text-sm font-normal leading-5">
								${discount.toFixed(2)}
							</p>
						</div>

						<div className="flex justify-between items-center self-stretch">
							<p className="text-[#9d9ea2] font-lexend text-sm font-normal leading-5">
								Shipping Costs
							</p>

							<p className="text-[#060709] font-lexend text-sm font-normal leading-5">
								${shippingCost.toFixed(2)}
							</p>
						</div>

						<div className="flex justify-between items-center self-stretch">
							<p className="text-[#060709] font-lexend text-sm font-bold leading-5">
								TOTAL
							</p>

							<p className="text-[#060709] font-lexend text-sm font-normal leading-5">
								${sumtotal.toFixed(2)}
							</p>
						</div>
					</div>

					<div className="flex items-start gap-4 self-stretch">
						<div className="flex h-12 py-1 px-4 items-center gap-2 flex-1 flex-shrink-0 rounded-lg border border-[#f4f4f4] bg-[#fff]">
							<input
								type="text"
								placeholder="Enter coupon code"
								className="text-[#c8c9cb] font-lexend text-sm font-normal leading-5 outline-none w-24 sm:w-full"
								value={couponCode}
								onChange={(e) => setCouponCode(e.target.value)}
								disabled={isCouponApplied} // Disable input if coupon is applied
							/>
						</div>

						<button
							onClick={handleApplyCoupon}
							className={`flex h-12 py-2 px-5 justify-center items-center gap-2 rounded-[100px] bg-[#f3fbf4] ${
								isCouponApplied
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}>
							<p className="text-[#17af26] font-lexend text-sm font-normal leading-5">
								Apply Coupon
							</p>
						</button>
						{message && (
							<p
								className={`text-sm ${
									message.includes("successfully")
										? "text-green-500"
										: "text-red-500"
								}`}>
								{message}
							</p>
						)}
					</div>

					<div className="flex flex-col pt-4 items-start gap-4 self-stretch border-t border-[#f4f4f4]">
						{/* Progress bar */}
						<div className="flex h-2 flex-col items-start gap-2 self-stretch rounded-[100px] bg-[#f4f4f4] w-full">
							<div className="w-64 flex-1 flex-shrink-0 rounded-[100px] bg-[#17af26] sm:w-96"></div>
						</div>

						{/* Promo shipping discount */}
						<div className="flex flex-col items-start gap-2 self-stretch">
							<p className="text-[#5e5f60] font-lexend text-base font-normal leading-5">
								Get &nbsp;
								<span className="text-[#1a1e26] font-lexend text-base font-medium leading-5">
									Free Shipping &nbsp;
								</span>
								for orders over &nbsp;
								<span className="text-[#eb2606] font-lexend text-base font-normal leading-5">
									$100.00
								</span>
							</p>

							<Link href="/">
								<p className="text-[#1a1e26] font-lexend text-base font-medium leading-5 underline">
									Continue Shopping
								</p>
							</Link>
						</div>

						{/* Checkout Button */}

						<Link
							href="/Checkout"
							className="flex h-12 px-10 justify-center items-center gap-4 self-stretch rounded-[100px] bg-[#17af26]">
							<button>
								<p className="text-[#fff] font-lexend text-base font-semibold leading-5">
									Checkout
								</p>
							</button>
						</Link>

						<div className="w-72 h-[1px] bg-[#f4f4f4] sm:w-full"></div>

						<div className="flex flex-col items-start gap-4 justify-center w-full sm:items-center">
							<p className="text-[#5e5f60] font-lexend text-xs font-light leading-5">
								SECURE PAYMENTS PROVIDED BY
							</p>

							<div className="flex items-start gap-3">
								<div className="flex w-14 h-8 flex-col justify-center items-center gap-2 rounded-md border border-[#f4f4f4] bg-[#fff]">
									<Image
										src={MasterCard}
										width={30}
										height={18}
										alt="Master card"
									/>
								</div>

								<div className="flex w-14 h-8 flex-col justify-center items-center gap-2 rounded-md border border-[#f4f4f4] bg-[#fff]">
									<Image
										src={Visa}
										width={30}
										height={18}
										alt="Master card"
									/>
								</div>

								<div className="flex w-14 h-8 flex-col justify-center items-center gap-2 rounded-md border border-[#f4f4f4] bg-[#fff]">
									<Image
										src={Bitcoin}
										width={20}
										height={20}
										alt="Master card"
									/>
								</div>

								<div className="flex w-14 h-8 flex-col justify-center items-center gap-2 rounded-md border border-[#f4f4f4] bg-[#fff]">
									<Image
										src={Interac}
										width={20}
										height={20}
										alt="Master card"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Checkout;
