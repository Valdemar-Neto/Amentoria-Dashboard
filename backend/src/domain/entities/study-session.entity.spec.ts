import { createGunzip } from "zlib";
import { StudySession } from "./study-session.entity";

describe('StudySession entity', () => {
    it("Shoul create a valid session", () => {
        const sessiont = StudySession.create({
            studentID: 'ABC',
            minutes: 50,
            category: 'AULA',
            date: new Date(),
        });

        expect(sessiont.minutes).toBe(50);
    })

    it("should reject negative minutes", () => {
        expect(() => {
            StudySession.create({
                studentID: 'abc',
                minutes: -10,
                category: 'EXERCICIO',
                date: new Date(),
            });
        }).toThrow("O tempo de estudo deve ser positivo.")
    });
})