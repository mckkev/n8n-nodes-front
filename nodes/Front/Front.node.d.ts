import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class Front implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getInboxes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getTeammates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
//# sourceMappingURL=Front.node.d.ts.map