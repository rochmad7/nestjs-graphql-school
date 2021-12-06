import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/entities/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1/nest-school',
      useUnifiedTopology: true,
      synchronize: true,
      entities: [Lesson, Student],
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
