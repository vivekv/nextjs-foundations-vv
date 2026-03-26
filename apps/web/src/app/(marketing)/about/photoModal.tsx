"use client";

import Image from "next/image";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PhotoModalProps = {
	src: string;
	alt: string;
	isOpen?: boolean;
	thumbWidth?: number;
	thumbHeight?: number;
};

export default function PhotoModal({
	src,
	alt,
	isOpen = false,
	thumbWidth = 320,
	thumbHeight = 320,
}: PhotoModalProps) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	function updateModalState(open: boolean) {
		const params = new URLSearchParams(searchParams.toString());

		if (open) {
			params.set("photo", "open");
		} else {
			params.delete("photo");
		}

		const queryString = params.toString();
		router.push(queryString ? `${pathname}?${queryString}` : pathname, {
			scroll: false,
		});
	}

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				updateModalState(false);
			}
		}

		if (!isOpen) {
			return;
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			<button
				type="button"
					onClick={() => updateModalState(true)}
				className="overflow-hidden rounded-xl"
				aria-label="Open photo in modal"
			>
				<Image
					src={src}
					alt={alt}
					width={thumbWidth}
					height={thumbHeight}
					className="h-auto w-full cursor-pointer rounded-xl object-cover transition duration-200 hover:scale-[1.02]"
				/>
			</button>

			{isOpen ? (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
						onClick={() => updateModalState(false)}
					aria-modal="true"
					role="dialog"
				>
					<div
						className="relative max-w-4xl"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							type="button"
								onClick={() => updateModalState(false)}
							className="absolute top-3 right-3 rounded-md bg-white px-3 py-2 text-sm font-medium text-black shadow"
						>
							Close
						</button>

						<Image
							src={src}
							alt={alt}
							width={1200}
							height={900}
							className="h-auto max-h-[85vh] w-auto rounded-xl object-contain"
						/>
					</div>
				</div>
			) : null}
		</>
	);
}
