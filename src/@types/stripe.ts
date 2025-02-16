interface Price {
	id: string;
	object: string;
	active: boolean;
	billing_scheme: string;
	created: number;
	currency: string;
	custom_unit_amount: null | unknown;
	livemode: boolean;
	lookup_key: null | string;
	metadata: Record<string, unknown>;
	nickname: null | string;
	product: string;
	recurring: null | unknown;
	tax_behavior: string;
	tiers_mode: null | unknown;
	transform_quantity: null | unknown;
	type: string;
	unit_amount: number;
	unit_amount_decimal: string;
}

interface ProductMetadata {
	availableSizes: string;
	category: string;
	onSale: string;
	priceWithoutPromotion: string | null;
	promotionPercentage: string | null;
	rating: string;
	sizes: string;
}

export interface StripeProduct {
	id: string;
	object: string;
	active: boolean;
	attributes: unknown[];
	created: number;
	default_price: Price;
	description: string;
	images: string[];
	livemode: boolean;
	marketing_features: unknown[];
	metadata: ProductMetadata;
	name: string;
	package_dimensions: null | unknown;
	shippable: null | unknown;
	statement_descriptor: null | string;
	tax_code: null | string;
	type: string;
	unit_label: null | string;
	updated: number;
	url: null | string;
}
