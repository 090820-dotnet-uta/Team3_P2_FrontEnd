import { Preferences } from './preferences';

export interface User {
    userId?: number;
    username: string;
    email: string;
    password: string;
    city: string;
    latitude: number;
    longitude: number;
    preferencesModel: Preferences;
}
