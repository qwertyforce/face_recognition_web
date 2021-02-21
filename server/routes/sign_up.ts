import {Request,Response} from 'express';
function sign_up (req:Request,res:Response){
	 console.log(req.body.username)
     console.log(req.file)
     res.send(200)
}

export default sign_up