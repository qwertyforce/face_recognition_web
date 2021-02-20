import {Request,Response} from 'express';
function sign_up (req:Request,res:Response){
	 console.log(req.body)
     res.send(200)
}

export default sign_up