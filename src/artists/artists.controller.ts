import { Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name) private artistsModel: Model<ArtistDocument>,
  ) {}

  @Get()
  getAll() {
    return this.artistsModel.find();
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
