import fs from "fs";
import path from "path";
import sharp from "sharp";

const ICONS = {
	caretDown: "caret-down",
	caretRight: "caret-right",
	caretUp: "caret-up",
	magnifyingGlass: "magnifying-glass",
	keyboard: "keyboard",
	gear: "gear",
	sliders: "sliders-horizontal",
	dotsThree: "dots-three-vertical",
};

const srcRoot = "node_modules/@phosphor-icons/core/assets/regular";
const outDir = "assets/icons";
const outTs = "src/utils/icon-data.ts";

fs.mkdirSync(outDir, { recursive: true });

const lines = ['export const ICON_PNG: Record<string, string> = {'];

for (const [id, file] of Object.entries(ICONS)) {
	const svg = fs.readFileSync(path.join(srcRoot, `${file}.svg`));
	const png = await sharp(svg).resize(64, 64).png().toBuffer();
	fs.writeFileSync(path.join(outDir, `${id}.png`), png);
	lines.push(`\t${id}: "${png.toString("base64")}",`);
}

lines.push("};");
lines.push("");
lines.push(`export const ICON_IDS = [${Object.keys(ICONS).map((k) => `"${k}"`).join(", ")}] as const;`);
lines.push("");
fs.writeFileSync(outTs, lines.join("\n"));
console.log(`generated ${Object.keys(ICONS).length} icons`);
