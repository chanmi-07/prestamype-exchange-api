import { EXCHANGE_TYPE } from "@/exchange/domain/enums/exchange.enum";
import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";

export class ExchangeCreateDto {
    @IsNotEmpty()
    @IsEnum(EXCHANGE_TYPE)
    exchangeType: EXCHANGE_TYPE;
    
    @IsNotEmpty()
    @IsNumber()
    amountSend: number;
}
