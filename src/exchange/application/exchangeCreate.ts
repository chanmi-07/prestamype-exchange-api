/**
 * This use case handles the creation of an exchange transaction.
 * It retrieves current exchange rates, calculates the amount to be received,
 * and stores the exchange details in the repository.
 */
import { ExchangeRepository } from "@/exchange/domain/exchange.repository";
import { ExchangeCreateInterface, ExchangeInterface } from "@/exchange/domain/types/exchange.interface";
import { GetRatesAdapter } from "@/integrations/cambioseguro/infrastructure/getRates.adapter";
import { ExchangeCalculatorFactory } from "@/exchange/domain/factories/exchangeCalculator.factory";
import { ObjectId } from "mongodb";
import { ExchangeCreateDto } from "@/exchange/application/dto/exchangeCreate.dto";

export class ExchangeCreate {
    constructor(
        private readonly exchangeRepository: ExchangeRepository,
        private readonly getRatesAdapter: GetRatesAdapter,
    ) {}

    async execute(data: ExchangeCreateDto, userId: ObjectId): Promise<ExchangeInterface> {
        const ratesResponse = await this.getRatesAdapter.execute();

        const exchangeRates = {
            amountSend: data.amountSend,
            purchasePrice: ratesResponse.data.purchase_price,
            salePrice: ratesResponse.data.sale_price,
        }

        const amountReceive = ExchangeCalculatorFactory.calculate(data.exchangeType, exchangeRates);

        const exchangeToCreate: ExchangeInterface = {
            ...data,
            amountReceive,
            exchangeRate: {
                id: ratesResponse.data._id,
                purchasePrice: ratesResponse.data.purchase_price,
                salePrice: ratesResponse.data.sale_price,
            },
            userId: new ObjectId(userId),
        };

        return await this.exchangeRepository.createExchange(exchangeToCreate);
    }
}