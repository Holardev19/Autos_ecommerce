import React from "react";

const Discount: React.FC = () => {
	return (
		<>
			<div className="w-full flex items-center justify-center gap-3 bg-[#05422c] h-6 py-2 px-3">
				<p className="font-lexend overflow-hidden text-ellipsis text-[rgba(255,255,255,0.70)] w-[17rem] whitespace-nowrap text-xs font-extralight leading-5 sm:overflow-visible sm:mr-10">
					LIMITED OFFER: 30% OFF. Use RABBIT30 at Checkout.
				</p>
				<p className="text-[#fff] font-lexend text-xs font-normal leading-5 whitespace-nowrap">
					23 : 15 : 00
				</p>
			</div>
		</>
	);
};

export default Discount;
