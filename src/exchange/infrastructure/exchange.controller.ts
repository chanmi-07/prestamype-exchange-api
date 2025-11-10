import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, DefaultValuePipe, ParseIntPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { ExchangeCreate } from "../application/exchangeCreate";
import type { ExchangeCreateInterface, ExchangeInterface } from "@/exchange/domain/types/exchange.interface";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from '@/auth/decorators/get-user.decorator';
import { ExchangeGetAllPaginated } from "@/exchange/application/exchangeGetAllPaginated";
import { ExchangeFindById } from "@/exchange/application/exchangeFindById";
import { ExchangeDelete } from "@/exchange/application/exchangeDelete";
import { ExchangeCreateDto } from "@/exchange/application/dto/exchangeCreate.dto";

@Controller('exchange')
export class ExchangeController {
    constructor(
        private readonly exchangeCreate: ExchangeCreate,
        private readonly getAllExchangesPaginated: ExchangeGetAllPaginated,
        private readonly exchangeFindById: ExchangeFindById,
        private readonly exchangeDelete: ExchangeDelete,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllPaginated(
        @GetUser() user: any,
        @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number,
        @Query('limit', new DefaultValuePipe(10), new ParseIntPipe()) limit: number,
    ): Promise<ExchangeInterface[]> {
        const { userId } = user ?? {};
        return await this.getAllExchangesPaginated.execute(userId, page, limit);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() exchangeData: ExchangeCreateDto,
        @GetUser() user: any,
    ): Promise<ExchangeInterface> {
        const { userId } = user ?? {};
        // You can pass userId into your application layer if needed
        return await this.exchangeCreate.execute(exchangeData, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(
        @Param('id') id: string,
        @GetUser() user: any,
    ): Promise<ExchangeInterface | null> {
        const { userId } = user ?? {};
        return await this.exchangeFindById.execute(id, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('id') id: string,
        @GetUser() user: any,
    ): Promise<{ success: boolean }> {
        const { userId } = user ?? {};
        const result = await this.exchangeDelete.execute(id, userId);
        return { success: result };
    }
}