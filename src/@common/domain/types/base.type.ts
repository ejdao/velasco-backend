import { ApiProperty } from '@nestjs/swagger';

export class CtmType<T> {
  constructor(
    private code: T,
    private forHumans: string,
    private abbreviation?: string
  ) {}

  public getCode(): T {
    return this.code;
  }

  public getForHumans(): string {
    return this.forHumans;
  }

  public getAbbreviation(): string | undefined {
    return this.abbreviation;
  }
}

export class CtmTypeRes {
  @ApiProperty()
  code!: number;
  @ApiProperty()
  forHumans!: string;
  @ApiProperty({ example: 'string (opcional)' })
  abbreviation!: string;
}
