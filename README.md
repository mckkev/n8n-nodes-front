# n8n-nodes-front

This is an n8n community node for [Front.com](https://front.com), a customer communication platform.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following resources and operations:

### Conversation
- **Get** a conversation by ID
- **Get Many** conversations (with filters: status, inbox, tag)
- **Search** conversations using Front search syntax
- **Update** conversation (status, assignee, tags)

### Message
- **Get** a message by ID
- **Get Many** messages in a conversation
- **Send** a new message (with optional attachments)
- **Send Reply** to a conversation (with optional attachments)
- **Import** a message into an inbox

### Comment
- **Get Many** comments on a conversation
- **Create** a comment

### Contact
- **Get** a contact by ID
- **Get Many** contacts
- **Create** a contact (email required)
- **Update** a contact

### Inbox
- **Get Many** inboxes

### Tag
- **Get Many** tags
- **Create** a tag

### Channel
- **Get Many** channels

### Teammate
- **Get Many** teammates

## Credentials

To use this node, you need a Front API token. You can generate one from your Front settings:

1. Go to Settings > API & Integrations
2. Click "Create a new API token"
3. Copy the token and add it to your n8n credentials

## Compatibility

This node was built and tested with:
- n8n version 1.0.0 or higher
- Front API v2 (https://api2.frontapp.com)

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Front API documentation](https://dev.frontapp.com/reference/introduction)

## License

[MIT](LICENSE.md)
