import {
    checkName,
    checkUsername,
    checkEmail,
    checkPhone,
    checkPassword,
} from '../functions/Validation';
import IUserValidationInfos from '../interfaces/IUserValidationInfos';
import IResponse from '../interfaces/IResponse';


async function userValidation(user: IUserValidationInfos): Promise<IResponse> {
    // Get the user infos from the request body
    const { first_name, last_name, username, email, phone, password, confirm_password} = user;
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

    // Validate the first name
    const nameValidationResponse = await checkName(last_name, first_name);
    if (!nameValidationResponse.isValid) {
        errors.first_name = nameValidationResponse.errors.first_name;
        errors.last_name = nameValidationResponse.errors.last_name;
    }
    // Validate the username
    const usernameValidationResponse = await checkUsername(username);
    if (!usernameValidationResponse.isValid) {
        errors.username = usernameValidationResponse.errors.username;
    }
    // Validate the email
    const emailValidationResponse = await checkEmail(email);
    if (!emailValidationResponse.isValid) {
        errors.email = emailValidationResponse.errors.email;
    }
    // Validate the phone
    const phoneValidationResponse = await checkPhone(phone);
    if (!phoneValidationResponse.isValid) {
        errors.phone = phoneValidationResponse.errors.phone;
    }
    // Validate the password
    const passwordValidationResponse = await checkPassword(password, confirm_password);
    if (!passwordValidationResponse.isValid) {
        errors.password = passwordValidationResponse.errors.password;
        errors.confirm_password = passwordValidationResponse.errors.confirm_password;
    }
    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    // Return the validation result
    if (hasErrors) {
        return {
            isOK: false,
            errors: errors
        };
    } else {
        return {
            isOK: true,
            errors: {}
        };
    }
}
export default userValidation;