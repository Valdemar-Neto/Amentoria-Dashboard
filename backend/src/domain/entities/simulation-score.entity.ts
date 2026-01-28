import { Entity } from "./entities";

export interface SimulationScoreProps{
    studentId: string;
    subject: string;
    score: number;
    date: Date;
}

export class SimulationScore extends Entity<SimulationScoreProps>{
    private constructor(props: SimulationScoreProps, id?: string){
        super(props, id);
    }

    static create(props: SimulationScoreProps, id?: string){
        if(props.score < 0 || props.score> 1000){
            throw new Error("A nota deve estar entre 0 e 1000.");
        }

        if(!props.studentId){throw new Error("ID do aluno é obrigatório.")}
        if(!props.subject || props.subject.trim().length<2){
            throw new Error("Matéria inválida.");
        }

        if(props.date > new Date()){
            throw new Error("A data do simulado não pode ser no futuro.");
        }

        return new SimulationScore(props, id);
    }

    // Getters do simulados

    get studentId() {return this.props.studentId;}
    get subject() {return this.props.subject;}
    get score() {return this.props.score;}
    get date() {return this.props.date;}
}