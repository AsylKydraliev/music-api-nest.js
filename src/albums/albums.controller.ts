import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  getAll() {
    return this.albumModel.find();
  }

  @Get(':id')
  GetByArtist(@Param('id') id: string) {
    return this.albumModel.findOne({ _id: id });
  }

  @Post()
  async create(@Body() albumDto: CreateAlbumDto) {
    const album = new this.albumModel({
      title: albumDto.title,
      artist_id: albumDto.artist_id,
      year: albumDto.year,
      image: albumDto.image,
      isPublished: albumDto.isPublished,
    });

    await album.save();

    return album;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumModel.findByIdAndRemove({ _id: id });
  }
}
