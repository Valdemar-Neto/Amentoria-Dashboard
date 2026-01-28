import { Entity } from "./entities";

export interface StudySessionProps{
    studentID: string;
    minutes: number;
    category: 'AULA'|'EXERCICIO'|'REVISAO';
    date: Date;
}

export class StudySession extends Entity<StudySessionProps>{
    private constructor(props: StudySessionProps, id?: string){
        super(props, id);
    }

    static create(props: StudySessionProps, id?: string){
        if(props.minutes <= 0){
            throw new Error("O tempo de estudo deve ser positivo.");
        }

        if(props.minutes > 1440){
            throw new Error("Tempo de estudo inválido (maior que 24h).");
        }

        return new StudySession(props, id);
    }

    get minutes(){return this.props.minutes;}
    get category(){return this.props.category;}
    get date(){return this.props.date;}
}