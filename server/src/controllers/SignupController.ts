import { Request, Response } from 'express';
import IUserValidationInfos from '../interfaces/IUserValidationInfos';
import userValidation from '../services/UserValidation';
import { capitalizeFirstLetter, hashPassword, setEmailToUppercase } from '../functions/Formulation';
import UserModel from '../models/User'; // Import your Mongoose User model

export const signup = async (req: Request, res: Response) => {
    try {
        const user: IUserValidationInfos = req.body;
        const validationResult = await userValidation(user);

        if (!validationResult.isOK) {
            return res.status(400).json({ error: validationResult.errors });
        }

        // Validation succeeded, proceed with creating the user in the database
        const newUser = new UserModel({
            first_name: capitalizeFirstLetter(user.first_name),
            last_name: capitalizeFirstLetter(user.last_name),
            username: user.username,
            email: setEmailToUppercase(user.email),
            phone: user.phone,
            password: await hashPassword(user.password),
            create_date: new Date(),
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // You can customize the response as needed
    } catch (error) {
        console.error('Error while creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
