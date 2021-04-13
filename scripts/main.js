import {dataCourses} from "./dataCourses.js";

var coursesTBody = document.getElementById('cursos');
var inputSearchBox = document.getElementById('search-box');
var btnfilterByName = document.getElementById('button-filterByName');
var btnReset = document.getElementById('button-reset');
var renderCourses = function (courses) {
    courses.forEach(function (c) {
        var trElem = document.createElement('tr');
        trElem.className = 'border-bottom';
        trElem.appendChild(generateTd(c.name));
        trElem.appendChild(generateTd(c.professor));
        trElem.appendChild(generateTd(c.credits.toString()));
        coursesTBody.appendChild(trElem);
    });
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

function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}

renderCourses(dataCourses);
btnfilterByName.onclick = function () {
    return applyFilterByName();
};
btnReset.onclick = function () {
    clearCoursesInTable();
    renderCourses(dataCourses);
};
