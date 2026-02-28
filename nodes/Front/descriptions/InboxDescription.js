"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inboxFields = exports.inboxOperations = void 0;
exports.inboxOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['inbox'],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many inboxes',
                action: 'Get many inboxes',
            },
        ],
        default: 'getAll',
    },
];
exports.inboxFields = [
    // ----------------------------------
    //         inbox:getAll
    // ----------------------------------
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['getAll'],
            },
        },
        default: false,
        description: 'Whether to return all results or only up to a given limit',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        default: 50,
        description: 'Max number of results to return',
    },
];
//# sourceMappingURL=InboxDescription.js.map