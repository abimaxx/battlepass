import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import * as path from 'path'
import * as compression from 'compression'
import * as basicAuth from 'express-basic-auth'
import * as helmet from 'helmet'
import * as morgan from 'morgan'

import { AppModule } from './app.module'
import { setupSwagger } from './swagger'
import { ConfigService } from 'shared/services/config.service'
import { SharedModule } from 'shared/shared.module'
// import { NewrelicInterceptor } from 'newrelic.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: JSON.parse(process.env.LOGGER),
  })
  const configService = app.select(SharedModule).get(ConfigService)

  app.enable('trust proxy')
  app.use(helmet())
  app.use(compression())
  app.use(
    '/documentation',
    basicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    })
  )
  app.use(morgan('combined'))
  setupSwagger(app)
  //to create a ui
  app.setBaseViewsDir(path.join(__dirname, '..', 'templates'))
  app.setViewEngine('ejs')

  // app.useGlobalInterceptors(new NewrelicInterceptor())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      validationError: {
        target: false,
      },
    })
  )
  await app.listen(configService.get('PORT'))
  console.log('Server running at port', configService.get('PORT'))
}
bootstrap()
