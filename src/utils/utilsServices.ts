import { _expectationFail, _notfound } from "../middlewares/errorHandlerMiddleware.js";
import * as utilsRepository from "../repositories/utilsRepository.js"

export async function getCatergoryId(categoryName: string) {
    const category = await utilsRepository.getCategoryByName(categoryName);
    if (!category) _notfound()
    return category
}

export async function getTeacher(teacher: string) {
    const teacherFound = await utilsRepository.getTeacherByName(teacher);
    if (!teacherFound) _notfound()
    return teacherFound
}

export async function getDiscipline(discipline: string) {
    const disciplineFound = await utilsRepository.getDisciplineByName(discipline);
    if (!disciplineFound) _notfound();
    return disciplineFound
}


export async function getTeacherDisciplineId(teacherId: number, disciplineId: number) {
    const teacherDisciplines = await createOrFindTeacherDiscipline(teacherId, disciplineId);
    if (!teacherDisciplines) _expectationFail()
    return teacherDisciplines
}

async function createOrFindTeacherDiscipline(teacherId: number, disciplineId: number) {
    let teacherDisciplines = await utilsRepository.getTeacherDisciplineByTeacherAndDiscipline(teacherId, disciplineId);
    if (!teacherDisciplines) {
        teacherDisciplines = await utilsRepository.createTeacherDisciplines(teacherId, disciplineId)
    }
    return teacherDisciplines;
}