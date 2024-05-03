// item.service.test.js

import ItemsService from './items.service';
import {  describe, expect, it, vi } from 'vitest';
describe('ItemsService', () => {
  it('should fetch items from the server', async () => {
    // Arrange
    const mockResponse = new Response('Mock data', { status: 200 });
    const mockFetch = vi.fn().mockResolvedValue(mockResponse);
    global.fetch = mockFetch;
    const result = await ItemsService.fetchItems();
    const BASE_URL = await import.meta.env.VITE_API_URL;
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/items`);
    expect(result).toEqual(mockResponse);
  });

  it('should handle fetch errors', async () => {
    const mockError = new Error('Network error');
    const mockFetch = vi.fn().mockRejectedValue(mockError);
    global.fetch = mockFetch;
    await expect(ItemsService.fetchItems()).rejects.toThrowError(mockError);
  });
});
