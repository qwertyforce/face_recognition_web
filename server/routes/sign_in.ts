import {Request,Response} from 'express'
import config from '../../config/config'
import axios from 'axios'
import FormData from 'form-data'

async function sign_in (req:Request,res:Response){
	 console.log(req.body)
     console.log(req.file)
     const form = new FormData();
     form.append('image', req.file.buffer, { filename: 'document' }) //hack to make nodejs buffer work with form-data
     try {
       const similar = await axios.post(`${config.python_microservice_url}/test`, form.getBuffer(), {
         headers: {
           ...form.getHeaders()
         }
       })
       return similar.data
     } catch (err) {
       console.log(err)
       return []
     }
     res.sendStatus(200)
}

export default sign_in