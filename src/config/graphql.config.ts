import { ConfigService } from '@nestjs/config'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { Request, Response } from 'express'
import { isDevMode } from '../utilities/isDevMode'

interface GraphQLContext {
  req: Request
  res: Response
}

export const getGraphQLConfig = (
  configService: ConfigService,
): ApolloDriverConfig => ({
  autoSchemaFile: true,
  playground: isDevMode(configService),
  sortSchema: true,
  context: ({ req, res }: GraphQLContext): GraphQLContext => ({ req, res }),
})
