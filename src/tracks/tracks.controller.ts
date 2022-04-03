import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll() {
    return this.trackModel.find();
  }

  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      title: trackDto.title,
      album: trackDto.album,
      duration: trackDto.duration,
      isPublished: trackDto.isPublished,
    });

    await track.save();

    return track;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackModel.findByIdAndRemove({ _id: id });
  }
}
