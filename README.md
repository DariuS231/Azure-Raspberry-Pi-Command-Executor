# Azure Raspberry Pi Command Executor

Initializes a Nodejs application tha reads from an Azure Queue every 5 minutes and executes the terminal command provided in the message of the queue.

## Requirements

Before running the application, you must provide the connection string for your storage account.

Create an `.env` file in the root directory with the following information:

```
AZURE_STORAGE_ACCOUNT=<<TO REPLACE WITH NAME OF AZURE STORAGE>>
AZURE_STORAGE_ACCESS_KEY=<<TO REPLACE WITH  AZURE STORAGE ACCESS KEY>>
```
OR

```
AZURE_STORAGE_CONNECTION_STRING=<<TO REPLACE WITH  AZURE STORAGE CONNECTION STRING>>
```

## Install and Run

* `npm install`
* `npm run start`

## License

The MIT License (MIT)

Copyright (c) 2016 @darius231
