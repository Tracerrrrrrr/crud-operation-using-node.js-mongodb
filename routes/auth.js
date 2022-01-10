const bcrypt = require('bcryptjs/dist/bcrypt');
const express= require('express');
const router = express.Router();
const User= require('../models/db')




router.post('/register',async(req,res)=>{
const {name,address,email,phone,work,password}=req.body;
if(!name||!address||!email||!phone||!work||!password){
        return res.status(422).json({error:"please fill the field properly"})
}
try
{
   const userExist=  await User.findOne({email:email}) 
   if(userExist)
   {
           return res.status(200).json({error:"Email Already Exists"})
   }
   const user= new User({name,address,email,phone,work,password})
   const saveUser= await user.save();
   if(saveUser)
   {
      return res.status(200).json({message:"User registered Successfully"})
   }
   else
   {
             return res.status(422).json({error:"User not registered"})
   }

}
catch(err) {
   console.log(err);
}
});
router.post('/login',async(req,res)=>{
                
                try{
                 const{email,password}=req.body;
                if(!email||!password){
                        return res.json({message:"Please fill valid email and password"})
                }
                    const userLogin= await User.findOne({email:email})
                    if(userLogin)
                    {
                        const isMatch= await bcrypt.compare(password,userLogin.password)
                        if(!isMatch)
                        {
                                return res.json({error:"Invalid Credentails"})
                        }
                        else
                        {
                                return res.json ({message:"User logged in Successfully"})
                        }
                    }
                    else
                    {
                            return res.status(422).json({error:"User not logged in"})
                    }
                    
                }
                catch(err)
                {
                 console.log(err);
                }
        })

router.put('./api/put',(req,res)=>{
        const password= req.body.password;
         
})
module.exports =router;