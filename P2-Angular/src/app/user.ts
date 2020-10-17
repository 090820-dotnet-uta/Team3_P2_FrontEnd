import { Preferences } from './preferences';

export interface User {
    userId?: number;
    username: string;
    email: string;
    password: string;
    preferencesModel: Preferences;
}
