import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AssignStudentsToLesson, CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, studentIds } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      studentIds,
    });

    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(
    assignStudentsToLesson: AssignStudentsToLesson,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLesson;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    console.log('studentIds', studentIds);
    console.log('lesson.students', lesson.studentIds);
    lesson.studentIds = [...lesson.studentIds, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
