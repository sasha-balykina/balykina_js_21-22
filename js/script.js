'use strict';

var test = {
    "Вопрос 1": ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"],

    "Вопрос 2": ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3", "Вариант ответа № 4", "Вариант ответа № 5"],

    "Вопрос 3": ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"]
};

var rightAnswers = {
    "Вопрос 1": ["Вариант ответа № 1"],

    "Вопрос 2": ["Вариант ответа № 2", "Вариант ответа № 3"],

    "Вопрос 3": ["Вариант ответа № 3"]
};

var pageBuilder = {
    createElem: function createElem(tag, className) {
        var elem = document.createElement(tag);
        if (className) {
            elem.classList.add(className);
        }
        return elem;
    },

    appendElem: function appendElem(parent, newElem, className, inText) {
        var elem = this.createElem(newElem, className);
        elem = parent.appendChild(elem);
        if (inText != '') {
            elem.innerHTML = inText;
        }
        return elem;
    },

    createForm: function createForm(parent, obj, className) {
        var form = this.appendElem(parent, 'form', className, '');
        var formlist = void 0;

        for (var questions in obj) {
            formlist = pageBuilder.appendElem(form, 'ul', 'test_form__item', questions);
            for (var answers in obj[questions]) {
                pageBuilder.createCheckBox(formlist, 'test_form__checkbox', questions, obj[questions][answers]);
            }
        }
        pageBuilder.createSubmit(form, 'test_form__submit', 'Проверить мои результаты');
    },

    createCheckBox: function createCheckBox(parent, className, name, inText) {
        var label = this.createElem('label', '');
        var elem = this.createElem('input', className);
        var span = this.createElem('span', 'checkbox_span');
        label = parent.appendChild(label);
        elem.type = "checkbox";
        elem.name = name;
        elem.value = inText;
        label.appendChild(elem);
        elem = label.appendChild(span);
        elem.innerHTML = inText;
    },

    createSubmit: function createSubmit(parent, className, value) {
        var elem = this.appendElem(parent, 'input', className, '');
        elem.type = "button";
        elem.value = value;
    },

    init: function init() {
        var wrapper = this.appendElem(document.body, 'div', 'wrapper', '<h1>Тест по программированию</h1>');
        this.createForm(wrapper, test, 'test_form');
    }
};

var testStorage = {

    supportStorage: function supportStorage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            alert('LocalStorage нет!!!');
            return false;
        }
    },

    fillStorage: function fillStorage(obj, name) {
        if (this.supportStorage()) {
            localStorage[name] = JSON.stringify(obj);
            return true;
        } else {
            alert('Нет localStorage !!!');
            return false;
        }
    },

    receiveStorage: function receiveStorage(name) {
        return JSON.parse(localStorage[name]);
    }
};

var Resault = {

    normalizeAnswers: function normalizeAnswers(name) {
        var answerArray = testStorage.receiveStorage(name);
        var normalizeObj = {};
        var answer = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = answerArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var arrValue = _step.value;


                var item = arrValue;
                var itemName = item.name;
                var itemValue = item.value;

                if (itemName in normalizeObj) {
                    answer.push(itemValue);
                    normalizeObj[itemName] = answer;
                } else {
                    answer = [];
                    answer.push(itemValue);
                    normalizeObj[itemName] = answer;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return normalizeObj;
    },

    arrayEqual: function arrayEqual(a, b) {
        return a.length == b.length ? a.every(function (el, i) {
            return el === b[i];
        }, b) : false;
    },

    checkAnswers: function checkAnswers(testObj, userObj) {

        for (var item in testObj) {
            if (item in userObj) {
                if (!Resault.arrayEqual(testObj[item], userObj[item])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    },

    fillResault: function fillResault(testObj, userObj, resault) {
        var msg1 = void 0;

        if (resault) {
            msg1 = '<div class="modal_resault">Вы сдали тест!</div>';
        } else {
            msg1 = '<div class="modal_resault resault_fail">Вы НЕ сдали тест. Попробуйте ещё раз.</div></br>';
            msg1 += '<div class="modal_head">Ваши ответы:</div>';
            for (var questions in userObj) {
                msg1 += '</br>' + questions + ':</br> ';
                for (var answers in userObj[questions]) {
                    msg1 += userObj[questions][answers] + '</br>';
                }
            }
        }
        msg1 = msg1 + '<br/><div class="modal_head">Правильные ответы теста:</div>';
        for (questions in testObj) {
            msg1 += '</br>' + questions + ':</br>';
            for (answers in testObj[questions]) {
                msg1 += testObj[questions][answers] + '</br>';
            }
        }

        return msg1;
    }

};
try {
    $(function () {
        pageBuilder.init();

        $('.test_form__submit').on('click', function () {

            if (testStorage.fillStorage($('.test_form').serializeArray(), 'userAnswers')) {
                var norm = Resault.normalizeAnswers('userAnswers');

                if (Resault.checkAnswers(rightAnswers, norm)) {
                    $('.modal-body').html(Resault.fillResault(rightAnswers, norm, 1));
                } else {
                    $('.modal-body').html(Resault.fillResault(rightAnswers, norm, 0));
                }
                $('.modal').modal('show');
            }
            $('.test_form__checkbox').prop('checked', false);
        });
    });
} catch (e) {};

try {
    module.exports = Resault;
} catch (e) {}