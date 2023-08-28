import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
const app = express()
// const userRouter = require('./Routes/CreateUser')
import userRouter from './Routes/CreateUser.js';
import DisplayRouter from './Routes/DisplayData.js';
import OrderDataRouter from './Routes/OrderData.js';


config({
  path:"./config.env"
})
// const mongoDB = require('./db')
import mongoDB from './db.js';
mongoDB()


//middleware


app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials :true,
}))

app.use(express.json())
//routes
app.use('/api/v1',userRouter);
app.use('/api/v1',DisplayRouter);
app.use('/api/v1',OrderDataRouter);

app.get('/', (req, res) => {
  res.send('yollow wohooo!')
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})