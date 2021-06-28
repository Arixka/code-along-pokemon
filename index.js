const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
  .use(cors())
  .use(morgan('combined'))
  .use(express.json())
  .use('/api', require('./routes/index'))

app.listen(3000, (err) => {
  if (err) {
    throw new Error(err)
  }
  console.info('>'.repeat(40))
  console.info('💻  Awesome Pokemon API alive')
  console.info(`📡  PORT: http://localhost:3000`)
  console.info('>'.repeat(40) + '\n')
})

mongoose.connect(
  process.env.MONGO_URL || 'mongodb://localhost:27017/',
  {
    dbName: 'pokemon',
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      throw new Error(err)
    }
    console.info('💾 Connected to Mongo Database \n')
  }
)