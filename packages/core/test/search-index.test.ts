import { describe, it, expect } from 'vitest';
import {
  createSearchIndex,
  loadSearchIndex,
  searchIndexToJSON,
  type SearchDoc,
} from '../src/search-config.js';
import { normalizeSearchTerm } from '../src/matcher.js';

describe('T-S1: MiniSearch toJSON and loadJSON Consistency (>= 50 queries)', () => {
  const sampleDocs: SearchDoc[] = [
    {
      id: 'compound-interest',
      label: 'Lãi kép',
      qualifier: undefined,
      aliases: 'lãi nhập gốc',
      loanwords: 'compound interest',
      plain_descriptions: 'tiền lãi lại sinh ra lãi lãi mẹ đẻ lãi con',
      summary: 'Tiền lãi được cộng vào gốc mỗi kỳ.',
      domains: ['finance/personal-finance/saving'],
    },
    {
      id: 'interest-rate',
      label: 'Lãi suất',
      qualifier: undefined,
      aliases: 'tỷ lệ lãi',
      loanwords: '',
      plain_descriptions: 'phần trăm tiền lãi lãi vay ngân hàng',
      summary: 'Tỷ lệ phần trăm tính trên số tiền gốc.',
      domains: ['finance/banking/lending'],
    },
    {
      id: 'principal',
      label: 'Tiền gốc',
      qualifier: undefined,
      aliases: 'vốn gốc',
      loanwords: '',
      plain_descriptions: 'tiền vốn ban đầu khoản vay gốc',
      summary: 'Khoản tiền ban đầu đem đầu tư hoặc vay mượn.',
      domains: ['finance/personal-finance/saving'],
    },
    {
      id: 'roi',
      label: 'ROI',
      qualifier: undefined,
      aliases: 'tỷ suất hoàn vốn',
      loanwords: 'ROI',
      plain_descriptions: 'tỷ lệ thu hồi vốn hiệu quả đầu tư',
      summary: 'Tỷ số giữa lợi nhuận ròng và chi phí bỏ ra.',
      domains: ['finance/investing/valuation'],
    },
    {
      id: 'cookie',
      label: 'Cookie',
      qualifier: undefined,
      aliases: 'tệp cookie',
      loanwords: 'cookie',
      plain_descriptions: 'tệp lưu phiên đăng nhập web nhớ người dùng',
      summary: 'Tệp dữ liệu nhỏ lưu trên trình duyệt.',
      domains: ['it/web/frontend'],
    },
    {
      id: 'token-auth',
      label: 'Token',
      qualifier: '(Bảo mật)',
      aliases: 'mã định danh',
      loanwords: 'token',
      plain_descriptions: 'chuỗi ký tự xác thực phiên đăng nhập',
      summary: 'Chuỗi ký tự dùng để xác thực quyền truy cập.',
      domains: ['it/security'],
    },
    {
      id: 'token-llm',
      label: 'Token',
      qualifier: '(AI)',
      aliases: 'mẩu từ',
      loanwords: 'token',
      plain_descriptions: 'đơn vị từ ngữ nhỏ nhất mô hình AI đọc',
      summary: 'Đơn vị văn bản nhỏ nhất trong mô hình ngôn ngữ.',
      domains: ['it/ai-ml'],
    },
  ];

  const queries = [
    // 1-10: Vietnamese exact & accented
    'Lãi kép', 'Lãi suất', 'Tiền gốc', 'tỷ suất hoàn vốn', 'tệp cookie',
    'xác thực', 'mô hình AI', 'đầu tư', 'khoản vay', 'lợi nhuận ròng',
    // 11-20: Vietnamese unaccented (không dấu)
    'lai kep', 'lai suat', 'tien goc', 'ty suat hoan von', 'tep cookie',
    'xac thuc', 'mo hinh ai', 'dau tu', 'khoan vay', 'loi nhuan',
    // 21-30: English terms & loanwords
    'Compound interest', 'interest', 'principal', 'ROI', 'cookie',
    'token', 'web', 'frontend', 'security', 'saving',
    // 31-40: Prefixes (tiền tố)
    'lãi', 'tiền', 'tỷ', 'đầu', 'khoản',
    'comp', 'inte', 'prin', 'cook', 'tok',
    // 41-50: Typos & colloquial variations
    'lãi kẹp', 'lãi suât', 'tiên gốc', 'coookie', 'tokken',
    'lãi mẹ đẻ lãi con', 'nhớ người dùng', 'đơn vị từ ngữ', 'thu hồi vốn', 'vay ngân hàng',
    // 51-55: Extra edge queries
    'finance', 'banking', 'valuation', 'auth', 'llm'
  ];

  it('serializes to JSON and reloads with 100% identical search results on all 55 queries', () => {
    expect(queries.length).toBeGreaterThanOrEqual(50);

    const freshIndex = createSearchIndex(sampleDocs);
    const serialized = searchIndexToJSON(freshIndex);
    const loadedIndex = loadSearchIndex(serialized);

    for (const q of queries) {
      const freshResults = freshIndex.search(q);
      const loadedResults = loadedIndex.search(q);

      expect(loadedResults.length).toBe(freshResults.length);

      for (let i = 0; i < freshResults.length; i++) {
        expect(loadedResults[i].id).toBe(freshResults[i].id);
        expect(loadedResults[i].score).toBeCloseTo(freshResults[i].score, 5);
      }
    }
  });
});
