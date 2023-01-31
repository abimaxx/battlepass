import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

import { UserModule } from './modules/user/user.module'
import { ProductModule } from 'modules/product/product.module'
import { BattlePassModule } from 'modules/battlepass/battle-pass.module'
import { ActivitiesModule } from 'modules/activities/activites.module'

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder().setTitle('OWENS BACKEND DOCUMENTATION').setVersion('8').addBearerAuth().build()

  const document = SwaggerModule.createDocument(app, options, {
    include: [UserModule, ProductModule, BattlePassModule, ActivitiesModule],
  })
  SwaggerModule.setup('documentation', app, document)
}
