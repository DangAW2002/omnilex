import { expect, test } from 'claude-code/testing'
import {
  GOLDEN_CONCEPTS_VI,
  GOLDEN_CONCEPTS_EN,
  GOLDEN_TERMS_VI,
  GOLDEN_TERMS_EN,
} from './golden-fixtures.ts'

function setup(on: any) {
  on('fs.read', (_: any, e: any) => {
    if (e.path.endsWith('terms-vi.json')) return { value: JSON.stringify(GOLDEN_TERMS_VI) }
    if (e.path.endsWith('terms-en.json')) return { value: JSON.stringify(GOLDEN_TERMS_EN) }
    if (e.path.endsWith('concepts-vi.json')) {
      return {
        value: JSON.stringify(
          GOLDEN_CONCEPTS_VI.map((c) => ({ id: c.id, content: `## Giải thích dễ hiểu\n${c.summary}` }))
        ),
      }
    }
    if (e.path.endsWith('concepts-en.json')) {
      return {
        value: JSON.stringify(
          GOLDEN_CONCEPTS_EN.map((c) => ({ id: c.id, content: `## Easy explanation\n${c.summary}` }))
        ),
      }
    }
    if (e.path.endsWith('search-vi.json')) return { value: JSON.stringify(GOLDEN_CONCEPTS_VI) }
    if (e.path.endsWith('search-en.json')) return { value: JSON.stringify(GOLDEN_CONCEPTS_EN) }
    return { value: '[]' }
  })
  on('command.register', () => ({ value: undefined }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('prompt.fill', () => ({ isFilled: true }))
  on('session.start', () => ({ cwd: '/work' }))
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['original reply'] }))
}

