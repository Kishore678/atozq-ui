export interface EmailAccount {
    emailAccountId: number;
    userName: string | null;
    password: string | null;
    isActive: boolean;
    message: string | null;
    createdDate: string;
    modifiedDate: string;
}