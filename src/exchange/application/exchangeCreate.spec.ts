import { ExchangeCreate } from '@/exchange/application/exchangeCreate';
import { EXCHANGE_TYPE } from '@/exchange/domain/enums/exchange.enum';
import { ObjectId } from 'mongodb';

describe('ExchangeCreate use-case', () => {
	afterEach(() => jest.restoreAllMocks());

	it('creates a BUY exchange and calculates amountReceive using purchasePrice', async () => {
		const amountSend = 2;
		const ratesResponse: any = { data: { _id: 'rate1', purchase_price: 5, sale_price: 6 } };
		const mockAdapter: any = { execute: jest.fn().mockResolvedValue(ratesResponse) };

		const createdExchange = { _id: new ObjectId(), amountSend, amountReceive: 10 };
		const mockRepo: any = { createExchange: jest.fn().mockResolvedValue(createdExchange) };

		const useCase = new ExchangeCreate(mockRepo, mockAdapter);

		const dto: any = { exchangeType: EXCHANGE_TYPE.BUY, amountSend };
		const userId = new ObjectId();

		const result = await useCase.execute(dto, userId as any);

		expect(mockAdapter.execute).toHaveBeenCalled();
		// amountReceive = amountSend * purchasePrice = 2 * 5 = 10
		expect(mockRepo.createExchange).toHaveBeenCalledWith(expect.objectContaining({
			amountSend,
			amountReceive: 10,
			exchangeRate: {
				id: ratesResponse.data._id,
				purchasePrice: ratesResponse.data.purchase_price,
				salePrice: ratesResponse.data.sale_price,
			},
			userId: expect.any(ObjectId),
		}));

		expect(result).toBe(createdExchange);
	});

	it('creates a SELL exchange and calculates amountReceive using salePrice', async () => {
		const amountSend = 12;
		const ratesResponse: any = { data: { _id: 'rate2', purchase_price: 4, sale_price: 3 } };
		const mockAdapter: any = { execute: jest.fn().mockResolvedValue(ratesResponse) };

		const expectedAmountReceive = amountSend / ratesResponse.data.sale_price; // 12 / 3 = 4
		const createdExchange = { _id: new ObjectId(), amountSend, amountReceive: expectedAmountReceive };
		const mockRepo: any = { createExchange: jest.fn().mockResolvedValue(createdExchange) };

		const useCase = new ExchangeCreate(mockRepo, mockAdapter);
		const dto: any = { exchangeType: EXCHANGE_TYPE.SELL, amountSend };
		const userId = new ObjectId();

		const result = await useCase.execute(dto, userId as any);

		expect(mockAdapter.execute).toHaveBeenCalled();
		expect(mockRepo.createExchange).toHaveBeenCalledWith(expect.objectContaining({
			amountSend,
			amountReceive: expectedAmountReceive,
			exchangeRate: {
				id: ratesResponse.data._id,
				purchasePrice: ratesResponse.data.purchase_price,
				salePrice: ratesResponse.data.sale_price,
			},
			userId: expect.any(ObjectId),
		}));

		expect(result).toBe(createdExchange);
	});
});
