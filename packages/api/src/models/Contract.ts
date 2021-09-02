import { IsString } from 'class-validator'

export class CreateFeedDto {
  @IsString()
  public nodeAddress: string

  @IsString()
  public type: string
}
