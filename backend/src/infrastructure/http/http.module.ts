import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/prisma/database.module";
// Importar depois os controlles e usecases
@Module({
    imports: [DatabaseModule],
    controllers:[],
    providers:[
        //Instanciar os use cases aqui
    ],
})

export class HttpModule{}