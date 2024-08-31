import React, { createContext, ReactNode, useContext, useState } from "react";

interface CheckoutContextType {
	subtotal: number;
	setSubtotal: React.Dispatch<React.SetStateAction<number>>;
	discount: number;
	setDiscount: React.Dispatch<React.SetStateAction<number>>;
	shippingCost: number;
	setShippingCost: React.Dispatch<React.SetStateAction<number>>;
	total: number;
	setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
	undefined
);

export const useCheckout = () => {
	const context = useContext(CheckoutContext);
	if (context === undefined) {
		throw new Error("useCheckout must be used within a CheckoutProvider");
	}
	return context;
};

interface CheckoutProviderProps {
	children: ReactNode; // Type for the children prop
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
	children,
}) => {
	const [subtotal, setSubtotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [shippingCost, setShippingCost] = useState(0);
	const [total, setTotal] = useState(0);

	return (
		<CheckoutContext.Provider
			value={{
				subtotal,
				setSubtotal,
				discount,
				setDiscount,
				shippingCost,
				setShippingCost,
				total,
				setTotal,
			}}>
			{children}
		</CheckoutContext.Provider>
	);
};
