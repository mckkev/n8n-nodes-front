"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFields = exports.messageOperations = void 0;
exports.messageOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['message'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get a message by ID',
                action: 'Get a message',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get messages in a conversation',
                action: 'Get many messages',
            },
            {
                name: 'Import',
                value: 'import',
                description: 'Import a message into an inbox',
                action: 'Import a message',
            },
            {
                name: 'Send',
                value: 'send',
                description: 'Send a new message',
                action: 'Send a message',
            },
            {
                name: 'Send Reply',
                value: 'sendReply',
                description: 'Reply to a conversation',
                action: 'Send a reply',
            },
        ],
        default: 'get',
    },
];
exports.messageFields = [
    // ----------------------------------
    //         message:get
    // ----------------------------------
    {
        displayName: 'Message ID',
        name: 'messageId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['get'],
            },
        },
        default: '',
        description: 'The ID of the message to retrieve',
    },
    // ----------------------------------
    //         message:getAll
    // ----------------------------------
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
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
                resource: ['message'],
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
                resource: ['message'],
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
    //         message:send
    // ----------------------------------
    {
        displayName: 'Channel ID',
        name: 'channelId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['send'],
            },
        },
        default: '',
        description: 'The ID of the channel to send the message from',
    },
    {
        displayName: 'To',
        name: 'to',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['send'],
            },
        },
        default: '',
        description: 'Recipient email address(es), comma-separated',
    },
    {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['send'],
            },
        },
        default: '',
        description: 'Subject of the message',
    },
    {
        displayName: 'Body',
        name: 'body',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['send'],
            },
        },
        typeOptions: {
            rows: 5,
        },
        default: '',
        description: 'Body of the message (text or HTML)',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['send'],
            },
        },
        options: [
            {
                displayName: 'Attachment Binary Property',
                name: 'binaryPropertyName',
                type: 'string',
                default: 'data',
                description: 'Name of the binary property in the input data that holds the file to attach',
            },
            {
                displayName: 'BCC',
                name: 'bcc',
                type: 'string',
                default: '',
                description: 'BCC email address(es), comma-separated',
            },
            {
                displayName: 'CC',
                name: 'cc',
                type: 'string',
                default: '',
                description: 'CC email address(es), comma-separated',
            },
            {
                displayName: 'Sender Name',
                name: 'sender_name',
                type: 'string',
                default: '',
                description: 'Name of the sender',
            },
        ],
    },
    // ----------------------------------
    //         message:sendReply
    // ----------------------------------
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendReply'],
            },
        },
        default: '',
        description: 'The ID of the conversation to reply to',
    },
    {
        displayName: 'Body',
        name: 'body',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendReply'],
            },
        },
        typeOptions: {
            rows: 5,
        },
        default: '',
        description: 'Body of the reply (text or HTML)',
    },
    {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendReply'],
            },
        },
        options: [
            {
                name: 'Reply',
                value: 'reply',
            },
            {
                name: 'Reply All',
                value: 'reply-all',
            },
        ],
        default: 'reply',
        description: 'Type of reply',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendReply'],
            },
        },
        options: [
            {
                displayName: 'Attachment Binary Property',
                name: 'binaryPropertyName',
                type: 'string',
                default: 'data',
                description: 'Name of the binary property in the input data that holds the file to attach',
            },
            {
                displayName: 'Channel ID',
                name: 'channel_id',
                type: 'string',
                default: '',
                description: 'The ID of the channel to send the reply from',
            },
            {
                displayName: 'Subject',
                name: 'subject',
                type: 'string',
                default: '',
                description: 'Subject of the reply (optional, inherits from conversation if not set)',
            },
        ],
    },
    // ----------------------------------
    //         message:import
    // ----------------------------------
    {
        displayName: 'Inbox ID',
        name: 'inboxId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['import'],
            },
        },
        default: '',
        description: 'The ID of the inbox to import the message into',
    },
    {
        displayName: 'Sender Handle',
        name: 'sender',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['import'],
            },
        },
        default: '',
        description: 'Email address or handle of the sender',
    },
    {
        displayName: 'Body',
        name: 'body',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['import'],
            },
        },
        typeOptions: {
            rows: 5,
        },
        default: '',
        description: 'Body of the message',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['import'],
            },
        },
        options: [
            {
                displayName: 'Created At',
                name: 'created_at',
                type: 'number',
                default: 0,
                description: 'Unix timestamp when the message was created',
            },
            {
                displayName: 'Sender Name',
                name: 'sender_name',
                type: 'string',
                default: '',
                description: 'Display name of the sender',
            },
            {
                displayName: 'Subject',
                name: 'subject',
                type: 'string',
                default: '',
                description: 'Subject of the message',
            },
        ],
    },
];
//# sourceMappingURL=MessageDescription.js.map