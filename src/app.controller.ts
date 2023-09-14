import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // private readonly appService: AppService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Post('redis')
  async testAddKey() {
    this.cacheManager.set('key1', 'value1');
  }
  @Get('redis')
  async testGetKey() {
    return await this.cacheManager.get('key1');
  }
}
