"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFields = exports.contactOperations = void 0;
exports.contactOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['contact'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a contact',
                action: 'Create a contact',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a contact by ID',
                action: 'Get a contact',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many contacts',
                action: 'Get many contacts',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a contact',
                action: 'Update a contact',
            },
        ],
        default: 'get',
    },
];
exports.contactFields = [
    // ----------------------------------
    //         contact:get
    // ----------------------------------
    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['get'],
            },
        },
        default: '',
        description: 'The ID of the contact to retrieve',
    },
    // ----------------------------------
    //         contact:getAll
    // ----------------------------------
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['contact'],
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
                resource: ['contact'],
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
    //         contact:create
    // ----------------------------------
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        required: true,
        placeholder: 'name@email.com',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'Email address of the contact. Required by Front API as the primary handle.',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Avatar URL',
                name: 'avatar_url',
                type: 'string',
                default: '',
                description: 'URL of the contact\'s avatar image',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                default: '',
                description: 'Description of the contact',
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'Display name of the contact',
            },
            {
                displayName: 'Phone Number',
                name: 'phone_number',
                type: 'string',
                default: '',
                description: 'Phone number of the contact',
            },
        ],
    },
    // ----------------------------------
    //         contact:update
    // ----------------------------------
    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['update'],
            },
        },
        default: '',
        description: 'The ID of the contact to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Avatar URL',
                name: 'avatar_url',
                type: 'string',
                default: '',
                description: 'URL of the contact\'s avatar image',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                default: '',
                description: 'Description of the contact',
            },
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
                description: 'Email address of the contact',
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'Name of the contact',
            },
            {
                displayName: 'Phone Number',
                name: 'phone_number',
                type: 'string',
                default: '',
                description: 'Phone number of the contact',
            },
        ],
    },
];
//# sourceMappingURL=ContactDescription.js.map