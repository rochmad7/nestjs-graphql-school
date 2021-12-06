import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { AssignStudentsInput } from './dto/assign-students.input';
import { Lesson } from './entities/lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.create(createLessonInput);
  }

  @Query(() => [LessonType], { name: 'lessons' })
  findAll() {
    return this.lessonService.findAll();
  }

  @Query(() => LessonType, { name: 'lesson' })
  findOne(@Args('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Mutation(() => Boolean)
  updateLesson(
    @Args('id') id: string,
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
  ) {
    return this.lessonService.update(id, updateLessonInput);
  }

  @Mutation(() => Boolean)
  removeLesson(@Args('id') id: string) {
    return this.lessonService.remove(id);
  }

  @Mutation(() => LessonType)
  assignStudents(
    @Args('assignStudentsInput') assignStudentsInput: AssignStudentsInput,
  ) {
    return this.lessonService.assignStudents(assignStudentsInput);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
