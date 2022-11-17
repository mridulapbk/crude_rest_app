
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
//import { encodePassword } from 'src/utils/bcrypt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entity/user.entity';
const crypto = require("crypto");


export class UserService {
  getByEmail() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ) { }

  //creating a user
  async createUser(user: User): Promise<User> {
   // const password = encodePassword(user.password);
    const saltOrRounds = 10;
   // const password = 'random_password';
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    console.log(hash);
    const newUser = new this.userModel(user);
    return newUser.save()
  }

  //Get userby Id
  async readUserById(id) {
    return this.userModel.findById(id)
      .then((user) => { return user })
      .catch((err) => console.log(err));
  }
  //Get all users
  async readUser() {
    return this.userModel.find({})
      .then((user) => { return user })
      .catch((err) => console.log(err));
  }

  //update the data
  async updateUser(id, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true })
  }


  //update the data
  //  async updateUser(userName,data):Promise<User>{
  //   return this.userModel.findOneAndUpdate(userName,data,{new:true})
  // }

  //delete the data
  async deleteUser(email) {
    return this.userModel.remove({ $and: [{ isActive: true }, { email: email }] }).exec()


  }
  // getUserByUserName(userName:string):User{
  //   return this.userModel.find(predicate:(user:User)=>user.userName===userName)
  // }
  async loginUser(email: string, password: string, role: string) {
    const user = await this.userModel.find({ $and: [{ isActive: true }, { password: password, email: email, role: role }] }).exec()
    if (user.length != 0) {
      return user;
    }
    else {
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async registerUser(userName: string, lastName: string, amount: string, password ) {
    const user = await this.userModel.find({ $and: [{ isActive: true }, {userName: userName, lastName: lastName, amount: amount, }] }).exec()
    if (user.length != 0) {
      return user;
    }
    else {
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
  }
}



const id = crypto.randomBytes(16).toString("hex");

console.log(id); // => f9b327e70bbcf42494ccb28b2d98e00e
function getRandom(length) {

  return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  
  }