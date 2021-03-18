import {Request,Response} from 'express';
async function sign_up (req:Request,res:Response){
	 console.log(req.body.username)
     console.log(req.file)
     res.sendStatus(200)
}

export default sign_up