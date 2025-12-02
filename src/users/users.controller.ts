import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User successfully created',
    schema: {
      example: {
        ID: 1,
        email: 'john@example.com',
        username: 'johndoe',
        password: 'hashedPassword123',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation Error',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed',
        errors: ['email must be an email', 'email already exists'],
        timestamp: '2025-01-01T10:00:00.000Z',
        path: '/users',
      },
    },
  })
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  // GET all
  @Get()
  @ApiOkResponse({
    description: 'Return an array of all users',
    schema: {
      example: [
        {
          ID: 1,
          email: 'john@example.com',
          username: 'johndoe',
          password: 'hashedPassword123',
        },
        {
          ID: 2,
          email: 'jane@example.com',
          username: 'janesmith',
          password: 'hashedPassword456',
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Error',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid request',
        errors: ['Invalid query parameters'],
        timestamp: '2025-01-01T10:00:00.000Z',
        path: '/users',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Server error while fetching users',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal Server Error',
        errors: ['Database connection failed'],
        timestamp: '2025-01-01T10:00:00.000Z',
        path: '/users',
      },
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  // GET one
  @Get(':id')
  @ApiOkResponse({
    description: 'Return a single user',
    schema: {
      example: {
        ID: 1,
        email: 'john@example.com',
        username: 'johndoe',
        password: 'hashedPassword123',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        errors: ['No user exists with the provided ID'],
        timestamp: '2025-01-01T10:00:00.000Z',
        path: '/users/1',
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User updated successfully',
    schema: {
      example: {
        ID: 1,
        email: 'john.updated@example.com',
        username: 'johndoe_updated',
        password: 'hashedPassword123',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        errors: ['No user exists with the provided ID'],
        timestamp: '2025-01-01T10:00:00.000Z',
        path: '/users/1',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation Error',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed',
        errors: ['email must be an email', 'email already exists'],
        timestamp: '2025-01-01T10:00:00.000Z',
        path: '/users/1',
      },
    },
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  // DELETE
  @Delete(':id')
  @ApiOkResponse({
    description: 'User removed successfully',
    schema: {
      example: {
        message: 'User removed successfully',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        errors: ['No user exists with the provided ID'],
        timestamp: '2025-01-01T10:00:00.000Z',
        path: '/users/1',
      },
    },
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}