import bcrypt from 'bcrypt';

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}
function setEmailToUppercase(email: string): string {
    return email.toUpperCase();
}

export {
    capitalizeFirstLetter,
    hashPassword,
    setEmailToUppercase
}