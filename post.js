
const http = require('http');
const server = http.createServer((async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === "POST") {
        let postData = "";
 
        //trigger event
        req.on("data", chunk => {
            // ask for data
            postData += chunk.toString()
        });
 
        //trigger finish event
        req.on("end", () => {
            const speech = require('@google-cloud/speech');
            const client = new speech.SpeechClient();
            async function getText(data){
                const [response] = await client.recognize(data);
                const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
                console.log('Transcription: ', transcription);
                res.end(transcription)
            }        
            getText(JSON.parse(postData))
            
        })
    }
}));
server.listen(9000);