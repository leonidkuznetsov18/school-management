import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MinLength } from 'class-validator';

@InputType()
class CreateLessonInput {
  @MinLength(4)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(type => [ID], { defaultValue: [] })
  studentIds: string[];
}

@InputType()
class AssignStudentsToLesson {
  @IsUUID('4') // v4 from uuid
  @Field(type => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field(type => [ID])
  studentIds: string[];
}

export { CreateLessonInput, AssignStudentsToLesson };
