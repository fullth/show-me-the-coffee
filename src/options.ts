import type { CoffeeOptions } from './types.js';

export type ResolvedOptions = Required<
  Pick<
    CoffeeOptions,
    | 'kakaoPayUrl'
    | 'label'
    | 'title'
    | 'description'
    | 'icon'
    | 'iconSize'
    | 'accentColor'
    | 'textColor'
    | 'radius'
    | 'position'
    | 'offsetX'
    | 'offsetY'
    | 'theme'
    | 'analytics'
  >
> &
  Pick<CoffeeOptions, 'name' | 'siteKey' | 'endpoint'>;

const DEFAULTS = {
  label: '커피 한 잔 후원하기',
  description: 'QR을 스캔하거나 아래 버튼으로 카카오페이를 열어주세요',
  icon: '☕',
  iconSize: 18,
  accentColor: '#ffd43b',
  textColor: '#191919',
  radius: 9999,
  position: 'br',
  offsetX: 24,
  offsetY: 24,
  theme: 'light',
  analytics: false,
} as const;

/** 사용자 옵션에 기본값을 채워 완결된 옵션으로 만든다. */
export function resolveOptions(input: CoffeeOptions): ResolvedOptions {
  if (!input || !input.kakaoPayUrl) {
    throw new Error('[show-me-the-coffee] kakaoPayUrl 옵션은 필수입니다.');
  }
  const merged = { ...DEFAULTS, ...input, kakaoPayUrl: input.kakaoPayUrl };
  return {
    ...merged,
    // 모달 제목 미지정 시 버튼 문구로 폴백
    title: input.title ?? merged.label,
  };
}
