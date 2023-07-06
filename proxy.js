import token from './token';

export default async function proxy(urlStr, method, headers, fetch) {
	const url = new URL(urlStr);

	const corsHeaders = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,OPTIONS',
		'Access-Control-Max-Age': '86400',
	};
	const API_URL = 'https://developer.sepush.co.za/business/2.0';

	async function handleRequest() {
		let response = await fetch(API_URL + url.pathname + url.search, { headers: { Token: token } });

		return {
			status: response.status,
			body: response.body,
			headers: {
				'Access-Control-Allow-Origin': '*',
				Vary: 'Origin',
				'Cache-Control': 'max-age=7200',
			},
		};
	}

	function handleOptions() {
		if (headers['Origin'] !== null && headers['Access-Control-Request-Method'] !== null && headers['Access-Control-Request-Headers'] !== null) {
			// Handle CORS preflight requests.
			return {
				body: null,
				headers: {
					...corsHeaders,
					'Access-Control-Allow-Headers': headers['Access-Control-Request-Headers'],
				},
			};
		} else {
			// Handle standard OPTIONS request.
			return {
				body: null,
				headers: {
					Allow: 'GET, OPTIONS',
				},
			};
		}
	}

	if (url.pathname == '/') {
		return { status: 404 };
	} else if (method === 'OPTIONS') {
		// Handle CORS preflight requests
		return handleOptions();
	} else if (method === 'GET') {
		// Handle requests to the API server
		return handleRequest();
	} else {
		return {
			status: 405,
			statusText: 'Method Not Allowed',
		};
	}
}
