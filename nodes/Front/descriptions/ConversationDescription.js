"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationFields = exports.conversationOperations = void 0;
exports.conversationOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['conversation'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get a conversation by ID',
                action: 'Get a conversation',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many conversations',
                action: 'Get many conversations',
            },
            {
                name: 'Search',
                value: 'search',
                description: 'Search conversations',
                action: 'Search conversations',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a conversation',
                action: 'Update a conversation',
            },
        ],
        default: 'get',
    },
];
exports.conversationFields = [
    // ----------------------------------
    //         conversation:get
    // ----------------------------------
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['conversation'],
                operation: ['get'],
            },
        },
        default: '',
        description: 'The ID of the conversation to retrieve',
    },
    // ----------------------------------
    //         conversation:getAll
    // ----------------------------------
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['conversation'],
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
                resource: ['conversation'],
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
    {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add Filter',
        default: {},
        displayOptions: {
            show: {
                resource: ['conversation'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Archived', value: 'archived' },
                    { name: 'Assigned', value: 'assigned' },
                    { name: 'Deleted', value: 'deleted' },
                    { name: 'Open', value: 'open' },
                    { name: 'Unassigned', value: 'unassigned' },
                ],
                default: '',
                description: 'Filter by conversation status',
            },
            {
                displayName: 'Inbox ID',
                name: 'inbox_id',
                type: 'string',
                default: '',
                description: 'Filter by inbox ID',
            },
            {
                displayName: 'Tag ID',
                name: 'tag_id',
                type: 'string',
                default: '',
                description: 'Filter by tag ID',
            },
        ],
    },
    // ----------------------------------
    //         conversation:search
    // ----------------------------------
    {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['conversation'],
                operation: ['search'],
            },
        },
        default: '',
        description: 'Search query string. Supports Front search syntax, e.g. "is:unassigned" or "subject:invoice".',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['conversation'],
                operation: ['search'],
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
                resource: ['conversation'],
                operation: ['search'],
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
    //         conversation:update
    // ----------------------------------
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['conversation'],
                operation: ['update'],
            },
        },
        default: '',
        description: 'The ID of the conversation to update',
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['conversation'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    {
                        name: 'Archived',
                        value: 'archived',
                    },
                    {
                        name: 'Deleted',
                        value: 'deleted',
                    },
                    {
                        name: 'Open',
                        value: 'open',
                    },
                ],
                default: 'open',
                description: 'Status of the conversation',
            },
            {
                displayName: 'Assignee ID',
                name: 'assignee_id',
                type: 'string',
                default: '',
                description: 'Teammate ID to assign the conversation to',
            },
            {
                displayName: 'Tag IDs',
                name: 'tag_ids',
                type: 'string',
                default: '',
                description: 'Comma-separated list of tag IDs to apply to the conversation',
            },
        ],
    },
];
//# sourceMappingURL=ConversationDescription.js.map