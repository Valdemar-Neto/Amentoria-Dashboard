import { SimulationScore } from "./simulation-score.entity";

describe('SimulatioScore Entity', () => {
    it('Should create a valid score',() => {
        const score = SimulationScore.create({
            studentId: '123',
            subject: 'Matemática',
            score: 850,
            date: new Date(),
        });

        expect(score).toBeTruthy;
        expect(score.score).toBe(850);
    });

    it('Should throw error if score is > 1000', () => {
        expect(() => {
            SimulationScore.create({
                studentId: '123',
                subject: 'Física',
                score: 1001,
                date: new Date(),
            });
        }).toThrow("A nota deve estar entre 0 e 1000.")
    });
})