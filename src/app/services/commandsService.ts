import {exec} from 'child_process';

export class CommandsService {
    public ExecuteCommand(commandStr: string) : Promise<string> {
        return new Promise((resolve,reject)=>{
            exec(commandStr, (err, stdout, stderr) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(stdout);
                }
            });
        });
    }
}