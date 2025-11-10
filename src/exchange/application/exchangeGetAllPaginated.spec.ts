import { ExchangeGetAllPaginated } from '@/exchange/application/exchangeGetAllPaginated';
import { ObjectId } from 'mongodb';

describe('ExchangeGetAllPaginated use-case', () => {
	const userId = new ObjectId().toHexString();

	it('calls repository with ObjectId and returns results', async () => {
		const expected = [{ _id: new ObjectId(), amountSend: 1 }];
		const mockRepo: any = { getAllExchangesPaginated: jest.fn().mockResolvedValue(expected) };
		const useCase = new ExchangeGetAllPaginated(mockRepo);

		const result = await useCase.execute(userId, 1, 10);

		expect(mockRepo.getAllExchangesPaginated).toHaveBeenCalledWith(expect.any(ObjectId), 1, 10);
		expect(result).toBe(expected);
	});

	it('passes page and limit through', async () => {
		const mockRepo: any = { getAllExchangesPaginated: jest.fn().mockResolvedValue([]) };
		const useCase = new ExchangeGetAllPaginated(mockRepo);

		await useCase.execute(userId, 2, 5);

		expect(mockRepo.getAllExchangesPaginated).toHaveBeenCalledWith(expect.any(ObjectId), 2, 5);
	});
});
