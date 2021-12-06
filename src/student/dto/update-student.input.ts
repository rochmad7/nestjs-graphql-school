import { CreateStudentInput } from './create-student.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
