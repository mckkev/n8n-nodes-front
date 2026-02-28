"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontApi = void 0;
class FrontApi {
    constructor() {
        this.name = 'frontApi';
        this.displayName = 'Front API';
        this.documentationUrl = 'https://dev.frontapp.com/reference/authentication';
        this.properties = [
            {
                displayName: 'API Token',
                name: 'apiToken',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your Front API token. Get it from Settings > API & Integrations.',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'Authorization': '=Bearer {{$credentials.apiToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api2.frontapp.com',
                url: '/me',
            },
        };
    }
}
exports.FrontApi = FrontApi;
//# sourceMappingURL=FrontApi.credentials.js.map