export class OperationResult {
    Succeeded: boolean;
    Message: string;

    constructor(succeeded: boolean, message: string) {
        this.Succeeded = succeeded;
        this.Message = message;
    }
}