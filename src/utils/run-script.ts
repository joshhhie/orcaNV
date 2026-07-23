import * as http from "utils/http";

export function runScriptFromUrl(url: string, src: string) {
	try {
		const content = http.get(url);
		const [fn, err] = loadstring(content, "@" + src);
		assert(fn, `Failed to call loadstring on Lua script from '${url}': ${err}`);
		task.defer(fn);
	} catch (e) {
		warn(`Failed to run Lua script from '${url}': ${e}`);
	}
}
