import User from  '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
      const {username, email, password} = req.body;

      if( 
        !username ||
        !email || 
        !password ||
        username ==='' 
        || email === '' 
        || password === ''
        ) {
           next(errorHandler(400, 'All Field Are Required'));  // error handler
          }

       const hashPassword = bcryptjs.hashSync(password, 10);   
    
      const newUser = new User({
        username,
        email,
        password: hashPassword
      });
  
        try {
          await newUser.save();
          res.json("Signup Successfully")

        } catch (error) {
          next(error);
        }


 
};


export const signin = async (req, res, next) => {
   const {email, password} = req.body;

   if(!email || !password || email == '' || password == ''){
    next(errorHandler(400, 'All Fields are required'));
   }

   try {
    const validUser = await User.findOne({ email });  // check email of user
    if (!validUser) {
        return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);  // compare password
    if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
    }
               // Authenticate User
     const token = jwt.sign( { id: validUser._id }, process.env.JWT_SECRET )    //1 create token
      const { password: pass, ...rest} = validUser._doc;         //3 we dont need passowrd of valid user
      res
        .status(200)
        .cookie('access_token', token, {
            httpOnly: true,
        })
        .json( rest );                                                                          //2 add to cookies



} catch (error) {
    return next(error);
}

}

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};