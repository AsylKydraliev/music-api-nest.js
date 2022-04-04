import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileInterceptor('photo', { dest: './public/uploads/artists' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
  ) {
    const artist = new this.artistsModel({
      title: artistDto.title,
      info: artistDto.info,
      isPublished: artistDto.isPublished,
      photo: file ? '/uploads/artists/' + file.filename : null,
    });

    await artist.save();

    return artist;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistsModel.findOne({ _id: id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsModel.findByIdAndRemove({ _id: id });
  }
}
