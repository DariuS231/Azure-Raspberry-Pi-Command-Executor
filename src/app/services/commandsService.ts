import {exec, ExecException} from 'child_process';
import { PromiseReject, PromiseResolve } from "../common/types";

export class CommandsService {
    public ExecuteCommand(commandStr: string) : Promise<string> {
        return new Promise((resolve: PromiseResolve, reject: PromiseReject)=>{
            exec(commandStr, (err:ExecException | null, stdout: string, stderr: string) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(stdout);
                }
            });
        });
    }
}