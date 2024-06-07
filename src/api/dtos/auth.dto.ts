/**
 * RegisterDto
 * @typedef {object} RegisterDto
 * @property {string} email.required - The title
 * @property {string} password.required - The title
 */
export interface RegisterDto {
    email: string;
    password: string;
}

export interface RegisterResDto {
    token: string;
}

/**
 * LoginDto
 * @typedef {object} LoginDto
 * @property {string} email.required - The title
 * @property {string} password.required - The title
 */
export interface LoginDto {
    email: string;
    password: string;
}

/**
 * LoginResDto
 * @typedef {object} LoginResDto
 * @property {string} token.required - The title
 * @property {string} refreshToken.required - The title
 */
export interface LoginResDto {
    token: string;
    refreshToken: string;
}

/**
 * ForgotPasswordDto
 * @typedef {object} ForgotPasswordDto
 * @property {string} email.required - The title
 */
export interface ForgotPasswordDto {
    email: string;
}

/**
 * ResetPasswordDto
 * @typedef {object} ResetPasswordDto
 * @property {string} token.required - The title
 * @property {string} password.required - The title
 */
export interface ResetPasswordDto {
    token: string;
    password: string;
}
