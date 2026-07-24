import { ICON_IDS, ICON_PNG } from "utils/icon-data";

export type IconId = (typeof ICON_IDS)[number];

const cache = new Map<string, string>();

function ensure_dirs() {
	if (makefolder === undefined || isfolder === undefined) {
		return;
	}
	if (!isfolder("_orca")) {
		makefolder("_orca");
	}
	if (!isfolder("_orca/icons")) {
		makefolder("_orca/icons");
	}
}

export function getIcon(id: IconId): string {
	const hit = cache.get(id);
	if (hit !== undefined) {
		return hit;
	}

	if (getcustomasset === undefined || writefile === undefined || isfile === undefined || base64_decode === undefined) {
		warn(`[orca/icons] getcustomasset pipeline unavailable (${id})`);
		return "";
	}

	ensure_dirs();

	const file = `_orca/icons/${id}.png`;
	if (!isfile(file)) {
		writefile(file, base64_decode(ICON_PNG[id]));
	}

	const asset = getcustomasset(file);
	cache.set(id, asset);
	return asset;
}

export function preloadIcons() {
	for (const id of ICON_IDS) {
		getIcon(id);
	}
}
