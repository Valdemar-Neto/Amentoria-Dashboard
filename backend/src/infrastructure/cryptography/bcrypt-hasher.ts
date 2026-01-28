import { IHasher } from "../.././domain/gateway/cryptography/hasher";
import {hash, compare} from 'bcryptjs';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptHasher implements IHasher{
    private HASH_SALT_LENGHT = 8;

    async hash(plain: string): Promise<string>{
        return await hash(plain, this.HASH_SALT_LENGHT);
    }

    async compare(plain: string, hashed: string): Promise<boolean>{
        return await compare(plain, hashed);
    }
}