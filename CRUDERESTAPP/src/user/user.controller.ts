import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User } from './entity/user.entity';


@Controller('user')
export class UserController {
  getHello: any;
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  async createUser(@Body() userDto: User) {
    return this.userService.createUser(userDto)
  }
  @Get()
  readUser() {
    return this.userService.readUser()
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: UserDto
  ): Promise<User> {
    return this.userService.updateUser(id, updateData)
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id)
  }
  @Post('/login')
  async loginUser(@Body() userDto: User) {
    return this.userService.loginUser(userDto.email, userDto.password, userDto.role)
  }
  @Post('register')
  async registerUser(@Body() userDto: User) {
    return this.userService.loginUser(userDto.userName, userDto.lastName, userDto.amount, userDto.password )
  }

  
  
}