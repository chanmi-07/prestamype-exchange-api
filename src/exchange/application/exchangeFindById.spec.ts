import { ExchangeFindById } from '@/exchange/application/exchangeFindById';
import { ObjectId } from 'mongodb';

describe('ExchangeFindById use-case', () => {
	const id = 'ex-1';
	const userId = new ObjectId();

	it('returns the exchange when found', async () => {
		const expected = { _id: new ObjectId(), amountSend: 5 };
		const mockRepo: any = { findExchangeById: jest.fn().mockResolvedValue(expected) };
		const useCase = new ExchangeFindById(mockRepo);

		const result = await useCase.execute(id, userId);

		expect(mockRepo.findExchangeById).toHaveBeenCalledWith(id, userId);
		expect(result).toBe(expected);
	});

	it('returns null when not found', async () => {
		const mockRepo: any = { findExchangeById: jest.fn().mockResolvedValue(null) };
		const useCase = new ExchangeFindById(mockRepo);

		const result = await useCase.execute(id, userId);

		expect(mockRepo.findExchangeById).toHaveBeenCalledWith(id, userId);
		expect(result).toBeNull();
	});
});
