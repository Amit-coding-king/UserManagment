const express=require('express');

const cors=require('cors');

const mongoose=require('mongoose');

const app=express();

const PORT=8000;

const User = require('./models/UserModels');
app.use(cors());
app.use(express.json());

//app.use(express.urlencoded());
mongoose.connect('mongodb://localhost:27017/UserDashboard')
.then(()=> console.log('connected to db'))
.catch((error)=> console.log(error.message));
app.get('/',function(req,res){
    res.send("server is running")
}
)
app.post('/create-user', async function(req,res){
    try{
        const{name,email,password,role,url}=req.body;
        if(!name || !email || !password || !role ||!url){
         return  res.json({err:'All field are required',status:'false'})
        }
        const Nayauser= new User({
             name:name,
             email:email,
             password:password,
             role:role,
             url:url
        })
        await Nayauser.save()
        res.json({message: 'user saved successfully',status:'true'})
    }catch(error){
     res.json({err:err.message,status:'false'})
    }
})
app.get('/users', async function(req,res){
    try{
      const allUsers=await User.find();
       res.json({message: 'All user fetch successfully',  users: allUsers, status:'true'})
    }catch(error){
          res.json({err:error.message, status:'false'})
    }
})
app.listen(PORT,()=>console.log('server is listing on port 8000'));
