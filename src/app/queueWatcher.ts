import { CommandsService, AzureQueueService } from "./services";

export class QueueWatcher {
    private commServ: CommandsService;
    private azureServ: AzureQueueService;
    constructor() {
        this.commServ = new CommandsService();
        this.azureServ = new AzureQueueService("raspberrymount");
        this._runQueueCheck.bind(this);
    }

    public async Init(minutes: number = 5) {
        await this.azureServ.EnsureQueue();

        const interval: number = minutes * 60 * 1000;
        setInterval(() => { this._runQueueCheck(); }, interval);
    }
    private async _runQueueCheck() {
        try {
            debugger;
            console.log("Reading from Azure Queue");
            const message = await this.azureServ.GetNewMessage();
            if (message && message.messageText && message.messageId && message.popReceipt) {
                console.log("New message in Queue", message);
                const { messageText, messageId, popReceipt } = message;
                var decodedMsg = new Buffer(messageText, 'base64')
                const commandOutput = await this.commServ.ExecuteCommand(decodedMsg.toString());
                console.log(commandOutput);
                await this.azureServ.DeleteMessage(messageId, popReceipt);
                console.log("Message Executed and Deleted");
            } else {
                console.log("No new message");
            }
        } catch (ex) {
            console.error(ex);
        }
    }
}