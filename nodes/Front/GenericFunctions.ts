import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	NodeApiError,
	JsonObject,
} from 'n8n-workflow';

export async function frontApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	formData?: IDataObject,
): Promise<any> {
	const options: IHttpRequestOptions = {
		method,
		qs,
		url: `https://api2.frontapp.com${endpoint}`,
	};

	if (method !== 'GET') {
		if (formData !== undefined) {
			options.body = formData as any;
		} else {
			options.body = body;
			options.json = true;
		}
	} else {
		options.json = true;
	}

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'frontApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function frontApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: IDataObject[] = [];

	let responseData;
	let nextUrl = endpoint;

	do {
		responseData = await frontApiRequest.call(this, method, nextUrl, body, qs);

		if (responseData._results) {
			returnData.push.apply(returnData, responseData._results);
		} else if (Array.isArray(responseData)) {
			returnData.push.apply(returnData, responseData);
		} else {
			returnData.push(responseData);
		}

		// Check for pagination
		if (responseData._links && responseData._links.next) {
			// Extract the path and query from the next URL
			const nextFullUrl = responseData._links.next;
			const urlObj = new URL(nextFullUrl);
			nextUrl = urlObj.pathname + urlObj.search;
			// Clear qs for subsequent requests as they're included in the next URL
			qs = {};
		} else {
			nextUrl = '';
		}
	} while (nextUrl);

	return returnData;
}
