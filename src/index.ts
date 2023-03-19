import * as dotenv from 'dotenv'
const NODE_ENV = process.env.NODE_ENV ?? 'production'
if (NODE_ENV !== 'production') {
  dotenv.config()
}

import express from 'express'
import root from './routes/root'
import course from './routes/course'

const app = express()

app.use(express.json())

// ルーティング設定
app.use('/api', root)
app.use('/api/courses', course)

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
