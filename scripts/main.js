import {dataCourses} from "./dataCourses.js";
import {dataStudent} from "./dataStudent.js";

var coursesTBody = document.getElementById('cursos');
var inputSearchBox = document.getElementById('search-box');
var inputMinBox = document.getElementById('min-creds');
var inputMaxBox = document.getElementById('max-creds');
var btnfilterByName = document.getElementById('button-filterByName');
var btnReset = document.getElementById('button-reset');
var btnUser = document.getElementById('button-toggle-user');
var btnCreds = document.getElementById('button-filterCreds');
var renderCourses = function (courses, minCreds, maxCreds) {
    courses.forEach(function (c) {
        if (minCreds && c.credits < minCreds)
            return;
        if (maxCreds && c.credits > maxCreds)
            return;
        var trElem = document.createElement('tr');
        trElem.className = 'border-bottom';
        trElem.appendChild(generateTd(c.name));
        trElem.appendChild(generateTd(c.professor));
        trElem.appendChild(generateTd(c.credits.toString()));
        coursesTBody.appendChild(trElem);
    });
};
var renderStudent = function (student) {
    //HTML Elements
    document.getElementById('nombre').innerText = student.nombre;
    document.getElementById('codigo').innerText = student.codigo.toString();
    document.getElementById('cedula').innerText = student.cedula.toString();
    document.getElementById('direccion').innerText = student.direccion;
    document.getElementById('telefono').innerText = student.telefono;
    document.getElementById('avatar').src = student.fotoUrl;
    //Calcular edad
    var dateFrom1970 = new Date((new Date()).getTime() - student.fechaNacimiento.getTime());
    var edad = dateFrom1970.getFullYear() - 1970;
    document.getElementById('edad').innerText = edad + " A\u00F1os";
};
var generateTd = function (value) {
    var td = document.createElement('td');
    td.textContent = value;
    return td;
};
var getTotalCredits = function (courses) {
    var totalCredits = 0;
    courses.forEach(function (course) {
        return totalCredits = totalCredits + course.credits;
    });
    return totalCredits;
};
function clearCoursesInTable() {
    while (coursesTBody.hasChildNodes()) {
        coursesTBody.removeChild(coursesTBody.lastChild);
    }
}

function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCourses(coursesFiltered);
}

function applyFilterByCreds(minCreditsStr, maxCreditsStr) {
    var minCreds = null;
    var maxCreds = null;
    if (minCreditsStr.length > 0)
        minCreds = parseInt(minCreditsStr);
    if (maxCreditsStr.length > 0)
        maxCreds = parseInt(maxCreditsStr);
    clearCoursesInTable();
    renderCourses(dataCourses, minCreds, maxCreds);
}

function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}

var studentIndex = 0;
renderCourses(dataCourses);
renderStudent(dataStudent(studentIndex));
btnfilterByName.onclick = function () {
    return applyFilterByName();
};
btnCreds.onclick = function () {
    return applyFilterByCreds(inputMinBox.value, inputMaxBox.value);
};
btnReset.onclick = function () {
    clearCoursesInTable();
    renderCourses(dataCourses);
};
btnUser.onclick = function () {
    return renderStudent(dataStudent(++studentIndex));
};
