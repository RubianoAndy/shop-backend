import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "src/user/entities/user.entity";

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column()
    name_1: string;

    @Column({ nullable:true })
    name_2: string;

    @Column()
    lastname_1: string;

    @Column({ nullable:true })
    lastname_2: string;

    @Column({ nullable: true })
    identification_number: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable:true })
    prefix: number;

    @Column({ nullable: true})
    mobile: number;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: User;
}
