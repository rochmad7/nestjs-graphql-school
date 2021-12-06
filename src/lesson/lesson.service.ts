import { Injectable } from '@nestjs/common';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AssignStudentsInput } from './dto/assign-students.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async create(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuidv4(),
      ...createLessonInput,
    });
    return this.lessonRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findOne(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async update(id: string, updateLessonInput: UpdateLessonInput) {
    const updatedLesson = await this.lessonRepository.update(
      { id },
      updateLessonInput,
    );

    return updatedLesson.affected === 1;
  }

  async remove(id: string) {
    const deletedStudent = await this.lessonRepository.delete({ id });

    return deletedStudent.affected === 1;
  }

  async assignStudents(
    assignStudentsInput: AssignStudentsInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsInput;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    // lesson.students = [...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
