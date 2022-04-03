import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './create-artist.dto';

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
  async create(@Body() artistDto: CreateArtistDto) {
    const artist = new this.artistsModel({
      title: artistDto.title,
      photo: artistDto.photo,
      info: artistDto.info,
      isPublished: artistDto.isPublished,
    });

    await artist.save();

    return artist;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { message: `Artist id: ${id}` };
  }
}
