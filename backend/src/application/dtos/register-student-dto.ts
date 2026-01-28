export interface RegisterStudentInput{
    name: string;
    email: string;
    password: string;
}

export interface RegisterStudentOutput{
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}