import { resolveOptions } from './options.js';
import { mount } from './widget.js';
import type { CoffeeOptions } from './types.js';

export type { CoffeeOptions, WidgetPosition, WidgetTheme, TrackEvent } from './types.js';

type BootCommand = 'boot';

/**
 * 전역 API. 채널톡과 같은 명령형 인터페이스.
 *
 *   SMTC('boot', { kakaoPayUrl: 'https://qr.kakaopay.com/xxx', name: '임태환' });
 */
export function SMTC(command: BootCommand, options: CoffeeOptions): void {
  if (command !== 'boot') {
    throw new Error(`[show-me-the-coffee] 알 수 없는 명령: ${command}`);
  }
  const resolved = resolveOptions(options);
  const run = () => mount(resolved);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}

// 브라우저 전역 노출 (script 태그 방식)
if (typeof window !== 'undefined') {
  (window as unknown as { SMTC: typeof SMTC }).SMTC = SMTC;
}

export default SMTC;
