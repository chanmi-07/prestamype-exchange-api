import { UserCreate } from './userCreate';
import { BcryptHasherService } from '@/shared/security/services/bcryptHasher.service';
import { WelcomeMailerService } from '@/shared/mailer/services/welcomeMailer.service';

describe('UserCreate use-case', () => {
	const mockUserData = {
		firstName: 'John',
		lastName: 'Doe',
		email: 'john@example.com',
		password: 'plainPassword',
	};

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('creates a user successfully', async () => {
		const createdUser = { ...mockUserData, _id: 'someId' };

		const mockRepo: any = {
			findByEmail: jest.fn().mockResolvedValue(null),
			createUser: jest.fn().mockResolvedValue(createdUser),
		};

		// Stub bcrypt hasher to avoid real hashing
		const hashSpy = jest.spyOn(BcryptHasherService.prototype, 'hashPassword').mockResolvedValue('hashedPass');
		const mailerSpy = jest.spyOn(WelcomeMailerService.prototype, 'sendWelcomeEmail').mockImplementation(async () => {});

		const useCase = new UserCreate(mockRepo);
		const result = await useCase.execute({ ...mockUserData });

		expect(mockRepo.findByEmail).toHaveBeenCalledWith(mockUserData.email);
		expect(hashSpy).toHaveBeenCalledWith(mockUserData.password);
		expect(mockRepo.createUser).toHaveBeenCalledWith(expect.objectContaining({
			email: mockUserData.email,
			password: 'hashedPass',
		}));
		expect(mailerSpy).toHaveBeenCalled();
		expect(result).toEqual(createdUser);
	});

	it('throws when email is already registered', async () => {
		const mockRepo: any = {
			findByEmail: jest.fn().mockResolvedValue({ email: mockUserData.email }),
			createUser: jest.fn(),
		};

		const useCase = new UserCreate(mockRepo);

		await expect(useCase.execute({ ...mockUserData })).rejects.toThrow('Email is already registered');
		expect(mockRepo.createUser).not.toHaveBeenCalled();
	});

	it('throws when createUser returns null', async () => {
		const mockRepo: any = {
			findByEmail: jest.fn().mockResolvedValue(null),
			createUser: jest.fn().mockResolvedValue(null),
		};

		jest.spyOn(BcryptHasherService.prototype, 'hashPassword').mockResolvedValue('hashedPass');
		const useCase = new UserCreate(mockRepo);

		await expect(useCase.execute({ ...mockUserData })).rejects.toThrow('User creation failed');
	});
});

