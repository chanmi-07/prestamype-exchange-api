import { UserFindByEMail } from '@/user/application/userFindByEMail';

describe('UserFindByEMail use-case', () => {
	const mockEmail = 'alice@example.com';

	it('returns user when repository finds one', async () => {
		const expectedUser = { _id: '1', email: mockEmail, firstName: 'Alice' };
		const mockRepo: any = { findByEmail: jest.fn().mockResolvedValue(expectedUser) };

		const useCase = new UserFindByEMail(mockRepo);
		const result = await useCase.execute(mockEmail);

		expect(mockRepo.findByEmail).toHaveBeenCalledWith(mockEmail);
		expect(result).toBe(expectedUser);
	});

	it('returns null when repository returns null', async () => {
		const mockRepo: any = { findByEmail: jest.fn().mockResolvedValue(null) };
		const useCase = new UserFindByEMail(mockRepo);
		const result = await useCase.execute(mockEmail);

		expect(mockRepo.findByEmail).toHaveBeenCalledWith(mockEmail);
		expect(result).toBeNull();
	});
});
