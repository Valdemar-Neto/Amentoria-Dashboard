import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IEncrypter } from "../../domain/gateway/cryptography/encrypter";

@Injectable()
export class JwtEncrypter implements IEncrypter{
    constructor (private readonly jwtService: JwtService){}

    async encrypt(payload: Record<string, unknown>): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }
}
