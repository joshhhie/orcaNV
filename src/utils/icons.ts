import * as http from "utils/http";

const PHOSPHOR = "https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/regular";

export const ICON_URLS = {
	caretDown: `${PHOSPHOR}/caret-down.svg`,
	caretRight: `${PHOSPHOR}/caret-right.svg`,
	caretUp: `${PHOSPHOR}/caret-up.svg`,
	magnifyingGlass: `${PHOSPHOR}/magnifying-glass.svg`,
	keyboard: `${PHOSPHOR}/keyboard.svg`,
	gear: `${PHOSPHOR}/gear.svg`,
	sliders: `${PHOSPHOR}/sliders-horizontal.svg`,
	dotsThree: `${PHOSPHOR}/dots-three-vertical.svg`,
} as const;

export type IconId = keyof typeof ICON_URLS;

const cache = new Map<string, string>();

export function getIcon(id: IconId): string {
	const cached = cache.get(id);
	if (cached !== undefined) {
		return cached;
	}

	const url = ICON_URLS[id];
	const path = `_orca/icons/${id}.svg`;

	if (getcustomasset !== undefined && writefile !== undefined && isfile !== undefined) {
		if (makefolder !== undefined && isfolder !== undefined && !isfolder("_orca/icons")) {
			makefolder("_orca/icons");
		}
		if (!isfile(path)) {
			writefile(path, http.get(url));
		}
		const asset = getcustomasset(path);
		cache.set(id, asset);
		return asset;
	}

	cache.set(id, url);
	return url;
}
