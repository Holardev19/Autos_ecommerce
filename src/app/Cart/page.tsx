"use client";

import Checkout from "@/components/Cart";
import React from "react";
import { CartProvider } from "@/context/context";
import { CheckoutProvider } from "@/context/CheckoutContext";

const page = () => {
	return (
		<>
			<CartProvider>
				<CheckoutProvider>
					<Checkout />
				</CheckoutProvider>
			</CartProvider>
		</>
	);
};

export default page;
