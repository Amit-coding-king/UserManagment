

const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const app=express();
const PORT=8000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/UserModels');
app.use(cors({
    origin: 'https://user-managmentdashboard.vercel.app',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}));
app.use(express.json());
const secret_key='ffvygbh398u*&*bhn';


// ********************mongodb connection*******************

app.use(express.urlencoded());
mongoose.connect('mongodb+srv://amit:amitkumar@cluster0.gaouu2a.mongodb.net/?appName=Cluster0/UserDashboard')//mongodb://localhost:27017=>eske bad koi name dal dete hai
.then(()=> console.log('connected to db'))
.catch((error)=> console.log(error.message));





//***********dhruv sir**********
app.get('/',function(req,res){
    res.send("server is running");
});


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
    }
    catch(error){
     res.json({err:err.message,status:'false'})
    }
})

//db se data nikal raha hai
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
app.post('/signup', async function(req,res){
try{
    const{name,email,password}=req.body;
    if(!name || !email || !password ){
        return res.json({err:'All field are required',status:'false'})
    }
    const hashedPassword= await bcrypt.hash(password,10)

    const nayaUser= new User({
        name:name,
        email:email,
        password:hashedPassword
    })
    await nayaUser.save()
    const token = jwt.sign({id:nayaUser._id},secret_key,{expiresIn: '7d'})

    res.json({message:'signup succsefully', status:'true' ,token})


}catch(error){
    res.json({err: error.message, status:'false'})
}

})

app.post('/login', async function(req, res){
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({err: 'All fields are required', status: 'false'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({err: 'No user found', status: 'false'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.json({err: 'Invalid password', status: 'false'})
        }
        const token = jwt.sign({id: user._id}, secret_key, {expiresIn: '7d'})
        res.json({message: 'Login successfully', status: 'true', token})
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
            res.json({err: 'Cannot able to edit user', statsu: 'false'})
        }
        res.json({message: 'User updated successfuly', status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})
 
//** vercel */
 //module.exports = app;

app.listen(PORT,()=>console.log('server is listing on port 8000'));
