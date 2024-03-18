import ValidationResponse from "../interfaces/ValidationResponse";
import UserModel from "../models/User"; // Import your UserModel

// /**
//  * Step 1: Check if the last name & first name valid
//  * Step 2: Check if the username name valid & exists, error and confirm message
//  * Step 3: Check if the email valid & exists, error and confirm message
//  * Step 4: Check if the phone valid & exists, error and confirm message
//  * Step 5: Check if the password valid & confirm password match, error and confirm message
//  */

// 1- Check if the last name & first name valid
async function checkName(
  last_name: string,
  first_name: string
): Promise<ValidationResponse> {
  const errors: Record<string, string> = {};
  if (isEmpty(first_name)) {
    errors.first_name = 'First name is required.';
    errors.last_name = 'Last name is required.';
  }else{
    const name_is_valid = await nameIsValid(last_name, first_name);
    if (!name_is_valid) {
      errors.first_name = 'Invalid format for first name.';
      errors.last_name = 'Invalid format for last name.';
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

// 2- Check if the username valid & exists, error and confirm message
async function checkUsername(username: string): Promise<ValidationResponse> {
  const errors: Record<string, string> = {};
  if (isEmpty(username)) {
    errors.username = 'Username is required.';
  }else{
    const username_is_valid = await usernameIsValid(username);
    if (!username_is_valid) {
      errors.username = 'Invalid username format. Avoid symbols(".","_" only ) or spaces.';
    }else{
      const username_exists = await usernameExists(username);
      if (username_exists) {
        errors.username = 'Username already exists. Please choose a different one.';
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

// 3- Check if the email valid & exists, error and confirm message
async function checkEmail(email: string): Promise<ValidationResponse> {
  const errors: Record<string, string> = {};
  if (isEmpty(email)) {
    errors.email = 'Email is required.';
  }else{
    const email_is_valid = await emailIsValid(email);
    if (!email_is_valid) {
      errors.email = 'Invalid email format. Please enter a valid email address.';
    }else{
      const email_exists = await emailExists(email);
      if (email_exists) {
        errors.email = 'User with the same email already exists.';
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

// 4- Check if the phone valid & exists, error and confirm message
async function checkPhone(phone: string): Promise<ValidationResponse> {
  const errors: Record<string, string> = {};
  const phone_is_valid = await phoneIsValid(phone);
  if(isEmpty(phone)){
    errors.phone = "Phone is required."
  }
  else if (!phone_is_valid) {
    errors.phone = 'Invalid phone number format.';
  }else{
    const phone_exists = await phoneExists(phone);
    if (phone_exists) {
      errors.phone = 'User with the same phone number already exists.';
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

// 5- Check if the password valid & confirm password match, error and confirm message
async function checkPassword(
  password: string,
  confirm_password: string
): Promise<ValidationResponse> {
  const errors: Record<string, string> = {};
  if (isEmpty(password) && isEmpty(confirm_password)) {
    errors.password = 'Password is required.';
    errors.confirm_password = 'Confirm password is required.';
  }else{
    const password_is_valid = await passwordIsValid(password);
    if (!password_is_valid) {
      errors.password = 'Invalid password format.';
    }else{
      const password_match = await passwordMatch(password, confirm_password);
      if (!password_match) {
        errors.confirm_password = 'Password and confirm password do not match.';
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

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
function nameIsValid(last_name: string, first_name: string): boolean {
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
    console.log("Invalid format for first name or last name.");
    return false;
  }
  return true;
}

// 2- Check if the username valid
async function usernameIsValid(username: string): Promise<boolean> {
  // Check if the username doesn't start with a symbol or number
  const firstCharRegex = /^[^0-9!@#$%^&*()_+=\-[\]{}|;':"\\,<.>/?]+/;
  if (!firstCharRegex.test(username)) {
    console.log(
      "Invalid username format: Cannot start with a symbol or number."
    );
    return false;
  }

  // Check if the username contains only letters, numbers, underscores, and dots
  const usernameRegex = /^[a-zA-Z0-9_.]+$/;
  if (!usernameRegex.test(username)) {
    console.log(
      "Invalid username format: Can only contain letters, numbers, underscores, and dots."
    );
    return false;
  }

  // All checks passed, username is valid
  return true;
}

// 3- Check if the username exists
async function usernameExists(username: string): Promise<boolean> {
  const existingUsername = await UserModel.findOne({
    $or: [{ username: username }],
  });

  if (existingUsername) {
    console.log("Username already exists.");
    return true;
  }
  return false;
}

// 4- Check if the email valid
async function emailIsValid(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Invalid email format.");
    return false;
  }
  return true;
}

// 5- Check if the email exists
async function emailExists(email: string): Promise<boolean> {
  const existingEmail = await UserModel.findOne({ email: email });
  if (existingEmail) {
    console.log("User with the same email already exists.");
    return true;
  }
  return false;
}

// 6- Check if the phone valid
async function phoneIsValid(phone: string): Promise<boolean> {
  const phoneRegex = /^\d{13}$/;
  if (!phoneRegex.test(phone)) {
    console.log("Invalid phone number format.");
    return false;
  }
  return true;
}

// 7- Check if the phone exists
async function phoneExists(phone: string): Promise<boolean> {
  const existingPhone = await UserModel.findOne({ phone: phone });
  if (existingPhone) {
    console.log("User with the same phone number already exists.");
    return true;
  }
  return false;
}

// 8- Check if the password valid
async function passwordIsValid(password: string): Promise<boolean> {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    console.log("Invalid password format.");
    return false;
  }
  return true;
}

// 9- Check if the password and confirm password match
async function passwordMatch(
  password: string,
  confirm_password: string
): Promise<boolean> {
  if (password !== confirm_password) {
    console.log("Password and confirm password do not match.");
    return false;
  }
  return true;
}
function isEmpty(value: string): boolean {
  return !value.trim();
}

export {
  checkName,
  checkUsername,
  checkEmail,
  checkPhone,
  checkPassword,
};
