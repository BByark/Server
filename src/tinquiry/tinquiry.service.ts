import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './schemas/teacher.schema';
import { Meeting } from './schemas/meeting.schema'; 

@Injectable()
export class TinquiryService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Meeting.name) private meetingModel: Model<Meeting>, 
  ) {}

  async getTeacherById(id: string): Promise<{ teacher: Teacher; meetings: Meeting[] }> {
    const teacher = await this.teacherModel.findOne({ username: id }).exec();
    if (!teacher) {
      throw new NotFoundException('교사를 찾을 수 없습니다.');
    }

    const meetings = await this.meetingModel.find({ class: teacher.class }).exec();
    
    return { teacher, meetings };
  }
}
