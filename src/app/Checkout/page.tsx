"use client";

import ProdCheckout from "@/components/ProdCheckout";
import React from "react";
import { CartProvider } from "@/context/context";
import { CheckoutProvider } from "@/context/CheckoutContext";

const page = () => {
	return (
		<>
			<CartProvider>
				<CheckoutProvider>
					<ProdCheckout />
				</CheckoutProvider>
			</CartProvider>
		</>
	);
};

export default page;
