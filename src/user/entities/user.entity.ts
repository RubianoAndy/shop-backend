import { IsEmail } from "class-validator";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ default: false })
    activated: boolean;

    @Column({ unique: true, length:100 })
    @IsEmail()
    email: string;

    @Column({ length:100 })
    password: string;

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;
}