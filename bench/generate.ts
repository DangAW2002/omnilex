// bench/generate.ts: Deterministic mock dataset generator with fixed seed
// Matches real Termbridge characteristics: ~3.8 patterns/concept, Vietnamese diacritics (NFC),
// exact-case acronyms, homonyms with qualifiers.

export interface ConceptItem {
  id: string;
  label: string;
  qualifier?: string;
  summary: string;
  domains: string[];
  status: string;
  aliases: string[];
  loanwords: string[];
  plain_descriptions: string[];
}

export interface TermItem {
  key: string;
  match: 'any-case' | 'exact-case';
  autolink: boolean;
  concepts: {
    id: string;
    label: string;
    qualifier?: string;
    summary: string;
    domains: string[];
  }[];
}

export interface MockDataset {
  size: number;
  seed: number;
  conceptsVi: ConceptItem[];
  conceptsEn: ConceptItem[];
  termsVi: TermItem[];
  termsEn: TermItem[];
  patternCountVi: number;
  patternCountEn: number;
  patternsPerConceptVi: number;
  patternsPerConceptEn: number;
}

export function createPrng(seed: number) {
  let s = (seed >>> 0) || 12345;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VI_PREFIXES = [
  'Lãi', 'Tiền', 'Tỷ lệ', 'Mô hình', 'Hệ thống', 'Chỉ số', 'Biên', 'Đường dẫn',
  'Bộ nhận diện', 'Cơ chế', 'Cấu trúc', 'Dòng tiền', 'Khoản vay', 'Quỹ', 'Khối',
  'Mạng lưới', 'Thuật toán', 'Dịch vụ', 'Nền tảng', 'Giao thức', 'Thiết bị',
  'Cổng', 'Khóa', 'Phiên', 'Bộ nhớ', 'Bản ghi', 'Báo cáo', 'Bảng', 'Quy trình'
];

const VI_SUFFIXES = [
  'kép', 'gốc', 'suất', 'đơn', 'lợi nhuận', 'rủi ro', 'phân tán', 'tự động',
  'trung tâm', 'thời gian thực', 'an toàn', 'mở rộng', 'chuẩn hóa', 'cơ sở',
  'xác định', 'tiếp nối', 'ngữ nghĩa', 'song song', 'bất biến', 'tối ưu'
];

const EN_PREFIXES = [
  'Compound', 'Interest', 'Principal', 'Margin', 'Token', 'Model', 'System',
  'Pipeline', 'Index', 'Rate', 'Asset', 'Portfolio', 'Network', 'Algorithm',
  'Service', 'Platform', 'Protocol', 'Device', 'Gateway', 'Session', 'Buffer'
];

const EN_SUFFIXES = [
  'Interest', 'Rate', 'Capital', 'Return', 'Margin', 'Growth', 'Risk',
  'Optimization', 'Processing', 'Delivery', 'Verification', 'Resolution',
  'Allocation', 'Inference', 'Evaluation', 'Deployment', 'Monitoring'
];

const ACRONYMS = [
  'API', 'ROI', 'PR', 'SLA', 'SLO', 'KPI', 'OKR', 'JWT', 'SDK', 'MCP',
  'RAG', 'LLM', 'IoT', 'GPU', 'CPU', 'CORS', 'ORM', 'ETL', 'BLE', 'PLC'
];

const DOMAINS = [
  'it/software-engineering',
  'it/ai-ml',
  'it/devops',
  'it/web/frontend',
  'it/web/backend',
  'it/security',
  'finance/personal-finance/saving',
  'finance/investing/valuation',
  'finance/banking/lending',
  'product/management',
  'iot/devices-sensors'
];

export function generateMockDataset(size: number, seed = 42): MockDataset {
  const rand = createPrng(seed);
  const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

  const conceptsVi: ConceptItem[] = [];
  const conceptsEn: ConceptItem[] = [];
  const termsViMap = new Map<string, TermItem>();
  const termsEnMap = new Map<string, TermItem>();

  let totalPatternsVi = 0;
  let totalPatternsEn = 0;

  for (let i = 0; i < size; i++) {
    const isAcronym = rand() < 0.10;
    const isHomonym = !isAcronym && rand() < 0.05;

    let id: string;
    let labelVi: string;
    let labelEn: string;
    let qualifier: string | undefined = undefined;

    if (isAcronym) {
      const acronym = ACRONYMS[i % ACRONYMS.length] + (i >= ACRONYMS.length ? `-${Math.floor(i / ACRONYMS.length)}` : '');
      id = acronym.toLowerCase();
      labelVi = acronym;
      labelEn = acronym;
    } else {
      const vPre = pick(VI_PREFIXES);
      const vSuf = pick(VI_SUFFIXES);
      const ePre = pick(EN_PREFIXES);
      const eSuf = pick(EN_SUFFIXES);

      id = `concept-${i}-${ePre.toLowerCase()}-${eSuf.toLowerCase()}`;
      labelVi = `${vPre} ${vSuf} ${i}`;
      labelEn = `${ePre} ${eSuf} ${i}`;

      if (isHomonym) {
        qualifier = i % 2 === 0 ? '(AI)' : '(Tài chính)';
      }
    }

    const domain = pick(DOMAINS);
    const summaryVi = `Khái niệm ${labelVi} trong lĩnh vực ${domain}, hỗ trợ tối ưu và vận hành hệ thống.`.normalize('NFC');
    const summaryEn = `Concept ${labelEn} within domain ${domain}, facilitating system performance and execution.`;

    const aliasesVi = rand() > 0.5 ? [`${labelVi} phụ`] : [];
    const aliasesEn = rand() > 0.2 ? [`${labelEn} alias`] : [];

    const loanwordsVi = isAcronym ? [labelVi] : (rand() > 0.7 ? [labelEn] : []);
    const loanwordsEn: string[] = [];

    const plainVi = [
      `cách gọi đời thường cho ${labelVi}`.normalize('NFC'),
      `giải thích dễ hiểu về ${labelVi}`.normalize('NFC')
    ];
    const plainEn = [
      `everyday explanation for ${labelEn}`,
      `plain description of ${labelEn}`
    ];

    // Count patterns: label (1) + aliases + loanwords + plain (2)
    totalPatternsVi += 1 + aliasesVi.length + loanwordsVi.length + plainVi.length;
    totalPatternsEn += 1 + aliasesEn.length + loanwordsEn.length + plainEn.length;

    const itemVi: ConceptItem = {
      id,
      label: labelVi.normalize('NFC'),
      qualifier,
      summary: summaryVi,
      domains: [domain],
      status: 'reviewed',
      aliases: aliasesVi.map((a) => a.normalize('NFC')),
      loanwords: loanwordsVi,
      plain_descriptions: plainVi
    };

    const itemEn: ConceptItem = {
      id,
      label: labelEn,
      qualifier,
      summary: summaryEn,
      domains: [domain],
      status: 'reviewed',
      aliases: aliasesEn,
      loanwords: loanwordsEn,
      plain_descriptions: plainEn
    };

    conceptsVi.push(itemVi);
    conceptsEn.push(itemEn);

    // Build terms
    const termKeysVi = [labelVi, ...aliasesVi, ...loanwordsVi];
    for (const key of termKeysVi) {
      const match = isAcronym ? 'exact-case' : 'any-case';
      const existing = termsViMap.get(key);
      const miniConcept = { id, label: labelVi, qualifier, summary: summaryVi, domains: [domain] };
      if (!existing) {
        termsViMap.set(key, { key, match, autolink: true, concepts: [miniConcept] });
      } else {
        existing.concepts.push(miniConcept);
      }
    }

    const termKeysEn = [labelEn, ...aliasesEn, ...loanwordsEn];
    for (const key of termKeysEn) {
      const match = isAcronym ? 'exact-case' : 'any-case';
      const existing = termsEnMap.get(key);
      const miniConcept = { id, label: labelEn, qualifier, summary: summaryEn, domains: [domain] };
      if (!existing) {
        termsEnMap.set(key, { key, match, autolink: true, concepts: [miniConcept] });
      } else {
        existing.concepts.push(miniConcept);
      }
    }
  }

  return {
    size,
    seed,
    conceptsVi,
    conceptsEn,
    termsVi: Array.from(termsViMap.values()),
    termsEn: Array.from(termsEnMap.values()),
    patternCountVi: totalPatternsVi,
    patternCountEn: totalPatternsEn,
    patternsPerConceptVi: totalPatternsVi / size,
    patternsPerConceptEn: totalPatternsEn / size,
  };
}

if (process.argv[1]?.endsWith('generate.ts') || process.argv[1]?.endsWith('generate.js')) {
  const size = parseInt(process.argv[2] || '1000', 10);
  const seed = parseInt(process.argv[3] || '42', 10);
  const data = generateMockDataset(size, seed);
  console.log(`Generated mock dataset of ${data.size} concepts (seed: ${data.seed})`);
  console.log(`VI: ${data.termsVi.length} terms, ${data.patternCountVi} patterns (~${data.patternsPerConceptVi.toFixed(2)}/concept)`);
  console.log(`EN: ${data.termsEn.length} terms, ${data.patternCountEn} patterns (~${data.patternsPerConceptEn.toFixed(2)}/concept)`);
}
