"use client";
import { useParams } from "next/navigation";

export default function ProductDetail() {
	const { slug } = useParams();

	return (
		<div>
			<h1>Detalhes do Produto: {slug}</h1>
			{/* Aqui você pode buscar os detalhes do produto usando o slug */}
		</div>
	);
}
