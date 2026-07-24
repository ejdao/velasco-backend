import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateAlquilerItemDto {
  @ApiProperty()
  @IsNumber()
  stockId!: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  cantidad!: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  tarifa!: number;
}

export class CreateAlquilerDto {
  @ApiProperty()
  @IsNumber()
  obraId!: number;

  @ApiProperty()
  @IsDateString()
  fechaInicio!: string;

  @ApiProperty({ type: [CreateAlquilerItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAlquilerItemDto)
  detalle!: CreateAlquilerItemDto[];
}

export class CreateAlquilerCorteDto {
  @ApiProperty()
  @IsDateString()
  fechaCorte!: string;

  @ApiProperty()
  @IsBoolean()
  isUltimoCorte!: boolean;

  @ApiProperty({ required: false, maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  observacion?: string;
}
