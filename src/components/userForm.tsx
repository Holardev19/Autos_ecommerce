"use client";
import React, { useState } from "react";
import Image from "next/image";
import ArrowDown from "@/assets/ArrowDown.svg";
import NewTick from "@/assets/NewTick.svg";

const UserForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [country, setCountry] = useState("Nigeria");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [province, setProvince] = useState("");
	const [postcode, setPostcode] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [orderNotes, setOrderNotes] = useState("");
	const [whereDidYouHear, setWhereDidYouHear] = useState("");

	const [errors, setErrors] = useState({});

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState("Nigeria");
	const [newAddress, setNewAddress] = useState(false);
	const [isStockDropdownOpen, setStockDropdownOpen] = useState(false);
	const [selectedOutOfStockOption, setSelectedOutOfStockOption] = useState(
		"Contact me (without delay)"
	);

	const countries = [
		"United States",
		"Canada",
		"United Kingdom",
		"Australia",
		"Nigeria",
	];

	const outOfStock = [
		"Contact me (without delay)",
		"Process my order when product is available",
		"Send me a mail",
	];

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const toggleOutOfStockDropdown = () => {
		setStockDropdownOpen(!isStockDropdownOpen);
	};

	const handleSelectedOutOfStockOption = (option: string) => {
		setSelectedOutOfStockOption(option);
		setStockDropdownOpen(false);
	};

	const handleNewAddress = () => {
		setNewAddress((prevState) => !prevState);
	};

	const handleCountrySelect = (country: string) => {
		setSelectedCountry(country);
		setIsDropdownOpen(false);
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!firstName) newErrors.firstName = "First name is required";
		if (!lastName) newErrors.lastName = "Last name is required";
		if (!country) newErrors.country = "Country is required";
		if (!state) newErrors.state = "State is required";
		if (!city) newErrors.city = "City is required";
		if (!province) newErrors.province = "Province is required";
		if (!postcode) newErrors.postcode = "Postcode is required";
		if (!email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			// Proceed with form submission (e.g., send data to an API)
			console.log("Form submitted successfully");
		}
	};
	return (
		<form
			onClick={handleSubmit}
			className="flex flex-col items-start gap-4 self-stretch">
			<div className="flex flex-col items-start gap-4 self-stretch">
				<div className="flex items-start gap-5 self-stretch">
					<div className="flex flex-col justify-center items-start gap-2 flex-1 flex-shrink-0 rounded-xl bg-[#fff]">
						<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
							First Name *
						</p>

						<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[#f4f4f4]">
							<input
								type="text"
								placeholder="John"
								className="flex-1 font-lexend text-sm font-normal leading-5 outline-none w-[14px]"
							/>
						</div>
					</div>

					<div className="flex flex-col justify-center items-start gap-2 flex-1 flex-shrink-0 rounded-xl bg-[#fff]">
						<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
							Last Name *
						</p>

						<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[#f4f4f4]">
							<input
								type="text"
								placeholder="Doe"
								className="flex-1 font-lexend text-sm font-normal leading-5 outline-none w-[14px]"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff] relative">
					<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
						Country / Region *
					</p>

					{/* Country select dropdown */}
					<div className="flex h-12 px-4 items-center justify-between gap-4 self-stretch rounded-lg border border-[#f4f4f4]">
						<p className="text-[#060709] font-lexend text-sm font-normal leading-5">
							{selectedCountry}
						</p>
						<span
							onClick={toggleDropdown}
							className={`flex w-5 h-5 justify-center items-center cursor-pointer transform transition-transform ${
								isDropdownOpen ? "rotate-180" : ""
							}`}>
							<Image
								src={ArrowDown}
								alt="Arrow"
								width={18}
								height={18}
							/>
						</span>
					</div>

					{isDropdownOpen && (
						<ul className="absolute top-20 z-10 w-full mt-1 bg-white border border-[#f4f4f4] rounded-lg shadow-lg">
							{countries.map((country) => (
								<li
									key={country}
									onClick={() => handleCountrySelect(country)}
									className="px-4 py-2 cursor-pointer hover:bg-gray-100">
									{country}
								</li>
							))}
						</ul>
					)}
				</div>

				<div className="flex flex-col justify-center items-start gap-2 self-stretch">
					<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
						STATE
					</p>

					<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
						<input
							type="text"
							className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none"
							placeholder="House number and street name"
						/>
					</div>
					<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
						<input
							type="text"
							className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none"
							placeholder="Apartment, suite, unit, etc. (optional)"
						/>
					</div>
				</div>

				<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff]">
					<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
						Town / City *
					</p>

					<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
						<input
							type="text"
							className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none text-sm"
						/>
					</div>
				</div>

				<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff]">
					<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
						Province *
					</p>

					<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
						<input
							type="text"
							className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none text-sm"
						/>
					</div>
				</div>

				<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff]">
					<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
						Postcode / ZIP *{" "}
					</p>

					<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
						<input
							type="text"
							className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none text-sm"
						/>
					</div>
				</div>

				<div className="flex items-start gap-3 self-stretch justify-between">
					<div className="flex flex-col justify-center items-start gap-2 flex-1 flex-shrink-0 rounded-xl bg-[#fff]">
						<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
							Phone (optional)
						</p>

						<div className="flex h-12 w-full px-4 items-center gap-4 self-stretch rounded-lg border border-[#f4f4f4] ">
							<input
								type="text"
								className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none text-sm w-4 h-5"
							/>
						</div>
					</div>

					<div className="flex flex-col justify-center items-start gap-2 flex-1 flex-shrink-0 rounded-xl bg-[#fff]">
						<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
							Email address *
						</p>

						<div className="flex h-12 w-full px-4 items-center gap-4 self-stretch rounded-lg border border-[#f4f4f4]">
							<input
								type="text"
								className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none text-sm w-4 h-5"
							/>
						</div>
					</div>
				</div>

				<div className="flex pt-8 flex-col items-start gap-5 self-stretch border-t border-[#c8c9cb]">
					<div className="flex h-9 justify-center items-center gap-3 rounded bg-[#fff]">
						<button
							onClick={handleNewAddress}
							className={`flex w-6 h-6 flex-col justify-center items-center gap-2 rounded-md ${
								newAddress
									? "bg-[#17af26]"
									: "bg-[#fff] border border-[#f4f4f4]"
							}`}>
							<Image
								src={NewTick}
								alt="Tick"
								width={9.371}
								height={6.24}
							/>
						</button>
						<p className="text-[#060709] font-lexend text-base font-normal leading-6">
							Ship to a different Address?
						</p>
					</div>

					{newAddress && (
						<React.Fragment>
							<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff] relative">
								<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
									Country / Region *
								</p>

								{/* Country select dropdown */}
								<div className="flex h-12 px-4 items-center justify-between gap-4 self-stretch rounded-lg border border-[#f4f4f4]">
									<p className="text-[#060709] font-lexend text-sm font-normal leading-5">
										{selectedCountry}
									</p>
									<span
										onClick={toggleDropdown}
										className={`flex w-5 h-5 justify-center items-center cursor-pointer transform transition-transform ${
											isDropdownOpen ? "rotate-180" : ""
										}`}>
										<Image
											src={ArrowDown}
											alt="Arrow"
											width={18}
											height={18}
										/>
									</span>
								</div>

								{isDropdownOpen && (
									<ul className="absolute top-20 z-10 w-full mt-1 bg-white border border-[#f4f4f4] rounded-lg shadow-lg">
										{countries.map((country) => (
											<li
												key={country}
												onClick={() =>
													handleCountrySelect(country)
												}
												className="px-4 py-2 cursor-pointer hover:bg-gray-100">
												{country}
											</li>
										))}
									</ul>
								)}
							</div>

							<div className="flex flex-col justify-center items-start gap-2 self-stretch">
								<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
									STATE
								</p>

								<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
									<input
										type="text"
										className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none"
										placeholder="House number and street name"
									/>
								</div>
								<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
									<input
										type="text"
										className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none"
										placeholder="Apartment, suite, unit, etc. (optional)"
									/>
								</div>
							</div>

							<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff]">
								<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
									Town / City *
								</p>

								<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
									<input
										type="text"
										className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none text-sm"
									/>
								</div>
							</div>

							<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff]">
								<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
									Province *
								</p>

								<div className="flex h-12 px-4 items-center gap-4 self-stretch rounded-lg border border-[]#f4f4f4">
									<input
										type="text"
										className="flex-1 flex-shrink-0  font-lexend font-normal leading-5 outline-none text-sm"
									/>
								</div>
							</div>
						</React.Fragment>
					)}

					<div className="flex flex-col justify-center items-start gap-2 self-stretch rounded-xl bg-[#fff]">
						<p className="text-[#46494f] font-lexend text-xs font-normal leading-5 uppercase">
							Order Notes (optional)
						</p>

						<div className="flex h-24 py-3 px-4 items-start gap-4 self-stretch rounded-lg border border-[#f4f4f4]">
							<textarea
								name=""
								id=""
								className="resize-none  font-lexend text-sm font-normal leading-5 outline-none w-full"
								placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
						</div>
					</div>

					<div className="flex h-[136px] pt-5 flex-col items-start gap-5 self-stretch border-t border-[#f4f4f4]">
						<p className="flex-1 flex-shrink-0 text-[#060709] font-lexend text-base font-normal leading-6">
							What would you like us to do if an Item is out of
							Stock?
						</p>

						<div className="flex h-12 px-4 items-center gap-4 justify-between flex-shrink-0 self-stretch rounded-lg border border-[#f4f4f4] relative">
							<p className="text-[#060709] font-lexend text-sm font-normal leading-5 ">
								{selectedOutOfStockOption}
							</p>

							<button
								className={`flex w-5 h-5 justify-center items-center ${
									isStockDropdownOpen ? "rotate-180" : ""
								}`}
								onClick={toggleOutOfStockDropdown}>
								<Image
									src={ArrowDown}
									alt="Down"
									width={18}
									height={18}
								/>
							</button>

							{isStockDropdownOpen && (
								<ul className="absolute top-12 left-0 z-10 w-full mt-1 bg-white border border-[#f4f4f4] rounded-lg shadow-lg">
									{outOfStock.map((option) => (
										<li
											key={option}
											onClick={() =>
												handleSelectedOutOfStockOption(
													option
												)
											}
											className="px-4 py-2 cursor-pointer hover:bg-gray-100">
											{option}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>

					<div className="flex pt-5 flex-col items-start gap-5 self-stretch border-[#c8c9cb] border-t">
						<p className="flex-1 flex-shrink-0 text-[#060709] font-lexend text-base font-normal leading-6">
							Where did you hear about Us?
						</p>

						<div className="flex h-24 py-3 px-4 items-start gap-4 self-stretch rounded-lg border border-[#f4f4f4]">
							<textarea
								name=""
								id=""
								className="resize-none  font-lexend text-sm font-normal leading-5 outline-none w-full"
								placeholder="Tell us..."></textarea>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default UserForm;
