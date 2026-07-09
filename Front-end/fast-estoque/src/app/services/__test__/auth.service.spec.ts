import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '../auth.service';

const mockHttp = {
  post: vi.fn(),
};

const service = new AuthService(mockHttp as any);

describe('Authservice', () => {
  it('deve chamar a URL correta ao fazer login', () => {
    mockHttp.post.mockReturnValue({ subscribe: vi.fn() });
  });

  service.login('teste@gmail.com', '1234')

  expect(mockHttp.post).toHaveBeenCalledWith(
    'http://localhost:3000/auth/login',
    {email: 'teste@gmail.com', password: '1234'}
  )
});
