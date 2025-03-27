const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const app=express();
const connectTOdb=require('./db/db');
connectTOdb();
app.use(cors());
const cookieParser=require('cookie-parser');
app.use(cookieParser());
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send('hi anil');

})
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.listen(3000);

module.exports=app;