import autocannon, { Result } from 'autocannon';
import FormData from 'form-data';
import fs from 'fs';


function generatePayloadSync(): { headers: Record<string, string>; body: Buffer } {
    const form = new FormData();


    const filePath = './data.csv'; 
    const fileBuffer = fs.readFileSync(filePath);

  
    form.append('csv', fileBuffer, {
        filename: 'test-data.csv',
        contentType: 'text/csv', 
    });

    
    return {
        headers: form.getHeaders(),
        body: form.getBuffer(),
    };
}


async function runUploadTest() {
    const { headers, body } = generatePayloadSync();

    // Perform the load test
    const instance = autocannon(
        {
            url: 'http://localhost:8000/api/v1/upload-file', 
            method: 'POST',
            headers: headers,
            body: body,
            connections: 1000, 
            duration: 20, 
        },
        (err: Error | null, result: Result) => {
            if (err) {
                console.error('Error during the test:', err);
            } else {
                console.log('Test completed:', result);
            }
        }
    );

 
    autocannon.track(instance, { renderProgressBar: true });
}


runUploadTest().catch((error) => {
    console.error('Error executing upload test:', error);
});
