import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ExchangeCreate } from "../application/exchangeCreate";
import type { ExchangeInterface } from "../domain/types/exchange.interface";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from '@/auth/decorators/get-user.decorator';

@Controller('exchange')
export class ExchangeController {
    constructor(
        private readonly exchangeCreate: ExchangeCreate,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
        async create(
            @Body() exchangeData: ExchangeInterface,
            @GetUser() user: any,
        ): Promise<ExchangeInterface> {
            const { userId } = user ?? {};
            // You can pass userId into your application layer if needed
            return await this.exchangeCreate.execute(exchangeData, userId);
    }
}