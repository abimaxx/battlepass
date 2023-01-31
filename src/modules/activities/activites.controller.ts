import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateActivitesDTO } from './activites.dto'
import { ActivitiesService } from './activites.service'

@Controller('activity')
@ApiTags('User')
export class ActivitiesController {
  constructor(public readonly userService: ActivitiesService) {}

  @Post('add-activity')
  async addActivity(@Body() createActivitesDTO: CreateActivitesDTO) {
    await this.userService.addActivities(createActivitesDTO)
  }
}
