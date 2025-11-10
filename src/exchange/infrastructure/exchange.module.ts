import { Module } from "@nestjs/common";
import { ExchangeController } from "@/exchange/infrastructure/exchange.controller";
import { ExchangeMongoRepository } from "@/exchange/infrastructure/exchangeMongo.repository";
import { ExchangeCreate } from "@/exchange/application/exchangeCreate";
import { ExchangeRepository } from "@/exchange/domain/exchange.repository";
import { GetRatesAdapter } from "@/integrations/cambioseguro/infrastructure/getRates.adapter";

@Module({
    controllers: [ExchangeController],
    providers: [
        { provide: 'GetRatesAdapter', useClass: GetRatesAdapter },
        { provide: 'ExchangeRepository', useClass: ExchangeMongoRepository },
        {
            provide: ExchangeCreate,
            useFactory: (repo: ExchangeRepository, getRatesAdapter: GetRatesAdapter) => new ExchangeCreate(repo, getRatesAdapter),
            inject: ['ExchangeRepository', 'GetRatesAdapter'],
        }
    ],
})
export class ExchangeModule {}