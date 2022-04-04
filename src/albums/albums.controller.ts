import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  getAll(@Req() req: Request) {
    const query = {
      artist_id: null,
    };
    if (req.query.artist_id) {
      query.artist_id = { _id: req.query.artist_id };

      return this.albumModel.find(query).populate('artist_id', 'title');
    }
    return this.albumModel.find();
  }

  @Get(':id')
  GetByArtist(@Param('id') id: string) {
    return this.albumModel.findOne({ _id: id });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      title: albumDto.title,
      artist_id: albumDto.artist_id,
      year: albumDto.year,
      isPublished: albumDto.isPublished,
      image: file ? '/uploads/albums/' + file.filename : null,
    });

    await album.save();

    return album;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumModel.findByIdAndRemove({ _id: id });
  }
}
