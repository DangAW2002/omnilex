import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as core from '@termbridge/core';
import { handleToolCall } from '../src/index.js';

describe('T-S4: MCP caches MiniSearch index per (locale, pack) across tool calls', () => {
  beforeEach(() => {
    core.clearSearchIndexCache();
  });

  it('builds or loads MiniSearch index exactly once per locale across multiple tool calls', () => {
    const addAllSpy = vi.spyOn(core.MiniSearch.prototype, 'addAll');

    // Gọi lần 1 cho locale vi -> dựng index và nạp docs
    const res1 = handleToolCall('find_term', { description: 'lãi kép', locale: 'vi' });
    expect(res1.candidates).toBeDefined();
    expect(addAllSpy).toHaveBeenCalledTimes(1);

    // Gọi lần 2 cho locale vi -> lấy từ cache, addAll không được gọi thêm
    const res2 = handleToolCall('find_term', { description: 'tiền gốc', locale: 'vi' });
    expect(res2.candidates).toBeDefined();
    expect(addAllSpy).toHaveBeenCalledTimes(1);

    // Gọi lần 3 cho locale vi -> vẫn lấy từ cache
    const res3 = handleToolCall('find_term', { description: 'lãi suất', locale: 'vi' });
    expect(res3.candidates).toBeDefined();
    expect(addAllSpy).toHaveBeenCalledTimes(1);

    // Gọi lần 1 cho locale en -> dựng index mới cho en
    const resEn1 = handleToolCall('find_term', { description: 'compound interest', locale: 'en' });
    expect(resEn1.candidates).toBeDefined();
    expect(addAllSpy).toHaveBeenCalledTimes(2);

    // Gọi lần 2 cho locale en -> lấy từ cache
    const resEn2 = handleToolCall('find_term', { description: 'principal', locale: 'en' });
    expect(resEn2.candidates).toBeDefined();
    expect(addAllSpy).toHaveBeenCalledTimes(2);

    addAllSpy.mockRestore();
  });
});
