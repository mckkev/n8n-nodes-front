"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentFields = exports.commentOperations = void 0;
exports.commentOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['comment'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a comment on a conversation',
                action: 'Create a comment',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get comments on a conversation',
                action: 'Get many comments',
            },
        ],
        default: 'create',
    },
];
exports.commentFields = [
    // ----------------------------------
    //         comment:getAll
    // ----------------------------------
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['getAll'],
            },
        },
        default: '',
        description: 'The ID of the conversation',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['comment'],
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
                resource: ['comment'],
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
    //         comment:create
    // ----------------------------------
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['create'],
            },
        },
        default: '',
        description: 'The ID of the conversation to comment on',
    },
    {
        displayName: 'Body',
        name: 'body',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['create'],
            },
        },
        typeOptions: {
            rows: 4,
        },
        default: '',
        description: 'Content of the comment',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['comment'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Author ID',
                name: 'author_id',
                type: 'string',
                default: '',
                description: 'Teammate ID of the comment author',
            },
        ],
    },
];
//# sourceMappingURL=CommentDescription.js.map