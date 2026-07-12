import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { STRING_UTILITIES } from '@common/application/services';
import * as contextTypes from '@common/domain/types';

export class FetchEnterprisesDto {
  @IsOptional()
  @ApiProperty({ example: contextTypes.CTM_CONTEXTS.DEFAULT.getCode() })
  @IsEnum(contextTypes.CtmContexts, {
    message: `${STRING_UTILITIES.enumToString(contextTypes.CtmContexts)}`,
  })
  contextCode!: contextTypes.CtmContextCode;

  @ApiProperty({ example: 'admin@velascoalq.com' })
  @IsString()
  username!: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password!: string;
}

export class LoginUsuarioDto {
  @ApiProperty({ example: contextTypes.CTM_CONTEXTS.DEFAULT.getCode() })
  @IsEnum(contextTypes.CtmContexts, {
    message: `${STRING_UTILITIES.enumToString(contextTypes.CtmContexts)}`,
  })
  contextCode!: contextTypes.CtmContextCode;

  @ApiProperty({ example: 'EMPBYDEFTO' })
  @IsString()
  enterpriseCode!: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  username!: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password!: string;
}

export class LoginClienteDto {
  @IsOptional()
  @ApiProperty({ example: contextTypes.CTM_CONTEXTS.DEFAULT.getCode() })
  @IsEnum(contextTypes.CtmContexts, {
    message: `${STRING_UTILITIES.enumToString(contextTypes.CtmContexts)}`,
  })
  contextCode!: contextTypes.CtmContextCode;

  @ApiProperty({ example: 'EMPBYDEFTO' })
  @IsString()
  enterpriseCode!: string;

  @ApiProperty({ example: '3005007792' })
  @IsString()
  phoneNumber!: string;

  @ApiProperty({ example: 'rafael@gmail.com' })
  @IsString()
  email!: string;

  @ApiProperty({ example: 'RAFAEL MENDOZA' })
  @IsString()
  fullName!: string;
}
