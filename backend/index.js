

// const express=require('express');
// const cors=require('cors')
// const mongoose=require('mongoose');
// const app=express();
// const PORT=8000;
// const bcrypt = require('bcrypt');
// const User = require('./models/UserModels');
// app.use(cors());
// app.use(express.json());

// ********************mongodb connection*******************

//app.use(express.urlencoded());
// mongoose.connect('mongodb://localhost:27017/UserDashboard')//mongodb://localhost:27017=>eske bad koi name dal dete hai
// .then(()=> console.log('connected to db'))
// .catch((error)=> console.log(error.message));

// ************vercle connection********************
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/UserModels');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend running successfully on Vercel 🚀");
});

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ❌ app.listen() MAT LIKHNA (Vercel ke liye)
// const PORT = 8000;
// app.listen(PORT, () => console.log("Server running"));

// ✅ LAST LINE — EXPORT APP
module.exports = app;




//***********dhruv sir****************** */
// app.get('/',function(req,res){
//     res.send("server is running");
// });
app.post('/create-user', async function(req,res){//post api creating
    try{
        const{name,email,password,role,url}=req.body;
        if(!name || !email || !password || !role ||!url){
         return  res.json({err:'All field are required',status:'false'})
        }
        const hashedPassword= await bcrypt.hash(password,5)
        const Nayauser= new User({
             name:name,
             email:email,
             password:hashedPassword,
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

app.get('/user/:id' , async function(req, res){
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.json({err: 'No user found', status: 'false'})
        }
        res.json({message: 'All users fetched successfuly', user, status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})



app.delete('/delete/:id', async function(req, res) {
    try {
        const {id} = req.params;
        console.log(id)
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            res.json({err: error.message, status: 'false'})
        }
        res.json({message: 'User deleted successfuly', status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})


app.put('/update/:id', async function(req, res){
    try {
        const {id} = req.params;
        const {name, email, password} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password
        }, {new: true});
        if(!updatedUser){
            res.json({err: 'Cannot able to edit user', status: 'false'})
        }
        res.json({message: 'User updated successfuly', status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

module.exports = app;

// app.listen(PORT,()=>console.log('server is listing on port 8000'));
