import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const userExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(user);

      const profile = this.profileRepository.create({
        name_1: createUserDto.name_1,
        lastname_1: createUserDto.lastname_1,
        user: savedUser,
      });

      await this.profileRepository.save(profile);

      return { message: 'User created' };
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
