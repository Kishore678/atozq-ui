export interface SMTPSettings {
    sMTPSettingsId: number;
    userName: string | null;
    password: string | null;
    email: string | null;
    host: string | null;
    port: number;
    isActive: boolean;
    createdDatec: string;
    modifedDate: string;
}