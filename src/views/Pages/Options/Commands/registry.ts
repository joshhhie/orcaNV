import { TAB_HEADER_HEIGHT } from "components/TabSection";
import { JobsState } from "store/models/jobs.model";
import { OptionsState } from "store/models/options.model";

export const COMMAND_PADDING = 12;
export const COMMAND_HEIGHT = 48;

export interface CommandEntry {
	id: string;
	label: string;
	hint: string;
	kind: "job" | "config" | "script";
	job?: keyof JobsState;
	config?: keyof OptionsState["config"];
	url?: string;
	src?: string;
	canDeactivate?: boolean;
}

export interface CommandSection {
	id: string;
	title: string;
	defaultOpen?: boolean;
	entries: CommandEntry[];
}

export const COMMAND_SECTIONS: CommandSection[] = [
	{
		id: "character",
		title: "Character",
		defaultOpen: true,
		entries: [
			{
				id: "refresh",
				label: "Refresh character",
				hint: "<font face='GothamBlack'>Refresh</font> your character at this location",
				kind: "job",
				job: "refresh",
			},
			{
				id: "ghost",
				label: "Ghost mode",
				hint: "<font face='GothamBlack'>Spawn a ghost</font> and go to it when disabled",
				kind: "job",
				job: "ghost",
				canDeactivate: true,
			},
			{
				id: "godmode",
				label: "Godmode",
				hint: "<font face='GothamBlack'>Set godmode</font>, may break respawn",
				kind: "job",
				job: "godmode",
			},
			{
				id: "freecam",
				label: "Freecam",
				hint: "<font face='GothamBlack'>Set freecam</font>, use Q & E to move vertically",
				kind: "job",
				job: "freecam",
				canDeactivate: true,
			},
			{
				id: "flight",
				label: "Flight",
				hint: "<font face='GothamBlack'>Toggle flight</font> on your character",
				kind: "job",
				job: "flight",
				canDeactivate: true,
			},
			{
				id: "walkSpeed",
				label: "Walk speed",
				hint: "<font face='GothamBlack'>Toggle walk speed</font> modifier",
				kind: "job",
				job: "walkSpeed",
				canDeactivate: true,
			},
			{
				id: "jumpHeight",
				label: "Jump height",
				hint: "<font face='GothamBlack'>Toggle jump height</font> modifier",
				kind: "job",
				job: "jumpHeight",
				canDeactivate: true,
			},
		],
	},
	{
		id: "server",
		title: "Server",
		defaultOpen: true,
		entries: [
			{
				id: "rejoinServer",
				label: "Rejoin server",
				hint: "<font face='GothamBlack'>Rejoin</font> this server",
				kind: "job",
				job: "rejoinServer",
				canDeactivate: true,
			},
			{
				id: "switchServer",
				label: "Switch server",
				hint: "<font face='GothamBlack'>Switch</font> to a different server",
				kind: "job",
				job: "switchServer",
				canDeactivate: true,
			},
		],
	},
	{
		id: "players",
		title: "Players",
		defaultOpen: true,
		entries: [
			{
				id: "teleport",
				label: "Goto player",
				hint: "<font face='GothamBlack'>Move to</font> the selected player. Tap again to cancel.",
				kind: "job",
				job: "teleport",
				canDeactivate: true,
			},
			{
				id: "hide",
				label: "Hide player",
				hint: "<font face='GothamBlack'>Hide</font> the selected player locally",
				kind: "job",
				job: "hide",
				canDeactivate: true,
			},
			{
				id: "kill",
				label: "Kill player",
				hint: "<font face='GothamBlack'>Kill</font> the selected player",
				kind: "job",
				job: "kill",
				canDeactivate: true,
			},
			{
				id: "spectate",
				label: "Spectate player",
				hint: "<font face='GothamBlack'>Spectate</font> the selected player",
				kind: "job",
				job: "spectate",
				canDeactivate: true,
			},
		],
	},
	{
		id: "scripts",
		title: "Scripts",
		defaultOpen: true,
		entries: [
			{
				id: "vape",
				label: "Vape V4",
				hint: "<font face='GothamBlack'>Load Vape V4</font> from joshhhie/vapeNV",
				kind: "script",
				url: "https://raw.githubusercontent.com/joshhhie/vapeNV/main/NewMainScript.lua",
				src: "VapeV4",
			},
			{
				id: "orca",
				label: "Orca",
				hint: "<font face='GothamBlack'>Load Orca</font> from joshhhie/orcaNV",
				kind: "script",
				url: "https://raw.githubusercontent.com/joshhhie/orcaNV/master/public/latest.lua",
				src: "Orca",
			},
			{
				id: "infiniteYield",
				label: "Infinite Yield",
				hint: "<font face='GothamBlack'>Load Infinite Yield</font> admin commands",
				kind: "script",
				url: "https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source",
				src: "Infinite Yield",
			},
			{
				id: "cmdx",
				label: "CMD-X",
				hint: "<font face='GothamBlack'>Load CMD-X</font> admin panel",
				kind: "script",
				url: "https://raw.githubusercontent.com/CMD-X/CMD-X/master/Source",
				src: "CMD-X",
			},
		],
	},
	{
		id: "settings",
		title: "Settings",
		entries: [
			{
				id: "acrylicBlur",
				label: "Acrylic background blur",
				hint: "<font face='GothamBlack'>Toggle BG blur</font> in some themes. May be detectable when enabled.",
				kind: "config",
				config: "acrylicBlur",
			},
		],
	},
];

export function sectionContentHeight(entryCount: number) {
	return entryCount * (COMMAND_HEIGHT + COMMAND_PADDING) + COMMAND_PADDING;
}

export function sectionTotalHeight(section: CommandSection, open: boolean) {
	return TAB_HEADER_HEIGHT + (open ? sectionContentHeight(section.entries.size()) : 0);
}
