const express = require('express');
const cors = require("cors");
const { connection } = require('./config/db');
const { submitForm } = require('./Routing/FormSubmit');
const { ModelOfForm } = require('./Model/formModel');


const app = express();
app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.use('/form', submitForm)



app.get('/', async(req, res) => {
    const {page,limit}=req.query
    const currPage = parseInt(page || 1);
  const currLimit = parseInt(limit || 3);
  const skip = (currPage - 1) * currLimit;
   try {
     const formList= await ModelOfForm.find().skip(skip).limit(parseInt(currLimit))
     res.status(200).json({mssg:"successfully get data",formList})
   } catch (error) {
    res.status(404).json({error: error})
   }
    
})

app.listen(8000, async () => {
    try {
        await connection
        console.log('connection established')
        console.log('listening on 8000')
    } catch (error) {
        console.log('error connecting')
    }

})