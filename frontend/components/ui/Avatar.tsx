"use client";

interface AvatarProps {
	src: string;
	alt?: string;
	size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
}

const sizeClasses = {
	xsmall: "h-6 w-6 max-w-6",
	small: "h-8 w-8 max-w-8",
	medium: "h-10 w-10 max-w-10",
	large: "h-12 w-12 max-w-12",
	xlarge: "h-14 w-14 max-w-14",
	xxlarge: "h-16 w-16 max-w-16",
};

export const Avatar: React.FC<AvatarProps> = ({
	src,
	alt = "User Avatar",
	size = "medium",
}) => {
	return (
		<div className={`relative  rounded-full ${sizeClasses[size]}`}>
			<img
				src={src}
				alt={alt}
				className="object-cover rounded-full"
			/>
		</div>
	);
};
