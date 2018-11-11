
export interface IJwtPayload {
    email: string;
    name: string;
    admin: boolean;
}

export function JwtPayload(payload: IJwtPayload) {
    this.email = payload.email;
    this.name = payload.name;
    this.admin = payload.admin;
}

export class JwtPayloadObj implements IJwtPayload {
    public name: string;
    public email: string;
    public admin: boolean;

    constructor(payload: IJwtPayload) {
        this.name = payload.name;
        this.email = payload.email;
        this.admin = payload.admin;
    }
}