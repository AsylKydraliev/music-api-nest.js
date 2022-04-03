import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  title: string;
  @Prop({ ref: 'Artist', required: true })
  artist_id: mongoose.Schema.Types.ObjectId;
  @Prop()
  year: string;
  @Prop()
  image: string;
  @Prop({ required: true, default: false })
  isPublished: boolean;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
