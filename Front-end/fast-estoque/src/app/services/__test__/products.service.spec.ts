import '@angular/compiler';
import { describe, it, vi, expect } from 'vitest';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';

const mockHttp = {
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
};

const mockAuthService = {
  getToken: vi.fn().mockReturnValue('token_false'),
};

const service = new ProductsService(mockHttp as any, mockAuthService as any);

describe('ProductsService', () => {
  it('deve chamar a URL correta ao listar produtos', () => {
    mockHttp.get.mockReturnValue({ subscribe: vi.fn() });

    service.listProducts(1);

    expect(mockHttp.get).toHaveBeenCalledWith(
      'http://localhost:3000/products?page=1',
    );
  });

  it('deve chamar a URL correta ao criar produto', () => {
    mockHttp.post.mockReturnValue({ subscribe: vi.fn() });

    service.createProduct({ name: 'Produto', price: 10, quantity: 5 });

    expect(mockHttp.post).toHaveBeenCalledWith(
      'http://localhost:3000/products',
      { name: 'Produto', price: 10, quantity: 5 },
      expect.objectContaining({ headers: expect.anything() }),
    );
  });

  it('deve chamar a URL correta ao atualizar produto', () => {
    mockHttp.patch.mockReturnValue({ subscribe: vi.fn() });

    service.updateProduct('1', { name: 'Novo', price: 30, quantity: 5 });

    expect(mockHttp.patch).toHaveBeenCalledWith(
      'http://localhost:3000/products/1',
      { name: 'Novo', price: 30, quantity: 5 },
      expect.objectContaining({ headers: expect.anything() }),
    );
  });

  it('deve chamar a URL correta ao deletar produto', () => {
    mockHttp.delete.mockReturnValue({ subscribe: vi.fn() });

    service.deleteProduct('1');

    expect(mockHttp.delete).toHaveBeenCalledWith(
      'http://localhost:3000/products/1',
      expect.objectContaining({ headers: expect.anything() }),
    );
  });
});
