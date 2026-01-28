import { Entity } from "./entities";

export interface StudySessionProps {
  studentId: string;
  minutes: number;
  subject: string; // <--- NOVO CAMPO: Ex: 'Matemática', 'História'
  category: 'AULA' | 'EXERCICIO' | 'REVISAO'; 
  date: Date;
}

export class StudySession extends Entity<StudySessionProps> {
  private constructor(props: StudySessionProps, id?: string) {
    super(props, id);
  }

  static create(props: StudySessionProps, id?: string) {
    if (props.minutes <= 0) {
      throw new Error('O tempo de estudo deve ser positivo.');
    }
    
    if (props.minutes > 1440) {
        throw new Error('Tempo de estudo inválido (maior que 24h).');
    }

    // Validação do novo campo
    if (!props.subject || props.subject.trim().length < 2) {
        throw new Error('A matéria estudada é obrigatória.');
    }

    return new StudySession(props, id);
  }

  get studentId() { return this.props.studentId; }
  get minutes() { return this.props.minutes; }
  get category() { return this.props.category; }
  get subject() { return this.props.subject; }
  get date() { return this.props.date; }
}