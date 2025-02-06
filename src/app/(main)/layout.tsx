import { Header } from "@/components/header/header";
import { Heading } from "@/components/heading/heading";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-screen flex flex-col">
			<Heading />

			<Header />

			<div className="flex-1">{children}</div>
		</div>
	);
}
