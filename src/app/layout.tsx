import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const metadata: Metadata = {
	title: "Spike",
	description: "Um e-commerce do seu jeito.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<head>
				<link rel="icon" href="/spike.svg" sizes="any" />
			</head>

			<body className={GeistSans.className}>{children}</body>
		</html>
	);
}
