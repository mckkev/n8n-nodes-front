"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Front = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
const ConversationDescription_1 = require("./descriptions/ConversationDescription");
const MessageDescription_1 = require("./descriptions/MessageDescription");
const CommentDescription_1 = require("./descriptions/CommentDescription");
const ContactDescription_1 = require("./descriptions/ContactDescription");
const TagDescription_1 = require("./descriptions/TagDescription");
const ChannelDescription_1 = require("./descriptions/ChannelDescription");
const TeammateDescription_1 = require("./descriptions/TeammateDescription");
const InboxDescription_1 = require("./descriptions/InboxDescription");
class Front {
    constructor() {
        this.description = {
            displayName: 'Front',
            name: 'front',
            icon: 'file:front.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with Front API',
            defaults: {
                name: 'Front',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'frontApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Channel',
                            value: 'channel',
                        },
                        {
                            name: 'Comment',
                            value: 'comment',
                        },
                        {
                            name: 'Contact',
                            value: 'contact',
                        },
                        {
                            name: 'Conversation',
                            value: 'conversation',
                        },
                        {
                            name: 'Inbox',
                            value: 'inbox',
                        },
                        {
                            name: 'Message',
                            value: 'message',
                        },
                        {
                            name: 'Tag',
                            value: 'tag',
                        },
                        {
                            name: 'Teammate',
                            value: 'teammate',
                        },
                    ],
                    default: 'conversation',
                },
                // Conversation
                ...ConversationDescription_1.conversationOperations,
                ...ConversationDescription_1.conversationFields,
                // Message
                ...MessageDescription_1.messageOperations,
                ...MessageDescription_1.messageFields,
                // Comment
                ...CommentDescription_1.commentOperations,
                ...CommentDescription_1.commentFields,
                // Contact
                ...ContactDescription_1.contactOperations,
                ...ContactDescription_1.contactFields,
                // Tag
                ...TagDescription_1.tagOperations,
                ...TagDescription_1.tagFields,
                // Channel
                ...ChannelDescription_1.channelOperations,
                ...ChannelDescription_1.channelFields,
                // Teammate
                ...TeammateDescription_1.teammateOperations,
                ...TeammateDescription_1.teammateFields,
                // Inbox
                ...InboxDescription_1.inboxOperations,
                ...InboxDescription_1.inboxFields,
            ],
        };
        this.methods = {
            loadOptions: {
                async getChannels() {
                    const response = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/channels');
                    return response.map((channel) => ({
                        name: `${channel.name || channel.address || channel.id} (${channel.type || 'unknown'})`,
                        value: channel.id,
                    }));
                },
                async getInboxes() {
                    const response = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/inboxes');
                    return response.map((inbox) => ({
                        name: inbox.name || inbox.id,
                        value: inbox.id,
                    }));
                },
                async getTeammates() {
                    const response = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/teammates');
                    return response.map((teammate) => ({
                        name: `${teammate.first_name || ''} ${teammate.last_name || ''}`.trim() || teammate.email,
                        value: teammate.id,
                    }));
                },
                async getTags() {
                    const response = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/tags');
                    return response.map((tag) => ({
                        name: tag.name || tag.id,
                        value: tag.id,
                    }));
                },
            },
        };
    }
    async execute() {
        var _a, _b;
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'conversation') {
                    // ----------------------------------
                    //         conversation
                    // ----------------------------------
                    if (operation === 'get') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', `/conversations/${conversationId}`);
                        returnData.push(responseData);
                    }
                    else if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        const filters = this.getNodeParameter('filters', i);
                        const qs = {};
                        if (filters.status)
                            qs.status = filters.status;
                        if (filters.inbox_id)
                            qs.inbox_id = filters.inbox_id;
                        if (filters.tag_id)
                            qs.tag_id = filters.tag_id;
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/conversations', {}, qs);
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            qs.limit = limit;
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', '/conversations', {}, qs);
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                    else if (operation === 'search') {
                        const query = this.getNodeParameter('query', i);
                        const returnAll = this.getNodeParameter('returnAll', i);
                        const encodedQuery = encodeURIComponent(query);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', `/conversations/search/${encodedQuery}`);
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', `/conversations/search/${encodedQuery}`, {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                    else if (operation === 'update') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const updateFields = this.getNodeParameter('updateFields', i);
                        const body = {};
                        if (updateFields.status) {
                            body.status = updateFields.status;
                        }
                        if (updateFields.assignee_id) {
                            body.assignee_id = updateFields.assignee_id;
                        }
                        if (updateFields.tag_ids) {
                            body.tag_ids = updateFields.tag_ids.split(',').map(id => id.trim());
                        }
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'PATCH', `/conversations/${conversationId}`, body);
                        returnData.push(responseData || { success: true });
                    }
                }
                else if (resource === 'message') {
                    // ----------------------------------
                    //         message
                    // ----------------------------------
                    if (operation === 'get') {
                        const messageId = this.getNodeParameter('messageId', i);
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', `/messages/${messageId}`);
                        returnData.push(responseData);
                    }
                    else if (operation === 'getAll') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const returnAll = this.getNodeParameter('returnAll', i);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', `/conversations/${conversationId}/messages`);
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', `/conversations/${conversationId}/messages`, {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                    else if (operation === 'send') {
                        const channelId = this.getNodeParameter('channelId', i);
                        const to = this.getNodeParameter('to', i).split(',').map(e => e.trim()).filter(Boolean);
                        if (to.length === 0) {
                            throw new Error('At least one recipient is required in the "To" field');
                        }
                        const subject = this.getNodeParameter('subject', i);
                        const messageBody = this.getNodeParameter('body', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const binaryPropertyName = additionalFields.binaryPropertyName;
                        if (binaryPropertyName && ((_a = items[i].binary) === null || _a === void 0 ? void 0 : _a[binaryPropertyName])) {
                            // Send with attachment via multipart/form-data
                            const binaryItem = items[i].binary[binaryPropertyName];
                            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                            const fd = new FormData();
                            to.forEach((addr) => fd.append('to[]', addr));
                            fd.append('body', messageBody);
                            if (subject)
                                fd.append('subject', subject);
                            if (additionalFields.cc) {
                                additionalFields.cc.split(',').map(e => e.trim()).filter(Boolean).forEach(e => fd.append('cc[]', e));
                            }
                            if (additionalFields.bcc) {
                                additionalFields.bcc.split(',').map(e => e.trim()).filter(Boolean).forEach(e => fd.append('bcc[]', e));
                            }
                            if (additionalFields.sender_name) {
                                fd.append('sender_name', additionalFields.sender_name);
                            }
                            const blob = new Blob([dataBuffer], { type: binaryItem.mimeType || 'application/octet-stream' });
                            fd.append('attachments[]', blob, binaryItem.fileName || 'attachment');
                            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'frontApi', {
                                method: 'POST',
                                url: `https://api2.frontapp.com/channels/${channelId}/messages`,
                                body: fd,
                            });
                            returnData.push(response);
                        }
                        else {
                            // Send as JSON without attachment
                            const requestBody = { to, body: messageBody };
                            if (subject)
                                requestBody.subject = subject;
                            if (additionalFields.cc) {
                                requestBody.cc = additionalFields.cc.split(',').map(e => e.trim()).filter(Boolean);
                            }
                            if (additionalFields.bcc) {
                                requestBody.bcc = additionalFields.bcc.split(',').map(e => e.trim()).filter(Boolean);
                            }
                            if (additionalFields.sender_name) {
                                requestBody.sender_name = additionalFields.sender_name;
                            }
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'POST', `/channels/${channelId}/messages`, requestBody);
                            returnData.push(responseData);
                        }
                    }
                    else if (operation === 'sendReply') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const messageBody = this.getNodeParameter('body', i);
                        const type = this.getNodeParameter('type', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const binaryPropertyName = additionalFields.binaryPropertyName;
                        if (binaryPropertyName && ((_b = items[i].binary) === null || _b === void 0 ? void 0 : _b[binaryPropertyName])) {
                            // Reply with attachment via multipart/form-data
                            const binaryItem = items[i].binary[binaryPropertyName];
                            const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                            const fd = new FormData();
                            fd.append('body', messageBody);
                            fd.append('type', type);
                            if (additionalFields.subject)
                                fd.append('subject', additionalFields.subject);
                            if (additionalFields.channel_id)
                                fd.append('channel_id', additionalFields.channel_id);
                            const blob = new Blob([dataBuffer], { type: binaryItem.mimeType || 'application/octet-stream' });
                            fd.append('attachments[]', blob, binaryItem.fileName || 'attachment');
                            const response = await this.helpers.httpRequestWithAuthentication.call(this, 'frontApi', {
                                method: 'POST',
                                url: `https://api2.frontapp.com/conversations/${conversationId}/messages`,
                                body: fd,
                            });
                            returnData.push(response);
                        }
                        else {
                            // Reply as JSON without attachment
                            const requestBody = { body: messageBody, type };
                            if (additionalFields.subject)
                                requestBody.subject = additionalFields.subject;
                            if (additionalFields.channel_id)
                                requestBody.channel_id = additionalFields.channel_id;
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'POST', `/conversations/${conversationId}/messages`, requestBody);
                            returnData.push(responseData);
                        }
                    }
                    else if (operation === 'import') {
                        const inboxId = this.getNodeParameter('inboxId', i);
                        const sender = this.getNodeParameter('sender', i);
                        const messageBody = this.getNodeParameter('body', i);
                        const to = this.getNodeParameter('to', i).split(',').map(e => e.trim()).filter(Boolean);
                        const externalId = this.getNodeParameter('externalId', i);
                        const createdAt = this.getNodeParameter('createdAt', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const senderObj = { handle: sender };
                        if (additionalFields.sender_name) {
                            senderObj.name = additionalFields.sender_name;
                        }
                        const requestBody = {
                            sender: senderObj,
                            to,
                            body: messageBody,
                            external_id: externalId,
                            created_at: createdAt,
                            metadata: {
                                is_inbound: true,
                            },
                        };
                        if (additionalFields.subject) {
                            requestBody.subject = additionalFields.subject;
                        }
                        if (additionalFields.type) {
                            requestBody.metadata.type = additionalFields.type;
                        }
                        if (additionalFields.assignee_id) {
                            requestBody.assignee_id = additionalFields.assignee_id;
                        }
                        if (additionalFields.tags) {
                            requestBody.tags = additionalFields.tags.split(',').map(t => t.trim()).filter(Boolean);
                        }
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'POST', `/inboxes/${inboxId}/imported_messages`, requestBody);
                        returnData.push(responseData);
                    }
                }
                else if (resource === 'comment') {
                    // ----------------------------------
                    //         comment
                    // ----------------------------------
                    if (operation === 'getAll') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const returnAll = this.getNodeParameter('returnAll', i);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', `/conversations/${conversationId}/comments`);
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', `/conversations/${conversationId}/comments`, {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                    else if (operation === 'create') {
                        const conversationId = this.getNodeParameter('conversationId', i);
                        const body = this.getNodeParameter('body', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const requestBody = { body };
                        if (additionalFields.author_id) {
                            requestBody.author_id = additionalFields.author_id;
                        }
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'POST', `/conversations/${conversationId}/comments`, requestBody);
                        returnData.push(responseData);
                    }
                }
                else if (resource === 'contact') {
                    // ----------------------------------
                    //         contact
                    // ----------------------------------
                    if (operation === 'get') {
                        const contactId = this.getNodeParameter('contactId', i);
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', `/contacts/${contactId}`);
                        returnData.push(responseData);
                    }
                    else if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/contacts');
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', '/contacts', {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                    else if (operation === 'create') {
                        const email = this.getNodeParameter('email', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
                            handles: [{ handle: email, source: 'email' }],
                        };
                        if (additionalFields.name) {
                            body.name = additionalFields.name;
                        }
                        if (additionalFields.description) {
                            body.description = additionalFields.description;
                        }
                        if (additionalFields.phone_number) {
                            body.handles.push({
                                handle: additionalFields.phone_number,
                                source: 'phone',
                            });
                        }
                        if (additionalFields.avatar_url) {
                            body.avatar_url = additionalFields.avatar_url;
                        }
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'POST', '/contacts', body);
                        returnData.push(responseData);
                    }
                    else if (operation === 'update') {
                        const contactId = this.getNodeParameter('contactId', i);
                        const updateFields = this.getNodeParameter('updateFields', i);
                        const body = {};
                        if (updateFields.name) {
                            body.name = updateFields.name;
                        }
                        if (updateFields.description) {
                            body.description = updateFields.description;
                        }
                        if (updateFields.email) {
                            body.handles = [{ handle: updateFields.email, source: 'email' }];
                        }
                        if (updateFields.phone_number) {
                            body.handles = body.handles || [];
                            body.handles.push({
                                handle: updateFields.phone_number,
                                source: 'phone',
                            });
                        }
                        if (updateFields.avatar_url) {
                            body.avatar_url = updateFields.avatar_url;
                        }
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'PATCH', `/contacts/${contactId}`, body);
                        returnData.push(responseData || { success: true });
                    }
                }
                else if (resource === 'tag') {
                    // ----------------------------------
                    //         tag
                    // ----------------------------------
                    if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/tags');
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', '/tags', {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                    else if (operation === 'create') {
                        const name = this.getNodeParameter('name', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = { name };
                        if (additionalFields.highlight) {
                            body.highlight = additionalFields.highlight;
                        }
                        const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'POST', '/tags', body);
                        returnData.push(responseData);
                    }
                }
                else if (resource === 'channel') {
                    // ----------------------------------
                    //         channel
                    // ----------------------------------
                    if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/channels');
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', '/channels', {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                }
                else if (resource === 'teammate') {
                    // ----------------------------------
                    //         teammate
                    // ----------------------------------
                    if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/teammates');
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', '/teammates', {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                }
                else if (resource === 'inbox') {
                    // ----------------------------------
                    //         inbox
                    // ----------------------------------
                    if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        if (returnAll) {
                            const responseData = await GenericFunctions_1.frontApiRequestAllItems.call(this, 'GET', '/inboxes');
                            returnData.push.apply(returnData, responseData);
                        }
                        else {
                            const limit = this.getNodeParameter('limit', i);
                            const responseData = await GenericFunctions_1.frontApiRequest.call(this, 'GET', '/inboxes', {}, { limit });
                            returnData.push.apply(returnData, responseData._results || []);
                        }
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ error: error.message });
                    continue;
                }
                throw error;
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.Front = Front;
//# sourceMappingURL=Front.node.js.map