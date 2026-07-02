import type { ResolvedOptions } from './options.js';
import type { TrackEvent } from './types.js';

/**
 * 사용처 추적 이벤트를 전송한다. (금액이 아니라 "어느 서비스가 쓰는지")
 * analytics=false면 아무것도 하지 않는다.
 * endpoint가 있으면 자체 수집 서버로, 없으면 GTM dataLayer로 push.
 */
export function track(event: TrackEvent, opts: ResolvedOptions): void {
  if (!opts.analytics) return;

  const payload = {
    event,
    siteKey: opts.siteKey ?? null,
    domain: location.hostname,
    path: location.pathname,
    ts: Date.now(),
  };

  if (opts.endpoint) {
    sendBeacon(opts.endpoint, payload);
    return;
  }

  pushDataLayer(payload);
}

function sendBeacon(endpoint: string, payload: Record<string, unknown>): void {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      fetch(endpoint, { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* 추적 실패는 위젯 동작에 영향을 주지 않는다 */
  }
}

function pushDataLayer(payload: Record<string, unknown>): void {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'show_me_the_coffee', ...payload });
}
