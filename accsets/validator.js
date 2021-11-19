
// đối tượng Validator
function Validator(options) {

    var selectorRules = {};

    // hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errMessage;

        // lấy ra các rules của selector
        var rules = selectorRules[rule.selector]
        
        // lặp qua từng rule & kiểm tra
        // nếu có lỗi thì dừng việc kiểm tra
        for(var i=0; i<rules.length; i++){
            errMessage = rules[i](inputElement.value);
            if(errMessage) break;
        }

        if(errMessage) {
            errorElement.innerText = errMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errMessage
    }

    // lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    if(formElement) {

        // khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();
            
            var isFormValid = true;

            // lặp qua từng rule và validate luôn
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)
                if(!isValid){
                    isFormValid = false;
                }
            })
            
            // trong trường hợp các input hợp lệ
            if(isFormValid){
                // trường hợp submit với javascript
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]')               
                    // conver nodelist sang array
                    var formValues = Array.from(enableInputs).reduce((values, input) => {                
                        return (values[input.id] = input.value) && values;
                    }, {})
                    notifi()
                    dieu_huong()
                    options.onSubmit(formValues)

                }
                // trường hợp submit mặc định với html
                else{
                    formElement.submit();
                }
            }
        }


        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện)
        options.rules.forEach((rule) => {

            // lưu lại các Rule cho mỗi ô input4
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] =  [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement) {
                // xử lí khi blur khỏi ô input
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }

                // xử lí mỗi khi người dùng nhập vào ô input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector('.form-message')
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}


// định nghĩa các qui tắc (yêu cầu)
// nguyên tắc các rule
// 1) khi có lỗi -> trả ra message lỗi
// 2) khi hợp lệ -> không trả cái gì cả
Validator.isRequired = function(selector, message) {
    return {
        selector,
        test(value) {
            return value.trim() ? undefined : message ||  "Please enter this field"
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector,
        test(value) {
            var regex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "This field must be email"
        }
    }
}

Validator.isMinLength = function(selector, min, message) {
    return {
        selector,
        test(value) {
            return value.length >= min ? undefined : message || `Password needs at least ${min} characters`;
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector,
        test(value) {
           return value === getConfirmValue() ? undefined : message || `Input data does not match`
        }
    }
}

Validator.isConfirmAcc = function(selector, getConfirmValue, message) {
    return {
        selector,
        test(value) {
           return value === getConfirmValue() ? undefined : message || `Please enter this field`
        }
    }
}

Validator.isConfirmPass = function(selector, getConfirmValue, message) {
    return {
        selector,
        test(value) {
           return value === getConfirmValue() ? undefined : message || `Please enter this field`
        }
    }
}


