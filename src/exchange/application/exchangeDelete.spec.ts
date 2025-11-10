import { ExchangeDelete } from '@/exchange/application/exchangeDelete';
import { ObjectId } from 'mongodb';

describe('ExchangeDelete use-case', () => {
	const exchangeId = 'ex1';
	const userId = new ObjectId();

	it('returns true when repository deletes the exchange', async () => {
		const mockRepo: any = { deleteExchange: jest.fn().mockResolvedValue(true) };
		const useCase = new ExchangeDelete(mockRepo);

		const result = await useCase.execute(exchangeId, userId);

		expect(mockRepo.deleteExchange).toHaveBeenCalledWith(exchangeId, userId);
		expect(result).toBe(true);
	});

	it('returns false when repository fails to delete', async () => {
		const mockRepo: any = { deleteExchange: jest.fn().mockResolvedValue(false) };
		const useCase = new ExchangeDelete(mockRepo);

		const result = await useCase.execute(exchangeId, userId);

		expect(mockRepo.deleteExchange).toHaveBeenCalledWith(exchangeId, userId);
		expect(result).toBe(false);
	});
});
