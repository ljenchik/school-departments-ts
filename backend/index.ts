const express = require('express')
const cors = require('express')

const port = process.env.PORT || 3001;

const app = express()

app.get('/', (req: any, res: any) => {
  res.send('Hello from backend!')
})

// Routes goes here

app.listen(port, () => console.log(`Listening on port ${port}.`))