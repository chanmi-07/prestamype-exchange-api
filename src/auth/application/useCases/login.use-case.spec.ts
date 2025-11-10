import { LoginUseCase } from '@/auth/application/useCases/login.use-case';

describe('LoginUseCase', () => {
  const credentials = { email: 'user@example.com', password: 'secret' };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns accessToken when credentials are valid', async () => {
    const user = { _id: 'abc123', email: credentials.email, password: 'hashed', firstName: 'Jane' };
    const mockRepo: any = { findByEmail: jest.fn().mockResolvedValue(user) };
    const mockBcrypt: any = { comparePasswords: jest.fn().mockResolvedValue(true) };
    const mockJwt: any = { sign: jest.fn().mockResolvedValue('token-xyz') };

    const useCase = new LoginUseCase(mockRepo, mockBcrypt, mockJwt);
    const result = await useCase.execute(credentials);

    expect(mockRepo.findByEmail).toHaveBeenCalledWith(credentials.email);
    expect(mockBcrypt.comparePasswords).toHaveBeenCalledWith(credentials.password, user.password);
    expect(mockJwt.sign).toHaveBeenCalledWith(
      { sub: user._id, email: user.email, name: user.firstName },
      { expiresIn: '1h' },
    );
    expect(result).toEqual({ accessToken: 'token-xyz' });
  });

  it('throws when user is not found', async () => {
    const mockRepo: any = { findByEmail: jest.fn().mockResolvedValue(null) };
    const mockBcrypt: any = { comparePasswords: jest.fn() };
    const mockJwt: any = { sign: jest.fn() };

    const useCase = new LoginUseCase(mockRepo, mockBcrypt, mockJwt);

    await expect(useCase.execute(credentials)).rejects.toThrow('User not found');
  });

  it('throws when password is invalid', async () => {
    const user = { _id: 'abc123', email: credentials.email, password: 'hashed', firstName: 'Jane' };
    const mockRepo: any = { findByEmail: jest.fn().mockResolvedValue(user) };
    const mockBcrypt: any = { comparePasswords: jest.fn().mockResolvedValue(false) };
    const mockJwt: any = { sign: jest.fn() };

    const useCase = new LoginUseCase(mockRepo, mockBcrypt, mockJwt);

    await expect(useCase.execute(credentials)).rejects.toThrow('Invalid password');
  });
});
