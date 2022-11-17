
import { Module, Options } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entity/user.entity';

import { UserController } from './user.controller';

import { UserService } from './user.service';







@Module({

  imports:[

    MongooseModule.forRoot('mongodb+srv://Mridula1:fNMCn0ThVKtQ94JG@cluster0.mqyvzt2.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name: 'user' ,schema:UserSchema}])
  ],

 

  controllers: [UserController],

  providers: [UserService],

})

export class UserModule {

  constructor(private userService: UserService) {}

}


