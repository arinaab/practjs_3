export default class Form {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.inputs = document.querySelectorAll('input'); //для очистки инпутов
        this.status = {
            success: 'Спасибо, мы с Вами свяжемся!',
            loading: 'Загрузка...',
            failure: 'Что-то пошло не так',
        };
    }

    clearInputs() {
        this.inputs.forEach(input => input.value = '');
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('input[type="email"]');

        mailInputs.forEach(item => {
            let value = item.value;
            item.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    checkNumInputs() {
        const inputs = document.querySelectorAll('input[name="phone"]');
        inputs.forEach(input => { 
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/, '');
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus(); //установили фокус на элемент
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select(); //выделяем значение, сформировавшееся выше
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____', //маска, которую мы будем использовать
                i = 0, //счетчик
                def = matrix.replace(/\D/g, ''), //получаем из матрицы значения, не соответствующие числовым
                val = this.value.replace(/\D/g, ''); //получаем из того, что ввел пользователь
    
            if (def.length >= val.length) {
                val = def; //записываем стандартное значение def
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
    
        return await res.text();
    }

    bindForm() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const message = document.createElement('div');

                if (form.hasAttribute('data-schedule')) {
                    message.style.cssText = `
                        color: black;
                        font-size: 30px;
                        display: block;
                        margin-top: 15px;
                    `;
                } else {
                    message.style.cssText = `
                        color: white;
                        font-size: 30px;
                        display: block;
                        margin-top: 15px;
                    `;
                }
                
                message.textContent = this.status.loading;
                form.append(message);

                const formData = new FormData(form);

                this.postData('assets/question.php', formData)
                    .then(res => {
                        console.log(res);
                        message.textContent = this.status.success;
                    })
                    .catch( () => {
                        message.textContent = this.status.failure;
                    })
                    .finally( () => {
                        this.clearInputs();
                        setTimeout( () => {
                            message.remove();
                        }, 5000);
                    });
            });
        });
    }

    init() {
        // console.log(this.forms, this.inputs);
        this.checkNumInputs();
        this.checkMailInputs();
        this.bindForm();
        this.initMask();
    }
}