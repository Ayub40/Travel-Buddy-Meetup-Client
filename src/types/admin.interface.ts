export interface IAdmin {
    id: string;
    name?: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
    isDeleted: boolean;

    createdAt: string;
    updatedAt: string;
}
