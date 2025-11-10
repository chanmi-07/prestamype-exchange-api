import { Module } from "@nestjs/common";
import { ExchangeController } from "@/exchange/infrastructure/exchange.controller";
import { ExchangeMongoRepository } from "@/exchange/infrastructure/exchangeMongo.repository";
import { ExchangeCreate } from "@/exchange/application/exchangeCreate";
import { ExchangeRepository } from "@/exchange/domain/exchange.repository";
import { GetRatesAdapter } from "@/integrations/cambioseguro/infrastructure/getRates.adapter";
import { ExchangeGetAllPaginated } from "@/exchange/application/exchangeGetAllPaginated";
import { ExchangeFindById } from "@/exchange/application/exchangeFindById";
import { ExchangeDelete } from "@/exchange/application/exchangeDelete";

@Module({
    controllers: [ExchangeController],
    providers: [
        { provide: 'GetRatesAdapter', useClass: GetRatesAdapter },
        { provide: 'ExchangeRepository', useClass: ExchangeMongoRepository },
        {
            provide: ExchangeCreate,
            useFactory: (repo: ExchangeRepository, getRatesAdapter: GetRatesAdapter) => new ExchangeCreate(repo, getRatesAdapter),
            inject: ['ExchangeRepository', 'GetRatesAdapter'],
        },
        {
            provide: ExchangeGetAllPaginated,
            useFactory: (repo: ExchangeRepository) => new ExchangeGetAllPaginated(repo),
            inject: ['ExchangeRepository'],
        },
        {
            provide: ExchangeFindById,
            useFactory: (repo: ExchangeRepository) => new ExchangeFindById(repo),
            inject: ['ExchangeRepository'],
        },
        {
            provide: ExchangeDelete,
            useFactory: (repo: ExchangeRepository) => new ExchangeDelete(repo),
            inject: ['ExchangeRepository'],
        }
    ],
})
export class ExchangeModule {}