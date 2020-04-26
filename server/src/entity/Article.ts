import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Unique,
    Index,
} from 'typeorm';
import { IsFQDN } from 'class-validator';
import Source from './Source';

@Entity()
export default class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Source, source => source.articles)
    source: Source;

    @Index({ unique: true })
    @Column({ type: "mediumtext" })
    @IsFQDN()
    url: string;

    @Column({ type: 'longtext', nullable: true})
    title: string;

    @Column({ nullable: true })
    author: string;

    @Column({ type: 'longtext', nullable: true })
    description: string;

    @Column({ nullable: true, type: 'longtext' })
    imageUrl: string;

    @Column({
        type: 'timestamp',
    })
    published: Date;

    @Column({ type: 'longtext', nullable: true })
    content: string;

    @Column({ type: 'double precision' })
    sentiment: number;
}
