import Rodux from "@rbxts/rodux";
import { setJobActive } from "store/actions/jobs.action";
import { setConfig } from "store/actions/options.action";
import { runScriptFromUrl } from "utils/run-script";
import { CommandEntry } from "views/Pages/Options/Commands/registry";

export function runCommand(entry: CommandEntry, dispatch: Rodux.Dispatch<Rodux.Action>, active: boolean) {
	if (entry.kind === "job" && entry.job) {
		if (active && entry.canDeactivate) {
			dispatch(setJobActive(entry.job, false));
		} else if (!active) {
			dispatch(setJobActive(entry.job, true));
		}
	} else if (entry.kind === "config" && entry.config) {
		dispatch(setConfig(entry.config, !active));
	} else if (entry.kind === "script" && entry.url && entry.src) {
		runScriptFromUrl(entry.url, entry.src);
	}
}
