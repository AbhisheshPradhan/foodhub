export function generateSlug(name: string): string {
	return name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "") // Remove special characters
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/-+/g, "-") // Replace multiple hyphens with single
		.replace(/^-+|-+$/g, ""); // Trim hyphens from start/end
}

export function validateSlugFormat(slug: string): boolean {
	// Must be lowercase alphanumeric with hyphens, no consecutive hyphens
	return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export async function generateUniqueSlug(
	prisma: any,
	baseSlug: string,
	excludeId?: number,
): Promise<string> {
	let slug = baseSlug;
	let counter = 1;

	while (true) {
		const exists = await prisma.restaurant.findFirst({
			where: {
				menuUrl: slug,
				...(excludeId && { id: { not: excludeId } }),
			},
		});

		if (!exists) {
			return slug;
		}

		slug = `${baseSlug}-${counter}`;
		counter++;
	}
}
