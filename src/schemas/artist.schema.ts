import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  title: string;
  @Prop()
  photo: string;
  @Prop()
  info: string;
  @Prop({ required: true, default: false })
  isPublished: boolean;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
