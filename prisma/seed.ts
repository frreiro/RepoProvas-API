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
    defaultTerms.forEach(async (termObj) => {
        await prisma.terms.upsert({
            where: termObj,
            update: {},
            create: termObj
        })
    })


    defaultCategories.forEach(async (catObj) => {
        await prisma.categories.upsert({
            where: catObj,
            update: {},
            create: catObj
        })
    })



    defaultTeacher.forEach(async (teacherObj) => {
        await prisma.teachers.upsert({
            where: teacherObj,
            update: {},
            create: teacherObj
        })
    })



    defaultDisciplines.forEach(async (disObj) => {
        await prisma.disciplines.upsert({
            where: {
                name: disObj.name
            },
            update: {},
            create: disObj
        })
    })

    defaultTeacherDisciplines.forEach(async (teachDiscObj) => {
        const relation = await prisma.teacherDisciplines.findMany({
            where: {
                teacherId: teachDiscObj.teacherId,
                disciplineId: teachDiscObj.disciplineId
            }
        })
        if (relation.length === 0) {
            await prisma.teacherDisciplines.create({
                data: teachDiscObj
            });
        }
    })

}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})