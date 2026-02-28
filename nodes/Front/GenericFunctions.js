"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontApiRequestAllItems = exports.frontApiRequest = void 0;
const n8n_workflow_1 = require("n8n-workflow");
async function frontApiRequest(method, endpoint, body = {}, qs = {}, formData) {
    const options = {
        method,
        qs,
        url: `https://api2.frontapp.com${endpoint}`,
    };
    if (method !== 'GET') {
        if (formData !== undefined) {
            options.body = formData;
        }
        else {
            options.body = body;
            options.json = true;
        }
    }
    else {
        options.json = true;
    }
    try {
        return await this.helpers.httpRequestWithAuthentication.call(this, 'frontApi', options);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
exports.frontApiRequest = frontApiRequest;
async function frontApiRequestAllItems(method, endpoint, body = {}, qs = {}) {
    const returnData = [];
    let responseData;
    let nextUrl = endpoint;
    do {
        responseData = await frontApiRequest.call(this, method, nextUrl, body, qs);
        if (responseData._results) {
            returnData.push.apply(returnData, responseData._results);
        }
        else if (Array.isArray(responseData)) {
            returnData.push.apply(returnData, responseData);
        }
        else {
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
        }
        else {
            nextUrl = '';
        }
    } while (nextUrl);
    return returnData;
}
exports.frontApiRequestAllItems = frontApiRequestAllItems;
//# sourceMappingURL=GenericFunctions.js.map