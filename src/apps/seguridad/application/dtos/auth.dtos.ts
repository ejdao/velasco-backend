import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { STRING_UTILITIES } from '@common/application/services';
import { CTM_CONTEXTS, CtmContexts, type CtmContextCode } from '@common/domain/types';

export class FetchEnterprisesDto {
  @IsOptional()
  @ApiProperty({ example: CTM_CONTEXTS.DEFAULT.getCode() })
  @IsEnum(CtmContexts, {
    message: `${STRING_UTILITIES.enumToString(CtmContexts)}`,
  })
  contextCode!: CtmContextCode;

  @ApiProperty({ example: 'admin@velascoalq.com' })
  @IsString()
  username!: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password!: string;
}

export class LoginUsuarioDto {
  @ApiProperty({ example: CTM_CONTEXTS.DEFAULT.getCode() })
  @IsEnum(CtmContexts, {
    message: `${STRING_UTILITIES.enumToString(CtmContexts)}`,
  })
  contextCode!: CtmContextCode;

  @ApiProperty({ example: '001' })
  @IsString()
  enterpriseCode!: string;

  @ApiProperty({ example: 'admin@velascoalq.com' })
  @IsString()
  username!: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password!: string;
}
