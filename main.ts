import {Course} from "./Course.js";
import {dataCourses} from "./dataCourses.js";
import {dataStudent} from "./dataStudent.js";
import {Student} from "./Student.js";

const coursesTBody: HTMLElement = document.getElementById('cursos')!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById('search-box')!;
const inputMinBox: HTMLInputElement = <HTMLInputElement>document.getElementById('min-creds')!;
const inputMaxBox: HTMLInputElement = <HTMLInputElement>document.getElementById('max-creds')!;

const btnfilterByName: HTMLButtonElement = <HTMLButtonElement>document.getElementById('button-filterByName')!;
const btnReset: HTMLButtonElement = <HTMLButtonElement>document.getElementById('button-reset')!;
const btnUser: HTMLButtonElement = <HTMLButtonElement>document.getElementById('button-toggle-user')!;
const btnCreds: HTMLButtonElement = <HTMLButtonElement>document.getElementById('button-filterCreds')!;

const renderCourses = (courses: Course[], minCreds?: number | null, maxCreds?: number | null): void => {
    courses.forEach(c => {
        if (minCreds && c.credits < minCreds)
            return;
        if (maxCreds && c.credits > maxCreds)
            return;
        const trElem = document.createElement('tr');
        trElem.className = 'border-bottom';
        trElem.appendChild(generateTd(c.name))
        trElem.appendChild(generateTd(c.professor))
        trElem.appendChild(generateTd(c.credits.toString()))
        coursesTBody.appendChild(trElem);
    })
}

const renderStudent = (student: Student): void => {
    //HTML Elements
    document.getElementById('nombre')!.innerText = student.nombre;
    document.getElementById('codigo')!.innerText = student.codigo.toString();
    document.getElementById('cedula')!.innerText = student.cedula.toString();
    document.getElementById('direccion')!.innerText = student.direccion;
    document.getElementById('telefono')!.innerText = student.telefono;
    (<HTMLImageElement>document.getElementById('avatar')!).src = student.fotoUrl;

    //Calcular edad
    const dateFrom1970: Date = new Date((new Date()).getTime() - student.fechaNacimiento.getTime());
    const edad: number = dateFrom1970.getFullYear() - 1970;
    document.getElementById('edad')!.innerText = `${edad} Años`;
}

const generateTd = (value: string): HTMLElement => {
    const td = document.createElement('td');
    td.textContent = value;
    return td;
}

const getTotalCredits = (courses: Course[]): number => {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
};


function clearCoursesInTable() {
    while (coursesTBody.hasChildNodes()) {
        coursesTBody.removeChild(coursesTBody.lastChild!)
    }
}

function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCourses(coursesFiltered);
}

function applyFilterByCreds(minCreditsStr: string, maxCreditsStr: string) {
    let minCreds = null;
    let maxCreds = null;
    if (minCreditsStr.length > 0)
        minCreds = parseInt(minCreditsStr)
    if (maxCreditsStr.length > 0)
        maxCreds = parseInt(maxCreditsStr)
    clearCoursesInTable();
    renderCourses(dataCourses, minCreds, maxCreds);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}

let studentIndex: number = 0;
renderCourses(dataCourses)
renderStudent(dataStudent(studentIndex))

btnfilterByName.onclick = () => applyFilterByName();
btnCreds.onclick = () => applyFilterByCreds(inputMinBox.value, inputMaxBox.value);
btnReset.onclick = (): void => {
    clearCoursesInTable();
    renderCourses(dataCourses);
}
btnUser.onclick = () => renderStudent(dataStudent(++studentIndex));

