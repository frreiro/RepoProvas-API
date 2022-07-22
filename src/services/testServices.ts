import { Tests } from "@prisma/client";
import { TestInfo } from "../schemas/schemas.js";
import * as testsRepository from "../repositories/testsRepository.js"
import * as utilsServices from "../utils/utilsServices.js"
import { _unprocessableEntity } from "../middlewares/errorHandlerMiddleware.js";

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

export async function getTestByDiscipline(userId: number) {

}

