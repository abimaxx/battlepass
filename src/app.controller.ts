import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import * as path from 'path'

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  getHello(@Res() res: Response) {
    res.sendFile(path.resolve(__dirname + './../index.html'))
  }
}
