import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";

interface CartItem {
	id: string;
	created_at: Date;
	Brand: string;
	BrandDescrpt: string;
	Year: string;
	SizeTag: string;
	Size: string;
	Rating: string;
	NumOfReviews: number;
	ReviewTag: string;
	Discount?: number;
	Price: number;
	image_url: string;
	quantity: number; // Add this line
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	handleSubtract: (id: string) => void;
	cartItemCount: number; // Add this line
	total: string;
	subtotal: number;
	discount: number;
	shippingCost: number;
	applyCoupon: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const parseCartItems = (items: any[]): CartItem[] => {
	return items.map((item) => ({
		...item,
		created_at: new Date(item.created_at), // Convert string to Date
	}));
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [discount, setDiscount] = useState(0);
	const [shippingCost, setShippingCost] = useState(10);

	useEffect(() => {
		// Initialize cartItems from localStorage only on the client side
		const savedCartItems = localStorage.getItem("cartItems");
		if (savedCartItems) {
			try {
				const parsedItems = JSON.parse(savedCartItems);
				setCartItems(parseCartItems(parsedItems));
			} catch (error) {
				console.error(
					"Error parsing cart items from localStorage:",
					error
				);
			}
		}
	}, []);

	const updateLocalStorage = (items: CartItem[]) => {
		if (typeof window !== "undefined") {
			// Check if window is defined to ensure this code runs in the browser
			try {
				localStorage.setItem("cartItems", JSON.stringify(items));
			} catch (error) {
				console.error(
					"Error saving cart items to localStorage:",
					error
				);
			}
		}
	};

	// useEffect(() => {
	// 	// Save cart items to localStorage whenever they change
	// 	console.log("Saving cart items to localStorage", cartItems);

	// 	localStorage.setItem("cartItems", JSON.stringify(cartItems));
	// }, [cartItems]);

	const addToCart = (item: CartItem) => {
		setCartItems((prevItems) => {
			const itemExists = prevItems.find(
				(cartItem) => cartItem.id === item.id
			);
			let updatedItems;
			if (itemExists) {
				updatedItems = prevItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				updatedItems = [...prevItems, { ...item, quantity: 1 }];
			}
			updateLocalStorage(updatedItems);
			return updatedItems;
		});
	};

	const removeFromCart = (id: string) => {
		setCartItems((prevItems) => {
			// Remove the item with the given id
			const updatedItems = prevItems.filter((item) => item.id !== id);
			updateLocalStorage(updatedItems);
			return updatedItems;
		});
	};

	const handleSubtract = (id: string) => {
		setCartItems((prevItems) => {
			const updatedItems = prevItems
				.map((item) => {
					if (item.id === id) {
						if (item.quantity > 1) {
							return { ...item, quantity: item.quantity - 1 };
						} else {
							removeFromCart(id);
							return null; // Placeholder for removal; this will be filtered out
						}
					}
					return item;
				})
				.filter((item) => item !== null); // Remove null items from the list

			updateLocalStorage(updatedItems);
			return updatedItems;
		});
	};

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.Price * item.quantity,
		0
	);
	const total = (subtotal - discount + shippingCost).toFixed(2);

	const cartItemCount = cartItems.length; // Calculate item count

	const applyCoupon = (code: string) => {
		if (code === "RABBIT30") {
			const calculatedDiscount = subtotal * 0.3;
			setDiscount(calculatedDiscount);
			return true;
		}
		return false;
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				handleSubtract,
				cartItemCount,
				total,
				subtotal,
				discount,
				shippingCost,
				applyCoupon,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
