export interface IOpenAiResponse {
    choices: IChoices[],
    created: bigint,
    id: string,
    model: string;
}

export interface IChoices {
    finish_reason: string,
    index: number;
    message: IOpenAiMessage,

}

 interface IOpenAiMessage {
    role: string;
    content: string;
}

