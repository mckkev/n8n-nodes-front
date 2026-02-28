"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagFields = exports.tagOperations = void 0;
exports.tagOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['tag'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a tag',
                action: 'Create a tag',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many tags',
                action: 'Get many tags',
            },
        ],
        default: 'getAll',
    },
];
exports.tagFields = [
    // ----------------------------------
    //         tag:getAll
    // ----------------------------------
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['tag'],
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
                resource: ['tag'],
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
    // ----------------------------------
    //         tag:create
    // ----------------------------------
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['tag'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'Name of the tag',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['tag'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Highlight',
                name: 'highlight',
                type: 'options',
                options: [
                    { name: 'Grey', value: 'grey' },
                    { name: 'Pink', value: 'pink' },
                    { name: 'Red', value: 'red' },
                    { name: 'Orange', value: 'orange' },
                    { name: 'Yellow', value: 'yellow' },
                    { name: 'Green', value: 'green' },
                    { name: 'Light Blue', value: 'light-blue' },
                    { name: 'Blue', value: 'blue' },
                    { name: 'Purple', value: 'purple' },
                ],
                default: 'grey',
                description: 'Color of the tag',
            },
        ],
    },
];
//# sourceMappingURL=TagDescription.js.map