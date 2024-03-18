"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.checkPhone = exports.checkEmail = exports.checkUsername = exports.checkName = void 0;
const User_1 = __importDefault(require("../models/User")); // Import your UserModel
/**
 * Step 1: Check if the last name & first name valid
 * Step 2: Check if the username name valid & exists, error and confirm message
 * Step 3: Check if the email valid & exists, error and confirm message
 * Step 4: Check if the phone valid & exists, error and confirm message
 * Step 5: Check if the password valid & confirm password match, error and confirm message
 */
// 1- Check if the last name & first name valid
async function checkName(last_name, first_name) {
    const name_is_valid = await nameIsValid(last_name, first_name);
    if (!name_is_valid) {
        throw new Error("Invalid first name or last name format.");
    }
    return true;
}
exports.checkName = checkName;
// 2- Check if the username valid & exists, error and confirm message
async function checkUsername(username) {
    const username_is_valid = await usernameIsValid(username);
    if (!username_is_valid) {
        throw new Error("Invalid username format.");
    }
    const username_exists = await usernameExists(username);
    if (username_exists) {
        throw new Error("Username already exists.");
    }
    return true;
}
exports.checkUsername = checkUsername;
// 3- Check if the email valid & exists, error and confirm message
async function checkEmail(email) {
    const email_is_valid = await emailIsValid(email);
    if (!email_is_valid) {
        throw new Error("Invalid email format.");
    }
    const email_exists = await emailExists(email);
    if (email_exists) {
        throw new Error("User with the same email already exists.");
    }
    return true;
}
exports.checkEmail = checkEmail;
// 4- Check if the phone valid & exists, error and confirm message
async function checkPhone(phone) {
    const phone_is_valid = await phoneIsValid(phone);
    if (!phone_is_valid) {
        throw new Error("Invalid phone number format.");
    }
    const phone_exists = await phoneExists(phone);
    if (phone_exists) {
        throw new Error("User with the same phone number already exists.");
    }
    return true;
}
exports.checkPhone = checkPhone;
// 5- Check if the password valid & confirm password match, error and confirm message
async function checkPassword(password, confirm_password) {
    const password_is_valid = await passwordIsValid(password);
    if (!password_is_valid) {
        throw new Error("Invalid password format.");
    }
    const password_match = await passwordMatch(password, confirm_password);
    if (!password_match) {
        throw new Error("Password and confirm password do not match.");
    }
    return true;
}
exports.checkPassword = checkPassword;
/**
 * Step 1: Check if the last name & first name valid
 * Step 2: Check if the username name valid
 * Step 3: Check if the username exists
 * Step 4: Check if the email valid
 * Step 5: Check if the email exists
 * Step 6: Check if the phone valid
 * Step 7: Check if the phone exists
 * Step 8: Check if the password valid
 * Step 9: Check if the password and confirm password match
 */
// 1- Check if the last name & first name valid
function nameIsValid(last_name, first_name) {
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
        console.log("Invalid format for first name or last name.");
        return false;
    }
    return true;
}
// 2- Check if the username valid
async function usernameIsValid(username) {
    // Check if the username doesn't start with a symbol or number
    const firstCharRegex = /^[^0-9!@#$%^&*()_+=\-[\]{}|;':"\\,<.>/?]+/;
    if (!firstCharRegex.test(username)) {
        console.log("Invalid username format: Cannot start with a symbol or number.");
        return false;
    }
    // Check if the username contains only letters, numbers, underscores, and dots
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;
    if (!usernameRegex.test(username)) {
        console.log("Invalid username format: Can only contain letters, numbers, underscores, and dots.");
        return false;
    }
    // All checks passed, username is valid
    return true;
}
// 3- Check if the username exists
async function usernameExists(username) {
    const existingUsername = await User_1.default.findOne({
        $or: [{ username: username }],
    });
    if (existingUsername) {
        console.log("Username already exists.");
        return true;
    }
    return false;
}
// 4- Check if the email valid
async function emailIsValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log("Invalid email format.");
        return false;
    }
    return true;
}
// 5- Check if the email exists
async function emailExists(email) {
    const existingEmail = await User_1.default.findOne({ email: email });
    if (existingEmail) {
        console.log("User with the same email already exists.");
        return true;
    }
    return false;
}
// 6- Check if the phone valid
async function phoneIsValid(phone) {
    const phoneRegex = /^\d{13}$/;
    if (!phoneRegex.test(phone)) {
        console.log("Invalid phone number format.");
        return false;
    }
    return true;
}
// 7- Check if the phone exists
async function phoneExists(phone) {
    const existingPhone = await User_1.default.findOne({ phone: phone });
    if (existingPhone) {
        console.log("User with the same phone number already exists.");
        return true;
    }
    return false;
}
// 8- Check if the password valid
async function passwordIsValid(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        console.log("Invalid password format.");
        return false;
    }
    return true;
}
// 9- Check if the password and confirm password match
async function passwordMatch(password, confirm_password) {
    if (password !== confirm_password) {
        console.log("Password and confirm password do not match.");
        return false;
    }
    return true;
}