// 30 câu trả lời mẫu kiểu Claude (T-X2)
export const GOLDEN_REPLIES = [
  // 1-4: Câu ngắn cơ bản
  { id: 'g01-vi-compound', text: 'Lãi kép là chìa khóa để gia tăng tài sản dài hạn.' },
  { id: 'g02-en-compound', text: 'Compound Interest is one of the most powerful financial concepts.' },
  { id: 'g03-vi-roi', text: 'Chỉ số ROI đo lường hiệu quả đầu tư của dự án.' },
  { id: 'g04-en-roi', text: 'The ROI of this marketing campaign exceeded our expectations.' },

  // 5-6: Danh sách gạch đầu dòng
  {
    id: 'g05-vi-list',
    text: [
      'Các khái niệm tài chính nền tảng:',
      '- Lãi suất: tỷ lệ phần trăm tính trên tiền gửi.',
      '- Lãi kép: tiền lãi sinh ra từ cả gốc lẫn lãi trước đó.',
      '- Tiền gốc: khoản tiền ban đầu chưa tính lãi.',
    ].join('\n'),
  },
  {
    id: 'g06-en-list',
    text: [
      'Core financial components:',
      '- Principal: initial invested capital.',
      '- Interest rate: percentage charged or earned.',
      '- Compound Interest: earning returns upon accumulated returns.',
    ].join('\n'),
  },

  // 7-8: Code fence (thuật ngữ trong code KHÔNG được autolink)
  {
    id: 'g07-vi-code-fence',
    text: [
      'Dưới đây là ví dụ tính Lãi kép trong JavaScript:',
      '```javascript',
      '// Lãi kép trong code fence không được autolink',
      'const principal = 1000;',
      'const laiKep = principal * Math.pow(1 + rate, n);',
      '```',
      'Sau khi tính xong, số tiền được cộng dồn vào Tiền gốc.',
    ].join('\n'),
  },
  {
    id: 'g08-en-code-fence',
    text: [
      'Here is a Compound Interest formula implementation in Python:',
      '```python',
      '# Compound Interest inside code block',
      'total = principal * (1 + rate) ** periods',
      '```',
      'Notice that the Interest rate compounding increases the final balance.',
    ].join('\n'),
  },

  // 9-10: Bảng Markdown (Table)
  {
    id: 'g09-vi-table',
    text: [
      '| Thuật ngữ | Ý nghĩa |',
      '|---|---|',
      '| Tiền gốc | Vốn khởi điểm |',
      '| Lãi kép | Lãi nhập gốc |',
      '',
      'Đó là sự khác biệt chính.',
    ].join('\n'),
  },
  {
    id: 'g10-en-table',
    text: [
      '| Concept | Key takeaway |',
      '|---|---|',
      '| Principal | Starting capital |',
      '| Compound Interest | Snowballing returns |',
      '',
      'Both play a vital role.',
    ].join('\n'),
  },

  // 11-12: Tiêu đề (Headings)
  {
    id: 'g11-vi-headings',
    text: [
      '## Phân tích Lãi kép và Lãi suất',
      'Đoạn văn này giải thích cách Tiền gốc tăng trưởng nhờ Lãi kép.',
    ].join('\n'),
  },
  {
    id: 'g12-en-headings',
    text: [
      '## Understanding Compound Interest and ROI',
      'We evaluate ROI based on initial Principal and time horizon.',
    ].join('\n'),
  },

  // 13-14: Inline code (không autolink trong `...`)
  {
    id: 'g13-vi-inline-code',
    text: 'Không nhầm lẫn giữa Lãi kép thông thường và hàm `Lãi kép` hoặc biến `ROI`.',
  },
  {
    id: 'g14-en-inline-code',
    text: 'Do not confuse Compound Interest with `Compound Interest` identifier or `ROI` attribute.',
  },

  // 15-16: Markdown links (không autolink trong link markdown)
  {
    id: 'g15-vi-links',
    text: 'Đọc thêm tại [Lãi kép trên Wikipedia](https://vi.wikipedia.org/wiki/Lai_kep) để hiểu về Tiền gốc.',
  },
  {
    id: 'g16-en-links',
    text: 'Check the [Compound Interest guide](https://example.com/roi) before computing your ROI.',
  },

  // 17-18: Cookie
  {
    id: 'g17-vi-cookie',
    text: 'Trang web lưu trữ Cookie trên trình duyệt người dùng để quản lý phiên đăng nhập.',
  },
  {
    id: 'g18-en-cookie',
    text: 'The server sets a Cookie header in the HTTP response to maintain state.',
  },

  // 19-20: Margin
  {
    id: 'g19-vi-margin',
    text: 'Giao dịch ký quỹ Margin đòi hỏi nhà đầu tư phải kiểm soát rủi ro đòn bẩy.',
  },
  {
    id: 'g20-en-margin',
    text: 'Trading on Margin involves borrowed funds and maintenance thresholds.',
  },

  // 21-22: Profit margin
  {
    id: 'g21-vi-profit-margin',
    text: 'Doanh nghiệp duy trì Biên lợi nhuận ổn định qua các quý kinh doanh.',
  },
  {
    id: 'g22-en-profit-margin',
    text: 'The quarterly report showed a healthy Profit Margin across all product lines.',
  },

  // 23-24: Simple interest vs compound interest
  {
    id: 'g23-vi-simple-interest',
    text: 'Lãi đơn chỉ tính trên Tiền gốc ban đầu, không tạo hiệu ứng Lãi kép.',
  },
  {
    id: 'g24-en-simple-interest',
    text: 'Simple interest only accrues on the initial Principal, unlike Compound Interest.',
  },

  // 25-26: Nhiều đoạn văn (Multi-paragraph)
  {
    id: 'g25-vi-multi-para',
    text: [
      'Đầu tư tài chính luôn bắt đầu từ việc tích lũy Tiền gốc.',
      '',
      'Khi áp dụng cơ chế Lãi kép, lợi nhuận sẽ tăng trưởng theo cấp số nhân.',
      '',
      'Chỉ số ROI sẽ phản ánh rõ hiệu quả của toàn bộ chiến lược.',
    ].join('\n'),
  },
  {
    id: 'g26-en-multi-para',
    text: [
      'Strategic planning begins with protecting your initial Principal.',
      '',
      'Over prolonged horizons, Compound Interest drives non-linear asset expansion.',
      '',
      'Ultimately, tracking ROI validates your financial assumptions.',
    ].join('\n'),
  },

  // 27-28: Câu dài nhiều dòng
  {
    id: 'g27-vi-long-sentence',
    text: 'Khi bạn gửi tiền tiết kiệm có kỳ hạn tại ngân hàng, Lãi suất sẽ được áp dụng cho Tiền gốc ban đầu và nếu bạn chọn phương thức tái tục định kỳ thì Lãi kép sẽ phát huy tác dụng giúp gia tăng tài sản một cách bền vững theo năm tháng.',
  },
  {
    id: 'g28-en-long-sentence',
    text: 'When you allocate your hard-earned capital into high-yield instruments, the Interest rate compounds on the original Principal so that Compound Interest produces exponential growth and elevates your overall ROI.',
  },

  // 29-30: Câu không có thuật ngữ (Negative controls)
  {
    id: 'g29-vi-unmatched',
    text: 'Hệ thống cơ sở dữ liệu phân tán sử dụng thuật toán đồng thuận để đồng bộ dữ liệu giữa các máy chủ.',
  },
  {
    id: 'g30-en-unmatched',
    text: 'The quick brown fox jumps over the lazy dog on a sunny afternoon in the forest.',
  },
]

