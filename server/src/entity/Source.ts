import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index,
} from 'typeorm';
import Article from './Article';

@Entity()
export default class Source {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    name: string;
    
    @Column({ type: 'longtext' })
    description: string;

    @Column({ type: 'mediumtext' })
    url: string;

    @Column()
    category: string;

    @Column()
    language: string;
    
    @Column()
    country: string;

    @OneToMany(type => Article, article => article.source)
    articles: Article[];
}
