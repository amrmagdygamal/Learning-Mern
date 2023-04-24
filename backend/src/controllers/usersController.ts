import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from '../moduls/users';
import bcrypt from 'bcrypt';


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUser = req.session.userId;

  try {
    
    if(!authenticatedUser) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await UserModel.findById(authenticatedUser).select("+email").exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}


interface singUpBody {
  username?: string,
  email?: string, 
  password?: string,
}

export const signUp: RequestHandler<unknown, unknown, singUpBody, unknown> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.email;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(409, "parameters missing");
    }

    const existingUserName = await UserModel.findOne({username: username}).exec();

    if (existingUserName) {
      throw createHttpError(409, "username already taken, Please choose a different one.");
    }


    const existingEmail = await UserModel.findOne({email: email}).exec();

    if(existingEmail) {
      throw createHttpError(409, "email already taken, Please choose a different one.");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}; 


interface loginBody {
  username?: string,
  password?: string
}

export const login: RequestHandler<unknown, unknown, loginBody, unknown> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {

    if (!username || !password) {
      throw createHttpError(400, "parameters missing");
    }

    const user = await UserModel.findOne({username: username}).select("+password +email").exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;

    res.status(201).json(user);
    
  } catch (error) {
    next(error);
  }
};


export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy(error => {
    if(error) {
      next(error);

    }else {
      res.sendStatus(200);
    }
  })

}