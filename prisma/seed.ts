import { prisma } from './../src/config/database.js';
import bcrypt from "bcrypt";


// create admin user
async function main() {

    const defaultTerms = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 },
        { number: 5 },
        { number: 6 },
    ]

    const defaultCategories = [
        { name: "Projeto" },
        { name: 'Prática' },
        { name: 'Recuperação' },
    ]
    const defaultTeacher = [
        { name: 'Diego Pinho' },
        { name: 'Bruna Hamori' },
    ]
    const defaultDisciplines = [
        { name: "HTML e CSS", termId: 1 },
        { name: 'JavaScript', termId: 2 },
        { name: 'React', termId: 3 },
        { name: 'Planejamento', termId: 2 },
        { name: 'Autoconfiança', termId: 3 },
        { name: 'Humildade', termId: 1 },

    ]

    const defaultTeacherDisciplines = [
        { teacherId: 1, disciplineId: 1 },
        { teacherId: 1, disciplineId: 2 },
        { teacherId: 1, disciplineId: 3 },
        { teacherId: 2, disciplineId: 4 },
        { teacherId: 2, disciplineId: 5 },
        { teacherId: 2, disciplineId: 6 },
    ]

    await prisma.terms.createMany({
        data: defaultTerms
    })
    await prisma.categories.createMany({
        data: defaultCategories
    })
    await prisma.teachers.createMany({
        data: defaultTeacher
    })
    await prisma.disciplines.createMany({
        data: defaultDisciplines
    })
    await prisma.teacherDisciplines.createMany({
        data: defaultTeacherDisciplines
    });

}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})