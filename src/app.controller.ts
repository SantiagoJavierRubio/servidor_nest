import {
  Controller,
  Get,
  Res,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { ViewAuthFilter } from './auth/auth.filter';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async renderMain(@Res() res: Response, @Request() req) {
    res.render('main.hbs', {
      username: req.user,
    });
  }
}
