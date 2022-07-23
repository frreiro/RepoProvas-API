import { CreateTest } from './../services/testServices.js';
import { prisma } from "../config/database.js";

export async function create(test: CreateTest) {
    await prisma.tests.create({
        data: test
    })
}


export async function getByDisciplines() {
    const tests = await prisma.terms.findMany({
        select: {
            id: true,
            number: true,
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    teacherDisciplines: {
                        select: {
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    teacherDiscipline: {
                                        select: {
                                            teacher: true
                                        }
                                    },
                                    category: true

                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            number: "asc"
        }

    })
    return tests
}




export async function getTeachers() {
    const tests = await prisma.teachers.findMany({
        select: {
            id: true,
            name: true,
        }
    })
    return tests
}

export async function getTestsByTeachersGroupedByCategory(teacherId: number) {
    const tests = await prisma.categories.findMany({
        select: {
            id: true,
            name: true,
            Tests: {
                select: {
                    name: true,
                    pdfUrl: true,
                    teacherDiscipline: {
                        select: {
                            discipline: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                },
                where: {
                    teacherDiscipline: {
                        teacherId,
                    }
                }
            }
        },
    })
    return tests
}




