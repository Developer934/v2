"use srtict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);


        /* делаем фактическую отправку формы */
        let formData = new FormData(form);






        if (error === 0) {
            /* время отправки данных */
            form.classList.add('_sending');
            /* продолжение делаем отправки формы с помощью тех.AJAX */
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            /* проверяем успешна ли наша отправка или нет  */
            if (response.ok) {
                let result = await response.json();
                alert(result.message);

                form.reset();
                /* если появиться ошибка при отправке мы класс отбираем  */
                form.classList.remove('_sending');

            } else {
                alert('Ошибка.')
                form.classList.remove('_sending');
            }




        } else {
            alert('Заполните обязательные поля');
        }

    }

    /* делаем функцию которая будет проверять обязательный поля через _req */
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')



        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;

    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');

    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    /* функция проверки mail */
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);

    }


    /* добавить файл и привью */
    /*
    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');
    */



    /* 
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    }); */

    /* создаем функцию и добавляем тип проверки 
    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешны только изображения.');
            formImage.value = '';
            return;
        }
        
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2 мб.');
            return;
        }
        
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = '<img src="$(e.target.result)" alt="Фото">';
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);

    } */



});