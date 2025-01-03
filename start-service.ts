import { spawn } from 'child_process';

function runService(serviceDir: string, command: string, args: string[]) {
    console.log(`[${serviceDir}] Starting service...`);
    const service = spawn(command, args, { cwd: serviceDir });

    service.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    service.stderr.on('data', (data) => {
        console.error(`${data}`);
    });

    service.on('close', (code) => {
        if (code === 0) {
            console.log(`[${serviceDir}] Service started successfully.`);
        } else {
            console.error(`[${serviceDir}] Service failed with code ${code}.`);
        }
    });
}

// Run the user-service
runService('./user-service', 'ts-node-dev', ['src/server.ts']);

// Run the model-service
runService('./model-service', 'bash', ['-c', 'source env/bin/activate && fastapi run main.py --port 9000']);

// Run the auth-service
runService('./auth-service', 'ts-node-dev', ['src/server.ts']);

// Run the ingestion-service
runService('./ingestion-service', 'ts-node-dev', ['src/server.ts']);

// Run the result-service
runService('./result-service', 'ts-node-dev', ['src/server.ts']);
