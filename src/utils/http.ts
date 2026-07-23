interface ExploitGame {
	HttpGet(url: string, nocache?: boolean): string;
	HttpPost(url: string, data: string, contentType?: string, nocache?: boolean): string;
}

const exploitGame = game as unknown as ExploitGame;

export function get(url: string): string {
	return exploitGame.HttpGet(url, true);
}

export function post(url: string, data: string, contentType?: string): string {
	return exploitGame.HttpPost(url, data, contentType, true);
}
