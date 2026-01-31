import { Entity } from "./entities";

export interface StudentProps{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export class Student extends Entity<StudentProps>{
    private constructor(props: StudentProps, id?: string){
        super(props, id);
    }

    //Create a new student with validation and date now

    static create(props: Omit<StudentProps, 'createdAt'> & {createdAt?: Date},  id?: string){

        //Name's Validation
        if(!props.name || props.name.trim().length < 3){
            throw new Error("The student's name must be at least 3 characters long");
        }

        //Email's Validation

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(props.email)){
            throw new Error("O email fornecido é inválido.");
        }

        // Password's Validation

        if(props.password.length<6){
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }

        const student = new Student({...props, createdAt: props.createdAt ?? new Date(),}, id);

        return student;
    }

    // Getters para acessar as props 

    get name(){return this.props.name;}
    get email(){return this.props.email;}
    get password(){return this.props.password;}
    get createdAt(){return this.props. createdAt;}

    // Set para atualizar nome

    public updateName(newName: string){
        if(newName.trim().length<3){
            throw new Error("O nome do aluno deve ter pelo menos 3 caracteres")
        }

        this.props.name = newName;
    }
}