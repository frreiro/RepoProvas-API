import { Tests } from "@prisma/client";
import { TestInfo } from "../schemas/schemas.js";
import * as testsRepository from "../repositories/testsRepository.js"
import * as utilsServices from "../utils/utilsServices.js"
import { _expectationFail, _notfound, _unprocessableEntity } from "../middlewares/errorHandlerMiddleware.js";

export type CreateTest = Omit<Tests, "id">

export async function createTest(test: TestInfo) {
    if (!test.category || !test.name || !test.pdfUrl || !test.teacher || !test.discipline) _unprocessableEntity();

    const category = await utilsServices.getCatergoryId(test.category);
    const teacher = await utilsServices.getTeacher(test.teacher);
    const discipline = await utilsServices.getDiscipline(test.discipline);
    const teacherDisciplines = await utilsServices.getTeacherDisciplineId(teacher.id, discipline.id);
    const testData: CreateTest = {
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: category.id,
        teacherDisciplineId: teacherDisciplines.id
    }
    await testsRepository.create(testData);
}

export async function getTestByDiscipline() {
    const testsByDiscipline = await testsRepository.getByDisciplines();
    if (testsByDiscipline.length === 0) _notfound()

    const tests = testsByDiscipline.map(term => {
        const disciplines = _mapDisciplineAndTeacher(term.disciplines);
        return { ...term, disciplines }
    })
    return tests
}


function _mapDisciplineAndTeacher(disciplines: any[]) {
    return disciplines.map(discipline => {
        const teacherDisciplines = discipline.teacherDisciplines.map(teachers => {
            const tests = _mapTestsTakeOff(teachers.tests)
            return tests
        })
        delete discipline.teacherDisciplines
        return { ...discipline, tests: teacherDisciplines }
    })
}

function _mapTestsTakeOff(tests: any[]) {
    return tests.map(test => {
        const teacher = test.teacherDiscipline.teacher;
        delete test.teacherDiscipline
        return { ...test, teacher }
    })
}


export async function getTestByTeachers() {
    const teachers = await testsRepository.getTeachers();
    if (teachers.length === 0) _notfound();
    return await _mapTeachers(teachers)
}

interface teachers {
    id: number;
    name: string;
}

async function _mapTeachers(teachers: teachers[]) {
    try {
        const tests = await Promise.all(teachers.map(async (teacher) => {
            const teacherTestsByCargoryRaw = await testsRepository.getTestsByTeachersGroupedByCategory(teacher.id)
            const teacherTestsByCargory = _filterAndMappingCategories(teacherTestsByCargoryRaw)
            return { ...teacher, categories: teacherTestsByCargory }
        }))
        return tests
    } catch (e) {
        _expectationFail()
    }
}

function _filterAndMappingCategories(categories: any[]) {
    return categories.filter((category) => category.Tests.length !== 0)
        .map((category => {
            const tests = _mapTestsDiscipline(category.Tests)
            return { ...category, Tests: tests };
        }))
}


function _mapTestsDiscipline(tests: any[]) {
    return tests.map(test => {
        const discipline = test.teacherDiscipline.discipline
        delete test.teacherDiscipline
        return { ...test, discipline }
    })

}

