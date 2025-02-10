import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/@types/product";
import { toast } from "sonner";

export interface CartItem {
	title: string;
	size: number;
	price: number;
	onSale: boolean;
	imageUrl: string;
	quantity: number;
	priceWithoutPromotion: number | null;
	defaultPriceId: string;
	promotionPercentage: number | null;
}

interface CartState {
	cart: CartItem[];
	totalPrice: number;
	addToCart: (product: Product, size: number) => void;
	increaseQuantity: (defaultPriceId: string) => void;
	decreaseQuantity: (defaultPriceId: string) => void;
	removeFromCart: (defaultPriceId: string) => void;
	cartCount: () => number;
	calculateTotal: () => number;
}

export const useCart = create<CartState>()(
	persist(
		(set, get) => ({
			cart: [],
			totalPrice: 0,
			cartCount: () => {
				return get().cart.reduce((total, item) => total + item.quantity, 0);
			},

			addToCart: (product, size) => {
				set((state) => {
					const existingItem = state.cart.find(
						(item) => item.title === product.title && item.size === size
					);

					if (existingItem) {
						toast.warning("Este produto já está no carrinho.");
						return state;
					}

					const newCart = [
						...state.cart,
						{
							title: product.title,
							size: size,
							promotionPercentage: product.promotionPercentage,
							defaultPriceId: product.defaultPriceId,
							price: product.price,
							priceWithoutPromotion: product.priceWithoutPromotion,
							onSale: product.onSale,
							imageUrl: product.images[0],
							quantity: 1,
						},
					];

					toast.success("Produto adicionado ao carrinho.");

					return { cart: newCart, totalPrice: get().calculateTotal() };
				});
			},

			increaseQuantity: (defaultPriceId) => {
				set((state) => {
					const newCart = state.cart.map((item) =>
						item.defaultPriceId === defaultPriceId && item.quantity < 3
							? { ...item, quantity: item.quantity + 1 }
							: item
					);
					return { cart: newCart, totalPrice: get().calculateTotal() };
				});
			},

			decreaseQuantity: (defaultPriceId) => {
				set((state) => {
					const newCart = state.cart
						.map((item) =>
							item.defaultPriceId === defaultPriceId && item.quantity > 1
								? { ...item, quantity: item.quantity - 1 }
								: item
						)
						.filter((item) => item.quantity > 0);

					return { cart: newCart, totalPrice: get().calculateTotal() };
				});
			},

			removeFromCart: (defaultPriceId) => {
				set((state) => {
					const newCart = state.cart.filter(
						(item) => !(item.defaultPriceId === defaultPriceId)
					);
					return { cart: newCart, totalPrice: get().calculateTotal() };
				});
			},

			calculateTotal: () => {
				return get().cart.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				);
			},
		}),
		{ name: "cart-storage" }
	)
);
