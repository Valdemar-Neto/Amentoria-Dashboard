import { StudySession } from "./study-session.entity";

describe('StudySession entity', () => {
    it("Shoul create a valid session", () => {
        const sessiont = StudySession.create({
            studentId: 'ABC',
            minutes: 50,
            subject: 'Química',
            category: 'AULA',
            date: new Date(),
        });

        expect(sessiont.minutes).toBe(50);
    })

    it("should reject negative minutes", () => {
        expect(() => {
            StudySession.create({
                studentId: 'abc',
                minutes: -10,
                subject: '',
                category: 'EXERCICIO',
                date: new Date(),
            });
        }).toThrow("O tempo de estudo deve ser positivo.")
    });
})