import { prisma } from "../config/database.js";

export async function getCategoryByName(category: string) {
    return await prisma.categories.findUnique({
        where: {
            name: category
        }
    });
}
export async function getTeacherByName(teacher: string) {
    return await prisma.teachers.findUnique({
        where: {
            name: teacher
        }
    });
}

export async function getDisciplineByName(discipline: string) {
    return await prisma.disciplines.findUnique({
        where: {
            name: discipline
        }
    });
}

export async function createTeacher(teacherDisciplineId: number) {
    return await prisma.teacherDisciplines.findUnique({
        where: {
            id: teacherDisciplineId
        }
    });
}

export async function createTeacherDisciplines(teacherId: number, disciplineId: number) {
    return await prisma.teacherDisciplines.create({
        data: {
            teacherId,
            disciplineId,
        }
    });
}

export async function getTeacherDisciplineByTeacherAndDiscipline(teacherId: number, disciplineId: number) {
    return await prisma.teacherDisciplines.findFirst({
        where: {
            teacherId,
            disciplineId
        },
    });
}


