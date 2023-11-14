<template>
    <!-- Signup Form -->
    <section class="container">
        <div class="form">
            <div class="form-content">
                <header>Registration</header>
                <form v-if="!registered" @submit.prevent="submitForm">
                    <div class="field input-field">
                        <input type="text" placeholder="Name" v-model="name" @input="validateField('name')"
                               :style="{ borderColor: errors.name ? 'red' : (name ? 'green' : 'initial') }"
                               ref="nameInput">
                    </div>
                    <div class="field input-field">
                        <input type="text" placeholder="Email" v-model="email"
                               @input="validateField('email')"
                               :style="{ borderColor: errors.email ? 'red' : (email ? 'green' : 'initial') }"
                               ref="emailInput">
                    </div>
                    <div class="field input-field">
                        <input type="password" placeholder="Password" v-model="password"
                               @input="validateField('password')"
                               :style="{ borderColor: errors.password ? 'red' : (password ? 'green' : 'initial') }"
                               ref="passwordInput">
                    </div>
                    <div class="field input-field">
                        <input type="password" placeholder="Confirm Password" v-model="passwordConfirmation"
                               @input="validateField('passwordConfirmation')"
                               :style="{ borderColor: errors.passwordConfirmation ? 'red' : (passwordConfirmation ? 'green' : 'initial') }"
                               ref="passwordConfirmationInput">
                    </div>
                    <div class="field button-field">
                        <button @click="validateForm" type="submit">Registration</button>
                    </div>
                </form>
                <div v-else class="registration-successful">
                    Вы зарегистрированы!
                    <img class="registration-successful_img" :src="require('@/assets/anydo_104098.png')" alt="done" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                errors: {},
                registered: false
            };
        },
        methods: {
            submitForm() {
                if (this.validateForm()) {
                    console.log('Form submitted');
                }
            },
            validateForm() {
                const fields = {
                    name: {
                        value: this.name,
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                        errorMessages: {
                            required: 'Name is required',
                        }
                    },
                    email: {
                        value: this.email,
                        required: true,
                        validate: this.isValidEmail,
                        errorMessages: {
                            required: 'Email is required',
                        }
                    },
                    password: {
                        value: this.password,
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                        errorMessages: {
                            required: 'Password is required',
                        }
                    },
                    passwordConfirmation: {
                        value: this.passwordConfirmation,
                        required: true,
                        matchField: 'password',
                        errorMessages: {
                            required: 'Password confirmation is required',
                            mismatch: 'Passwords do not match'
                        }
                    }
                };

                let isValid = true;

                for (const field in fields) {
                    const fieldValue = fields[field].value;

                    if (fields[field].required && !fieldValue) {
                        this.errors[field] = fields[field].errorMessages.required;
                        isValid = false;
                    } else if (fields[field].minLength && fieldValue.length < fields[field].minLength || fields[field].maxLength && fieldValue.length > fields[field].maxLength) {
                        this.errors[field] = fields[field].errorMessages.invalidLength;
                        isValid = false;
                    } else if (fields[field].validate && !fields[field].validate(fieldValue)) {
                        this.errors[field] = fields[field].errorMessages.invalid;
                        isValid = false;
                    } else if (fields[field].matchField && fieldValue !== this[fields[field].matchField]) {
                        this.errors[field] = fields[field].errorMessages.mismatch;
                        isValid = false;
                    } else {
                        delete this.errors[field];
                    }
                }
                for (const field in fields) {
                    const input = this.$refs[`${field}Input`];
                    if (input) {
                        input.style.color = 'initial';
                    }
                }

                for (const field in this.errors) {
                    const input = this.$refs[`${field}Input`];
                    if (input) {
                        input.style.color = 'red';
                    }
                }
                if (isValid) {
                    this.registered = true;
                }


            },
            validateField(field) {
                const fields = {
                    name: {
                        value: this.name,
                        minLength: 3,
                        maxLength: 20,
                        errorMessages: {
                            invalidLength: 'Name must be between 3 and 20 characters long'
                        }
                    },
                    email: {
                        value: this.email,
                        validate: this.isValidEmail,
                        errorMessages: {
                            invalid: 'Invalid email address'
                        }
                    },
                    password: {
                        value: this.password,
                        minLength: 3,
                        maxLength: 20,
                        errorMessages: {
                            invalidLength: 'Password must be between 3 and 20 characters long'
                        }
                    },
                    passwordConfirmation: {
                        value: this.passwordConfirmation,
                        matchField: 'password',
                        errorMessages: {
                            mismatch: 'Passwords do not match'
                        }
                    }
                };

                const fieldValue = fields[field].value;

                if (fields[field].minLength && fieldValue.length < fields[field].minLength || fields[field].maxLength && fieldValue.length > fields[field].maxLength) {
                    this.errors[field] = fields[field].errorMessages.invalidLength;
                } else if (fields[field].validate && !fields[field].validate(fieldValue)) {
                    this.errors[field] = fields[field].errorMessages.invalid;
                } else if (fields[field].matchField && fieldValue !== this[fields[field].matchField]) {
                    this.errors[field] = fields[field].errorMessages.mismatch;
                } else {
                    delete this.errors[field];
                }
            },
            isValidEmail(email) {
                return /\S+@\S+\.\S+/.test(email);
            },
            togglePasswordVisibility(field) {
                const inputField = document.querySelector(`input[type="password"][placeholder="${field.charAt(0).toUpperCase() + field.slice(1)}"]`);
                if (inputField) {
                    if (inputField.type === 'password') {
                        inputField.type = 'text';
                    } else {
                        inputField.type = 'password';
                    }
                }
            }
        }
    };

</script>

<style scoped>

    .container{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4070f4;
        column-gap: 30px;
    }
    .form{
        position: absolute;
        width: 400px;
        padding: 30px;
        border-radius: 6px;
        background: #FFF;
    }

    .forms.show-signup .form.login{
        opacity: 0;
        pointer-events: none;
    }
    header{
        font-size: 1.6rem;
        font-weight: 600;
        color: #232836;
        text-align: center;
    }
    form{
        margin-top: 30px;
        position: relative;
    }
    .form .field{
        position: relative;
        height: 50px;
        width: 100%;
        margin-top: 20px;
        border-radius: 6px;
    }
    .field input,
    .field button{
        height: 100%;
        width: 100%;
        border: none;
        font-size: 16px;
        font-weight: 400;
        border-radius: 6px;
    }
    .field input{
        outline: none;
        padding: 0 15px;
        border: 1px solid #CACACA;
    }
    .field input:focus{
        border-bottom-width: 2px;
    }

    .field button{
        color: #fff;
        background-color: #0171d3;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .field button:hover{
        background-color: #098ae8;
    }
    .registration-successful {
        text-align: center;
        font-size: 1.4rem;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
    .registration-successful_img {
        width: 30px;
        height: 30px;
        margin-top: 10px;
    }

    @media screen and (max-width: 400px) {
        .form{
            padding: 20px 10px;
        }

    }
</style>