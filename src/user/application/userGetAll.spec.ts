import { UserGetAll } from './userGetAll';

describe('UserGetAll use-case', () => {
	it('returns list of users from repository', async () => {
		const users = [
			{ _id: '1', email: 'a@example.com', firstName: 'A' },
			{ _id: '2', email: 'b@example.com', firstName: 'B' },
		];
		const mockRepo: any = { findAllUsers: jest.fn().mockResolvedValue(users) };

		const useCase = new UserGetAll(mockRepo);
		const result = await useCase.execute();

		expect(mockRepo.findAllUsers).toHaveBeenCalled();
		expect(result).toBe(users);
	});

	it('returns empty array when no users', async () => {
		const mockRepo: any = { findAllUsers: jest.fn().mockResolvedValue([]) };
		const useCase = new UserGetAll(mockRepo);
		const result = await useCase.execute();

		expect(mockRepo.findAllUsers).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
});
