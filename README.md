## Expense Tracker APP

### Run locally

```
 mongoDB Access (https://www.mongodb.com/cloud/atlas)
 account: chen873374255@gmail.com
 password: NYUcc2020

 Download Ganache client (https://www.trufflesuite.com/ganache)
 Run Ganache and create a quickstart workspace

 npm install

 cd client
 npm install
 truffle compile
 truffle migrate
 mv build/contracts/* src/abis/

 cd ..
 
 # Run front and backend
 npm run dev
 
 # Backend only
 npm run server (run on http://localhost:5000)
 
 # Frontend only
 npm run client (run on http://localhost:3000)

 Transfer money only works inside the network. So change the MetaMask network to the one Ganache is using and then import accounts using the private keys listed by Ganache. After that, register new accounts using the new wallet address, then you can transfer ether to others in the same network.

 # Google Speech to Text API Useage
 npm install --save @google-cloud/speech
 npm install --save js-audio-recorder
 npm run dev

 open up another terminal run
 export GOOGLE_APPLICATION_CREDENTIALS="PATH/project2-276903-9e1a3036d74e.json"
 node post.json
```

### Run with Docker

Build and run docker image
```
docker build -t expense-tracker:latest .
docker run -d --rm --name expense-tracker -p 3000:3000 expense-tracker:latest
```
