"use client";
import DesktopFilter from "@/components/DesktopFilter";
// src/app/page.tsx
import Discount from "@/components/Discount";
import Header from "@/components/Header";
import ProductPage from "@/components/ParentComponent";
import { CartProvider } from "@/context/context";

export default function Home() {
	return (
		<>
			<CartProvider>
				<Discount />
				<Header />
				<ProductPage />
				<DesktopFilter />
			</CartProvider>
		</>
	);
}
