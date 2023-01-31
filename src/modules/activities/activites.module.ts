import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserActivitiesRepository } from 'modules/user/user.repository'
import { ActivitiesController } from './activites.controller'
import { ActivitesRepository as ActivitiesRepository } from './activites.repository'
import { ActivitiesService } from './activites.service'

@Module({
  imports: [TypeOrmModule.forFeature([ActivitiesRepository, UserActivitiesRepository])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
