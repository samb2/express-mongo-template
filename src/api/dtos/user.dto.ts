import { Types } from 'mongoose';
import { IUserDocument } from '../../database/model/user';

export interface UserDto extends IUserDocument {
    id: Types.ObjectId;
}

export interface UserProfileResDto {
    firstName: string;
    lastName: string;
    id: Types.ObjectId;
    email: string;
}

/**
 * UserUpdateDto
 * @typedef {object} UserUpdateDto
 * @property {string} firstName.required - The title
 * @property {string} lastName.required - The title
 */
export interface UserUpdateDto {
    firstName: string;
    lastName: string;
}

export interface UserUpdateResDto {
    firstName: string;
    lastName: string;
    id: Types.ObjectId;
    email: string;
}
