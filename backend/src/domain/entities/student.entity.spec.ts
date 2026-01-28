import { Student } from "./student.entity";

describe('Student Entity', ()=> {
    it("Should be able create a new student", () => {
        const student = Student.create({
            name : 'João Vestibulando',
            email: 'joao@mentoria.com.br',
            password: 'minhasenhaesegura'
        });

        expect(student).toBeTruthy();
        expect(student.id).toBeDefined();// verifica se o uuid foi gerado corretamente
        expect(student.createdAt).toBeInstanceOf(Date); // verifica se a data foi gerada como data
    })

    it('should NOT be able to create a student with invalid email', () => {
        expect(() => {
            Student.create({
                name: 'João Sem Email',
                email: 'joao-email-errado', // Email sem @ ou domínio
                password: '123456'
            });
        }).toThrow('O email fornecido é inválido.');
    });

    it('should not be to able creaate a student with short password', () => {
        expect(() => {
            Student.create({
                name: 'Vitor Medicina Ufrn',
                email: 'vitor.goncalves@mentoria.com',
                password: '123'
            });
        }).toThrow("A senha deve ter pelo menos 6 caracteres");
    })


})