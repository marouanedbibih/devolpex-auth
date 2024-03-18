"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("../functions/Validation");
async function userInfosIsValid(req, res) {
    // Get the user infos from the request body
    const { first_name, last_name, username, email, phone, password, confirm_password } = req.body;
    // Create an errors object
    const errors = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
    };
    // Check if the first name & last name valid and exists
    const name_check = await (0, Validation_1.checkName)(last_name, first_name);
    if (!name_check) {
        errors.first_name = 'Invalid first name format.';
        errors.last_name = 'Invalid last name format.';
    }
    // Check if the username valid & exists
    const username_check = await (0, Validation_1.checkUsername)(username);
    if (!username_check) {
        errors.username = 'Invalid username format.';
    }
    // Check if the email valid & exists
    const email_check = await (0, Validation_1.checkEmail)(email);
    if (!email_check) {
        errors.email = 'Invalid email format.';
    }
    // Check if the phone valid & exists
    const phone_check = await (0, Validation_1.checkPhone)(phone);
    if (!phone_check) {
        errors.phone = 'Invalid phone format.';
    }
    // Check if the password valid & confirm password match
    const password_check = await (0, Validation_1.checkPassword)(password, confirm_password);
    if (!password_check) {
        errors.password = 'Invalid password format.';
        errors.confirm_password = 'Password does not match.';
    }
    const hasErrors = Object.values(errors).some((value) => value !== '');
    if (hasErrors) {
        res.status(400).json({ errors });
    }
    else {
        res.status(200).json({ message: 'User infos are valid.' });
    }
}
