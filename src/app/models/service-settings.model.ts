export interface ServiceSettings {
    serviceSettingsId: number;
    serviceName: string | null;
    startDueInSeconds: number;
    intervalInSeconds: number;
    isActive: boolean;
    createdDatec: string;
    modifedDate: string;
}