import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IBinaryData,
} from 'n8n-workflow';

import { frontApiRequest, frontApiRequestAllItems } from './GenericFunctions';

import {
	conversationOperations,
	conversationFields,
} from './descriptions/ConversationDescription';

import {
	messageOperations,
	messageFields,
} from './descriptions/MessageDescription';

import {
	commentOperations,
	commentFields,
} from './descriptions/CommentDescription';

import {
	contactOperations,
	contactFields,
} from './descriptions/ContactDescription';

import {
	tagOperations,
	tagFields,
} from './descriptions/TagDescription';

import {
	channelOperations,
	channelFields,
} from './descriptions/ChannelDescription';

import {
	teammateOperations,
	teammateFields,
} from './descriptions/TeammateDescription';

import {
	inboxOperations,
	inboxFields,
} from './descriptions/InboxDescription';

export class Front implements INodeType {
	description: INodeTypeDescription = {
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
			...conversationOperations,
			...conversationFields,
			// Message
			...messageOperations,
			...messageFields,
			// Comment
			...commentOperations,
			...commentFields,
			// Contact
			...contactOperations,
			...contactFields,
			// Tag
			...tagOperations,
			...tagFields,
			// Channel
			...channelOperations,
			...channelFields,
			// Teammate
			...teammateOperations,
			...teammateFields,
			// Inbox
			...inboxOperations,
			...inboxFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'conversation') {
					// ----------------------------------
					//         conversation
					// ----------------------------------
					if (operation === 'get') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;
						const responseData = await frontApiRequest.call(
							this,
							'GET',
							`/conversations/${conversationId}`,
						);
						returnData.push(responseData);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (filters.status) qs.status = filters.status;
						if (filters.inbox_id) qs.inbox_id = filters.inbox_id;
						if (filters.tag_id) qs.tag_id = filters.tag_id;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								'/conversations',
								{},
								qs,
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.limit = limit;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								'/conversations',
								{},
								qs,
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					} else if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	
						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								'/conversations/search',
								{},
								{ q: query },
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								'/conversations/search',
								{},
								{ q: query, limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					} else if (operation === 'update') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};

						if (updateFields.status) {
							body.status = updateFields.status;
						}
						if (updateFields.assignee_id) {
							body.assignee_id = updateFields.assignee_id;
						}
						if (updateFields.tag_ids) {
							body.tag_ids = (updateFields.tag_ids as string).split(',').map(id => id.trim());
						}

						const responseData = await frontApiRequest.call(
							this,
							'PATCH',
							`/conversations/${conversationId}`,
							body,
						);
						returnData.push(responseData || { success: true });
					}
				} else if (resource === 'message') {
					// ----------------------------------
					//         message
					// ----------------------------------
					if (operation === 'get') {
						const messageId = this.getNodeParameter('messageId', i) as string;
						const responseData = await frontApiRequest.call(
							this,
							'GET',
							`/messages/${messageId}`,
						);
						returnData.push(responseData);
					} else if (operation === 'getAll') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								`/conversations/${conversationId}/messages`,
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								`/conversations/${conversationId}/messages`,
								{},
								{ limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					} else if (operation === 'send') {
						const channelId = this.getNodeParameter('channelId', i) as string;
						const to = (this.getNodeParameter('to', i) as string).split(',').map(e => e.trim()).filter(Boolean);
						if (to.length === 0) {
							throw new Error('At least one recipient is required in the "To" field');
						}
						const subject = this.getNodeParameter('subject', i) as string;
						const messageBody = this.getNodeParameter('body', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const binaryPropertyName = additionalFields.binaryPropertyName as string | undefined;

						if (binaryPropertyName && items[i].binary?.[binaryPropertyName]) {
							// Send with attachment via multipart/form-data
							const binaryItem = items[i].binary![binaryPropertyName] as IBinaryData;
							const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

							const fd = new FormData();
							to.forEach((addr: string) => fd.append('to[]', addr));
							fd.append('body', messageBody);
							if (subject) fd.append('subject', subject);
							if (additionalFields.cc) {
								(additionalFields.cc as string).split(',').map(e => e.trim()).filter(Boolean).forEach(e => fd.append('cc[]', e));
							}
							if (additionalFields.bcc) {
								(additionalFields.bcc as string).split(',').map(e => e.trim()).filter(Boolean).forEach(e => fd.append('bcc[]', e));
							}
							if (additionalFields.sender_name) {
								fd.append('sender_name', additionalFields.sender_name as string);
							}
							const blob = new Blob([dataBuffer], { type: binaryItem.mimeType || 'application/octet-stream' });
							fd.append('attachments[]', blob, binaryItem.fileName || 'attachment');

							const response = await this.helpers.httpRequestWithAuthentication.call(this, 'frontApi', {
								method: 'POST',
								url: `https://api2.frontapp.com/channels/${channelId}/messages`,
								body: fd as any,
							});
							returnData.push(response);
						} else {
							// Send as JSON without attachment
							const requestBody: IDataObject = { to, body: messageBody };
							if (subject) requestBody.subject = subject;
							if (additionalFields.cc) {
								requestBody.cc = (additionalFields.cc as string).split(',').map(e => e.trim()).filter(Boolean);
							}
							if (additionalFields.bcc) {
								requestBody.bcc = (additionalFields.bcc as string).split(',').map(e => e.trim()).filter(Boolean);
							}
							if (additionalFields.sender_name) {
								requestBody.sender_name = additionalFields.sender_name;
							}
							const responseData = await frontApiRequest.call(
								this,
								'POST',
								`/channels/${channelId}/messages`,
								requestBody,
							);
							returnData.push(responseData);
						}
					} else if (operation === 'sendReply') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;
						const messageBody = this.getNodeParameter('body', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const binaryPropertyName = additionalFields.binaryPropertyName as string | undefined;

						if (binaryPropertyName && items[i].binary?.[binaryPropertyName]) {
							// Reply with attachment via multipart/form-data
							const binaryItem = items[i].binary![binaryPropertyName] as IBinaryData;
							const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

							const fd = new FormData();
							fd.append('body', messageBody);
							fd.append('type', type);
							if (additionalFields.subject) fd.append('subject', additionalFields.subject as string);
							if (additionalFields.channel_id) fd.append('channel_id', additionalFields.channel_id as string);
							const blob = new Blob([dataBuffer], { type: binaryItem.mimeType || 'application/octet-stream' });
							fd.append('attachments[]', blob, binaryItem.fileName || 'attachment');

							const response = await this.helpers.httpRequestWithAuthentication.call(this, 'frontApi', {
								method: 'POST',
								url: `https://api2.frontapp.com/conversations/${conversationId}/messages`,
								body: fd as any,
							});
							returnData.push(response);
						} else {
							// Reply as JSON without attachment
							const requestBody: IDataObject = { body: messageBody, type };
							if (additionalFields.subject) requestBody.subject = additionalFields.subject;
							if (additionalFields.channel_id) requestBody.channel_id = additionalFields.channel_id;
							const responseData = await frontApiRequest.call(
								this,
								'POST',
								`/conversations/${conversationId}/messages`,
								requestBody,
							);
							returnData.push(responseData);
						}
					} else if (operation === 'import') {
						const inboxId = this.getNodeParameter('inboxId', i) as string;
						const sender = this.getNodeParameter('sender', i) as string;
						const messageBody = this.getNodeParameter('body', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const requestBody: IDataObject = {
							sender: { handle: sender },
							body: messageBody,
						};

						if (additionalFields.sender_name) {
							(requestBody.sender as IDataObject).name = additionalFields.sender_name;
						}
						if (additionalFields.subject) {
							requestBody.subject = additionalFields.subject;
						}
						if (additionalFields.created_at) {
							requestBody.created_at = additionalFields.created_at;
						}

						const responseData = await frontApiRequest.call(
							this,
							'POST',
							`/inboxes/${inboxId}/imported_messages`,
							requestBody,
						);
						returnData.push(responseData);
					}
				} else if (resource === 'comment') {
					// ----------------------------------
					//         comment
					// ----------------------------------
					if (operation === 'getAll') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								`/conversations/${conversationId}/comments`,
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								`/conversations/${conversationId}/comments`,
								{},
								{ limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					} else if (operation === 'create') {
						const conversationId = this.getNodeParameter('conversationId', i) as string;
						const body = this.getNodeParameter('body', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const requestBody: IDataObject = { body };

						if (additionalFields.author_id) {
							requestBody.author_id = additionalFields.author_id;
						}

						const responseData = await frontApiRequest.call(
							this,
							'POST',
							`/conversations/${conversationId}/comments`,
							requestBody,
						);
						returnData.push(responseData);
					}
				} else if (resource === 'contact') {
					// ----------------------------------
					//         contact
					// ----------------------------------
					if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const responseData = await frontApiRequest.call(
							this,
							'GET',
							`/contacts/${contactId}`,
						);
						returnData.push(responseData);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								'/contacts',
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								'/contacts',
								{},
								{ limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					} else if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							handles: [{ handle: email, source: 'email' }],
						};

						if (additionalFields.name) {
							body.name = additionalFields.name;
						}
						if (additionalFields.description) {
							body.description = additionalFields.description;
						}
						if (additionalFields.phone_number) {
							(body.handles as IDataObject[]).push({
								handle: additionalFields.phone_number,
								source: 'phone',
							});
						}
						if (additionalFields.avatar_url) {
							body.avatar_url = additionalFields.avatar_url;
						}

						const responseData = await frontApiRequest.call(
							this,
							'POST',
							'/contacts',
							body,
						);
						returnData.push(responseData);
					} else if (operation === 'update') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

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
							(body.handles as IDataObject[]).push({
								handle: updateFields.phone_number,
								source: 'phone',
							});
						}
						if (updateFields.avatar_url) {
							body.avatar_url = updateFields.avatar_url;
						}

						const responseData = await frontApiRequest.call(
							this,
							'PATCH',
							`/contacts/${contactId}`,
							body,
						);
						returnData.push(responseData || { success: true });
					}
				} else if (resource === 'tag') {
					// ----------------------------------
					//         tag
					// ----------------------------------
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								'/tags',
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								'/tags',
								{},
								{ limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = { name };

						if (additionalFields.highlight) {
							body.highlight = additionalFields.highlight;
						}

						const responseData = await frontApiRequest.call(
							this,
							'POST',
							'/tags',
							body,
						);
						returnData.push(responseData);
					}
				} else if (resource === 'channel') {
					// ----------------------------------
					//         channel
					// ----------------------------------
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								'/channels',
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								'/channels',
								{},
								{ limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					}
				} else if (resource === 'teammate') {
					// ----------------------------------
					//         teammate
					// ----------------------------------
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								'/teammates',
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								'/teammates',
								{},
								{ limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					}
				} else if (resource === 'inbox') {
					// ----------------------------------
					//         inbox
					// ----------------------------------
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await frontApiRequestAllItems.call(
								this,
								'GET',
								'/inboxes',
							);
							returnData.push.apply(returnData, responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const responseData = await frontApiRequest.call(
								this,
								'GET',
								'/inboxes',
								{},
								{ limit },
							);
							returnData.push.apply(returnData, responseData._results || []);
						}
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: (error as Error).message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
