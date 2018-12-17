import { createQueueService, QueueService } from 'azure-storage';
import * as dotenv from "dotenv";


export class AzureQueueService {
    private service: QueueService;
    private queueName: string;
    constructor(queueName: string) {
        dotenv.config();
        this.queueName = queueName;
        const accountName : string = process.env.AZURE_STORAGE_ACCOUNT as string;
        const appId : string = process.env.AZURE_STORAGE_ACCESS_KEY as string;
        this.service = createQueueService(accountName,appId);
    }
    public EnsureQueue(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.service.createQueueIfNotExists(this.queueName, (error, results, response) => {
                if (!error) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }

    public GetNewMessage(): Promise<QueueService.QueueMessageResult | null> {
        return new Promise((resolve, reject) => {
            this.service.getMessages(this.queueName, function (error, results, response) {
                if (!error) {
                    // Message text is in results[0].messageText
                    var message: QueueService.QueueMessageResult | null = null;
                    if (results.length > 0) {
                        message = results[0];
                    }
                    resolve(message);

                } else {
                    reject(error);
                }
            });
        });
    }


    public AddNewMessage(message:string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.service.createMessage(this.queueName, message, (error, results, response) => {
                if (!error) {
                    resolve(results);

                } else {
                    reject(error);
                }
            });
        });
    }

    public DeleteMessage(messageId: string, popReceipt: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.service.deleteMessage(this.queueName, messageId, popReceipt, (error, response) => {
                if (!error) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }
}