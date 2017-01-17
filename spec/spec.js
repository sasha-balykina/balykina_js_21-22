var app = require('../js/script.js');


describe("App test", function() {
    it("arrayEqual test", function() {
        var arr1 = [1,2,3,4,5];
        var arr2 = [1,2,3,4,5];
        var arr3 = [];
        var resault1 = app.arrayEqual(arr1,arr2);
        var resault2 = app.arrayEqual(arr2,arr3);
        expect(resault1).toEqual(true);
        expect(resault2).toEqual(false);

    });
    it("checkAnswers func test", function () {
        var obj1 = {
            "Вопрос 1": ["Вариант ответа № 1"],

            "Вопрос 2": ["Вариант ответа № 2", "Вариант ответа № 3"],

            "Вопрос 3": ["Вариант ответа № 3"]
        };
        var obj2 =  {
            "Вопрос 1": ["Вариант ответа № 1"],

            "Вопрос 2": ["Вариант ответа № 2", "Вариант ответа № 3"],

            "Вопрос 3": ["Вариант ответа № 3"]
        };
        var obj3 =  {
            "Вопрос 1": ["Вариант ответа № 1"],

            "Вопрос 2": ["Вариант ответа № 2"],

            "Вопрос 3": ["Вариант ответа № 3"]
        };
        var resault1 = app.checkAnswers(obj1,obj2);
        var resault2 = app.checkAnswers(obj1,obj3);
        expect(resault1).toEqual(true);
        expect(resault2).toEqual(false);
    });
    it('fillResault func test', function () {
        var obj1 = {
            "Вопрос 1": ["Вариант ответа № 1"],

            "Вопрос 2": ["Вариант ответа № 2", "Вариант ответа № 3"],

            "Вопрос 3": ["Вариант ответа № 3"]
        };
        var obj2 =  {
            "Вопрос 1": ["Вариант ответа № 1"],

            "Вопрос 2": ["Вариант ответа № 2"],

            "Вопрос 3": ["Вариант ответа № 3"]
        };

        var right = '<div class="modal_resault">Вы сдали тест!</div><br/><div class="modal_head">Правильные ответы теста:</div></br>Вопрос 1:</br>Вариант ответа № 1</br></br>Вопрос 2:</br>Вариант ответа № 2</br>Вариант ответа № 3</br></br>Вопрос 3:</br>Вариант ответа № 3</br>';
        var wrong = '<div class="modal_resault resault_fail">Вы НЕ сдали тест. Попробуйте ещё раз.</div></br><div class="modal_head">Ваши ответы:</div></br>Вопрос 1:</br> Вариант ответа № 1</br></br>Вопрос 2:</br> Вариант ответа № 2</br></br>Вопрос 3:</br> Вариант ответа № 3</br><br/><div class="modal_head">Правильные ответы теста:</div></br>Вопрос 1:</br>Вариант ответа № 1</br></br>Вопрос 2:</br>Вариант ответа № 2</br>Вариант ответа № 3</br></br>Вопрос 3:</br>Вариант ответа № 3</br>';
        var resault1 = app.fillResault(obj1,obj1,1);
        var resault2 = app.fillResault(obj1,obj2,0);
        expect(resault1).toEqual(right);
        expect(resault2).toEqual(wrong);

    });
});