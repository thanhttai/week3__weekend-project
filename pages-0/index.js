let url = "http://localhost:3000/foods";



// function start() {
//     getFoods(renderFoods);

// }
// start()

function start() {
    getFoods(renderFoods);
    handleCreateFood()

}
start()

function getFoods(cb) {

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(cb)
        .catch(err => {
            console.error(err);
        });

}


function renderFoods(foods) {


    const foodPage = document.querySelector('.content__list');
    let newData = foods[0]
    console.log(newData);
    let htmls = () => {
        return `
        <h1 class="content__heading">${newData.title}</h1>
        <div class="sub__heading">By <a href="">Thanhttai</a></div>
        <div class="content__yield"><span>YIELD</span>4 servings</div>
        <div class="content__yield"><span>TIME</span>1 hour</div>
        <div class="flex-row">
            <div class="col l-6 c-12">
                <p class="content__description">
                   ${newData.description}
                </p>
            </div>
            <div class="col l-6 c-12">

                <img src="${newData.imgUrl}"
                    alt="" width="600px">
                <p class="description__img">Thanhttai students at coderschool</p>
            </div>
        </div>
        `;
    };
    foodPage.innerHTML = htmls()

}

// Validator
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement;
        }
    }


    var selectorRules = {};
    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        // var errorElement = getParent(inputElement, './form-group')
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lưu lấy cái rules của selector
        var rules = selectorRules[rule.selector];
        // lặp qua từng rule và kiểm tra
        //Nếu có lỗi thì dừng kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');

        }
        return !!errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        //chặn submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;

            // Lặp qua từng rules và validate   
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var valid = validate(inputElement, rule)
                if (valid) {
                    isFormValid = false;
                }
            });



            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.iArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;

                        }
                        return values;
                    }, {});

                    options.onSubmit(formValues);

                    //Trường hợp submit mặc định của trình duyệt
                } else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý  (Lắng nghe sự kiên blur, input,...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý trường hợp blur khỏi input
                if (inputElement) {
                    inputElement.onblur = function () {
                        validate(inputElement, rule)
                    }
                    // Xử lý mỗi khi người dùng nhập vào input
                    inputElement.oninput = function () {
                        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                        errorElement.innerText = '';
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                    }
                }
            })



        });

    }


}

Validator.isRequired = function (selector, message) {
    return {
        selector,
        test(value) {
            return value ? undefined : message || 'Vui lòng nhập lại trường này!'
        }
    }
};

Validator.isEmail = function (selector, message) {
    return {
        selector,
        test(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    }
};

Validator.minLength = function (selector, min, message) {
    return {
        selector,
        test(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector,
        test(value) {
            return value === getConfirmValue() ? undefined : message || `Giá trị nhập vào không chính xác`;
        }
    }
};






