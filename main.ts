import {Course} from "./Course.js";
import {dataCourses} from "./dataCourses.js";

const coursesTBody: HTMLElement = document.getElementById('cursos')!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById('search-box')!;
const btnfilterByName: HTMLButtonElement = <HTMLButtonElement>document.getElementById('button-filterByName')!;
const btnReset: HTMLButtonElement = <HTMLButtonElement>document.getElementById('button-reset')!;

const renderCourses = (courses: Course[]): void => {
    courses.forEach(c => {
        const trElem = document.createElement('tr');
        trElem.className = 'border-bottom';
        trElem.appendChild(generateTd(c.name))
        trElem.appendChild(generateTd(c.professor))
        trElem.appendChild(generateTd(c.credits.toString()))
        coursesTBody.appendChild(trElem);
    })
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

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}

renderCourses(dataCourses)
btnfilterByName.onclick = () => applyFilterByName();
btnReset.onclick = (): void => {
    clearCoursesInTable();
    renderCourses(dataCourses);
}

