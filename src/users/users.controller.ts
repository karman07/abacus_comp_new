import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { AdminCreateUserDto, AdminUpdateUserDto } from './dto/admin-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // ✅ Get all users (admin only)
  @Get()
  @Roles('admin')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // ✅ Get user by username (admin only)
  @Get(':username/username')
  @Roles('admin')
  async findByUsername(@Param('username') username: string): Promise<User | null> {
    return this.userService.findByUsername(username);
  }

  // ✅ Get user by ID (admin only)
  @Get(':id')
  @Roles('admin')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  // ✅ Create user (admin only)
  @Post()
  @Roles('admin')
  async create(@Body() user: AdminCreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  // ✅ Update user by ID (admin only)
  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateData: AdminUpdateUserDto): Promise<User> {
    return this.userService.update(id, updateData);
  }

  // ✅ Delete user by ID (admin only)
  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.userService.delete(id);
  }

  // ✅ Get logged-in user's profile (any logged-in user)
  @Get('me/profile')
  async getProfile(@Req() req) {
    return {
      username: req.user.username,
      role: req.user.role,
    };
  }
}
