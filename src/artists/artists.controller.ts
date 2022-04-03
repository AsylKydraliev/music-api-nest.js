import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('artists')
export class ArtistsController {
  @Get()
  getAll() {
    return { message: 'Hello' };
  }
  @Post()
  create() {
    return { message: 'Create artist' };
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return { message: `Artist id: ${id}` };
  }
}
