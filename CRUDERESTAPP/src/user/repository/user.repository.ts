import { ConflictException, Inject, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientSession, Model } from "mongoose";
import { userInfo } from "os";
import { UserUpdateDto } from "../dto/user.dto";
import { User } from "../entity/user.entity";
import {Logger} from './../../common/core.module';


export class UserRepository{
    constructor(
        @InjectModel(User.name) private readonly customerModel:Model<User>,
        @Inject(Logger) private readonly logger:Logger){}
        async createUserDetails(createUserDto:UserUpdateDto, session:ClientSession){
            let user=await this.getUserDetailsById(createUserDto.userId);
            if(user){
                throw new ConflictException('User Details already exist.')
            }
            user=new this.customerModel({...createUserDto});
            try{
                user=await User.save({session});
                 
            }catch (error){
                throw new InternalServerErrorException(error);

            }
            if(!user){
                throw new ConflictException('User not created');
            }
            return user;
        }
        
    }
    
