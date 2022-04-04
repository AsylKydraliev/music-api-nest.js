import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';
import { Request } from 'express';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Req() req: Request) {
    const query = { album: null };
    if (req.query.album) {
      query.album = { _id: req.query.album };
      return this.trackModel.find(query);
    }

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
