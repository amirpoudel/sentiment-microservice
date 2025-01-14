import bcrypt from '../../../../auth-service/node_modules/@types/bcrypt';


const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

