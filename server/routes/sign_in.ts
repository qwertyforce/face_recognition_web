import {Request,Response} from 'express';
function sign_in (req:Request,res:Response){
	 console.log(req.body)
     console.log(req.file)
     res.send(200)
}

export default sign_in