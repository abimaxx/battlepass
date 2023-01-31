import { Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AddUserDTO, UpdateUserActivityDTO } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Post('add-user')
  async addUser(@Query() addUserDto: AddUserDTO) {
    return await this.userService.addUser(addUserDto)
  }

  @Post('activity')
  async updateActivities(@Query() updateUserActivityDTO: UpdateUserActivityDTO) {
    return await this.userService.updateActivities(updateUserActivityDTO)
  }

  @Get('user-activity')
  async userActivities(@Query('userId') userId: string) {
    return await this.userService.getUserActivities(userId)
  }

  @Get('user-activity-status')
  async userActivityStatus(@Query('userId') userId: string) {
    return await this.userService.getUserActivityStatus(userId)
  }

  // @Get('tst')
  // async tet() {
  //   const totalxp = await getTotalXP('3a2e7f08-30a9-4f76-a125-2be69f570c9b', ActivitiesTypeEnum.completedActivity)
  //   return totalxp
  // }

  @Get('my-vault')
  async myVault(@Query('userId') userId: string) {
    return await this.userService.myVault(userId)
  }
}