test('T-X2: Golden Test Suite runs all 30 Claude-style replies in hover mode', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'mode hover' })

  let totalTermsFound = 0

  for (let i = 0; i < GOLDEN_REPLIES.length; i++) {
    const item = GOLDEN_REPLIES[i]
    const ui = await $.ui.mount({
      plugin: 'omnilex',
      surface: 'terminal',
      component: 'AssistantMessage',
      requestId: `golden-hover-${item.id}`,
      viewport: { columns: 100, rows: 40 },
      props: { text: item.text, isFirstOfReply: true },
    })

    const buttons = await ui.findAll({ type: 'Button' })
    totalTermsFound += buttons.length

    // Negative controls phải có 0 buttons term
    if (item.id.includes('unmatched')) {
      expect(buttons.length).toBe(0)
    } else {
      // Câu có thuật ngữ phải bắt được ít nhất 1 button
      expect(buttons.length).toBeGreaterThan(0)
    }

    await ui.unmount()
  }

  // Khẳng định tổng số term nhận diện trong bộ 30 câu mẫu
  expect(totalTermsFound).toBeGreaterThanOrEqual(40)
})

test('T-X2: Golden Test Suite runs all 30 Claude-style replies in links mode', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'mode links' })

  let totalLinks = 0

  for (let i = 0; i < GOLDEN_REPLIES.length; i++) {
    const item = GOLDEN_REPLIES[i]
    const ui = await $.ui.mount({
      plugin: 'omnilex',
      surface: 'terminal',
      component: 'AssistantMessage',
      requestId: `golden-links-${item.id}`,
      viewport: { columns: 100, rows: 40 },
      props: { text: item.text, isFirstOfReply: true },
    })

    const drawn = JSON.stringify(await ui.drawn())
    const links = (drawn.match(/\]\(file:/g) || []).length
    totalLinks += links

    if (item.id.includes('unmatched')) {
      expect(links).toBe(0)
    } else {
      expect(links).toBeGreaterThan(0)
    }

    await ui.unmount()
  }

  expect(totalLinks).toBeGreaterThanOrEqual(25)
})

test('T-X2: Golden Test Suite runs all 30 Claude-style replies in badges mode', async ($, on) => {
  setup(on)
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  await $.command.run({ command: 'termbridge', args: 'mode badges' })

  let repliesWithBadges = 0

  for (let i = 0; i < GOLDEN_REPLIES.length; i++) {
    const item = GOLDEN_REPLIES[i]
    const ui = await $.ui.mount({
      plugin: 'omnilex',
      surface: 'terminal',
      component: 'AssistantMessage',
      requestId: `golden-badges-${item.id}`,
      viewport: { columns: 100, rows: 40 },
      props: { text: item.text, isFirstOfReply: true },
    })

    const buttons = await ui.findAll({ type: 'Button' })
    if (buttons.length > 0) repliesWithBadges++

    if (item.id.includes('unmatched')) {
      expect(buttons.length).toBe(0)
    }

    await ui.unmount()
  }

  expect(repliesWithBadges).toBeGreaterThanOrEqual(25)
})
