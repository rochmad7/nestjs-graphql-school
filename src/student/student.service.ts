import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      id: uuidv4(),
      ...createStudentInput,
    });
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async update(
    id: string,
    updateStudentInput: UpdateStudentInput,
  ): Promise<boolean> {
    const updatedStudent = await this.studentRepository.update(
      { id },
      updateStudentInput,
    );

    return updatedStudent.affected === 1;
  }

  async remove(id: string) {
    const deletedStudent = await this.studentRepository.delete({ id });

    return deletedStudent.affected === 1;
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({ where: { id: { $in: studentIds } } });
  }
}
