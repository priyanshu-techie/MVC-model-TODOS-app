const Users=  require('../model/userModel');
const { validatePassword,genPassword }=require('../utilities/passportUtils');
const validator=require('validator');

module.exports={
    getLogin:(req,res)=>{
        res.render('login');
    },
    login:async (req,res,next)=>{
        try{

            // this converts the email in correct format, ex= with lowercase without spaces,etc
            req.body.email = validator.default.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
            // i could also have used res.render instead of flash, but lets learn something new 
            const user=await Users.find({ email:req.body.email });
            //if user not found
            if(!user.length){
                req.flash('errors',"Email incorrect, or user doesn't exists");
                return res.redirect('/login');
            }
            // if password incorrect
            if(!validatePassword(req.body.password,user[0].salt,user[0].hash)){
                req.flash('errors',"Password incorrect!");
                return res.redirect('/login');
            }

            next();
        }
        catch(e){
            console.log(e);
            res.redirect('/login');
        }
    },
    logout:(req,res,next)=>{
        req.logout((err)=>{
            if (err)  return next(err); 
            res.redirect('/');
          });
    },
    getSignUp:(req, res, next)=>{
        res.render('signup',{err:false});
    },
    signUp:async (req,res)=>{
        // here i have used res.render instead of flash

        try{
            //if pass!=cnfrmpass
            if(req.body.password!==req.body.confirmPassword){
                return res.render('signup',{err:true,msg:"Password and Confirm Password do not match!"})
            }

            // if password length less that 8 chars
            if(!validator.default.isLength(req.body.password,{min:8})){
                return res.render('signup',{err:true,msg:"Password must be minimum 8 characters!"});
            }

            // this converts the email in correct format, ex= with lowercase without spaces,etc
            req.body.email = validator.default.normalizeEmail(req.body.email, { gmail_remove_dots: false });

            // if(user already exist)
            const user=await Users.find({email:req.body.email});
            if(user.length!=0){
                return res.render('signup',{err:true,msg:"User already exists! Try another email or Login if have an account. "})
            }
    
            const passDetails= genPassword(req.body.password);
            const newUser=await Users.collection.insertOne({name:req.body.username, email:req.body.email, salt:passDetails.salt, hash:passDetails.hash});
            req.login(newUser, function(err) {
                if (err) { return next(err); }
                res.redirect('/todos');
              });
        }
        catch(e){
            res.render('signup',{err:true,msg:"Some error occoured!!"})
            console.log(e);
        }
    }
}