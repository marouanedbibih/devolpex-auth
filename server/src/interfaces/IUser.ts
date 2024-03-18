import { Document } from "mongoose";

interface IUser extends Document {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    create_date: Date;
    update_date?: Date;
    delete_date?: Date;
}

export default IUser;