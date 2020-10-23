import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';

import Person from '@modules/persons/infra/typeorm/entities/Person';
import Student from '@modules/students/infra/typeorm/entities/Student';

@Entity('relationships')
export default class Relationship {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    kinship: string;

    @Column()
    person_id: string;

    @Column()
    student_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Person, person => person.relationships)
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @ManyToOne(() => Student, student => student.relationships)
    @JoinColumn({ name: 'student_id' })
    student: Student;
}
