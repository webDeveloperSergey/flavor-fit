import { Field, ObjectType } from '@nestjs/graphql'
import { Role } from '../../prisma/generated/models/prisma/role.enum'

@ObjectType()
export class UserModel {
  @Field()
  id: string

  @Field()
  email: string

  @Field(() => Role)
  role: Role
}

@ObjectType()
export class RegisterOutput {
  @Field()
  user: UserModel

  @Field()
  accessToken: string
}
