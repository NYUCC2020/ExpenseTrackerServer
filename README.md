## Expense Tracker APP

### Run locally

```
 mongoDB Access (https://www.mongodb.com/cloud/atlas)
 account: chen873374255@gmail.com
 password: NYUcc2020

 npm install
 cd client
 npm install
 cd ..
 
 # Run front and backend
 npm run dev
 
 # Backend only
 npm run server (run on http://localhost:5000)
 
 # Frontend only
 npm run client (run on http://localhost:3000)
```

### Run with Docker

Build and run docker image
```
docker build -t expense-tracker:latest .
docker run -d --rm --name expense-tracker -p 3000:3000 expense-tracker:latest
```
