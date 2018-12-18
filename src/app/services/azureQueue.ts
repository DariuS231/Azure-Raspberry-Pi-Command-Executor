import { createQueueService, QueueService, ServiceResponse } from 'azure-storage';
import * as dotenv from "dotenv";
import { PromiseReject, PromiseResolve } from "../common/types";


export class AzureQueueService {
    private service: QueueService;
    private queueName: string;
    constructor(queueName: string) {
        dotenv.config();
        this.queueName = queueName;
        const accountName: string = process.env.AZURE_STORAGE_ACCOUNT as string;
        const appId: string = process.env.AZURE_STORAGE_ACCESS_KEY as string;
        this.service = createQueueService(accountName, appId);
    }
    public EnsureQueue(): Promise<void> {
        return new Promise((resolve: PromiseResolve, reject: PromiseReject) => {
            this.service.createQueueIfNotExists(
                this.queueName, 
                (error: Error, results: QueueService.QueueResult, response: ServiceResponse) => {
                if (!error) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }

    public GetNewMessage(): Promise<QueueService.QueueMessageResult | null> {
        return new Promise((resolve: PromiseResolve, reject: PromiseReject) => {
            this.service.getMessages(
                this.queueName,
                (error: Error, results: QueueService.QueueMessageResult[], response: ServiceResponse) => {
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


    public AddNewMessage(message: string): Promise<any> {
        return new Promise((resolve: PromiseResolve, reject: PromiseReject) => {
            this.service.createMessage(
                this.queueName,
                message,
                (error: Error, results: QueueService.QueueMessageResult, response: ServiceResponse) => {
                    if (!error) {
                        resolve(results);

                    } else {
                        reject(error);
                    }
                });
        });
    }

    public DeleteMessage(messageId: string, popReceipt: string): Promise<void> {
        return new Promise((resolve: PromiseResolve, reject: PromiseReject) => {
            this.service.deleteMessage(
                this.queueName,
                messageId,
                popReceipt,
                (error: Error, response: ServiceResponse) => {
                    if (!error) {
                        resolve();
                    } else {
                        reject(error);
                    }
                });
        });
    }
}