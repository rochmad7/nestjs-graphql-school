import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [StudentType], { name: 'students' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => StudentType, { name: 'student' })
  findOne(@Args('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Boolean)
  updateStudent(
    @Args('id') id: string,
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(id, updateStudentInput);
  }

  @Mutation(() => Boolean)
  removeStudent(@Args('id') id: string) {
    return this.studentService.remove(id);
  }
}
