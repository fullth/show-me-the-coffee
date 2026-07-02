import QRCode from 'qrcode';
import type { ResolvedOptions } from './options.js';
import { track } from './track.js';

const STYLE = `
  :host { all: initial; }
  * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont,
      "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; }

  .fab {
    position: fixed;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 20px; border: none;
    border-radius: var(--smtc-radius);
    background: var(--smtc-accent); color: var(--smtc-text);
    font-size: 15px; font-weight: 700; cursor: pointer;
    box-shadow: 0 6px 20px rgba(0,0,0,.18);
    transition: transform .15s, box-shadow .15s;
    z-index: 2147483000;
  }
  .fab:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0,0,0,.24); }
  .fab .icon { font-size: var(--smtc-icon-size); line-height: 1; }
  .fab.br { right: var(--smtc-offset-x); bottom: var(--smtc-offset-y); }
  .fab.bl { left: var(--smtc-offset-x); bottom: var(--smtc-offset-y); }
  .fab.tr { right: var(--smtc-offset-x); top: var(--smtc-offset-y); }
  .fab.tl { left: var(--smtc-offset-x); top: var(--smtc-offset-y); }

  .overlay {
    position: fixed; inset: 0; background: rgba(17,17,17,.5);
    display: none; align-items: center; justify-content: center;
    padding: 20px; z-index: 2147483001;
  }
  .overlay.open { display: flex; animation: fade .18s ease; }
  @keyframes fade { from { opacity: 0 } to { opacity: 1 } }

  .modal {
    width: 100%; max-width: 340px;
    background: var(--smtc-modal-bg); color: var(--smtc-modal-text);
    border-radius: 20px; padding: 28px 24px 24px; text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,.3); position: relative;
    animation: pop .2s cubic-bezier(.2,.8,.3,1.2);
  }
  @keyframes pop { from { transform: scale(.94); opacity: .6 } to { transform: scale(1); opacity: 1 } }

  .close {
    position: absolute; top: 12px; right: 12px; width: 32px; height: 32px;
    border: none; background: transparent; font-size: 22px; line-height: 1;
    color: #9ca3af; cursor: pointer; border-radius: 8px;
  }
  .close:hover { background: rgba(0,0,0,.06); }

  h2 { margin: 4px 0 4px; font-size: 18px; }
  h2 .icon { font-size: calc(var(--smtc-icon-size) + 4px); }
  .sub { margin: 0 0 20px; font-size: 13px; color: var(--smtc-sub); }

  .qr {
    width: 200px; height: 200px; margin: 0 auto 18px; padding: 12px;
    background: var(--smtc-qr-bg); border: 1px solid var(--smtc-qr-border);
    border-radius: 14px;
  }
  .qr img { width: 100%; height: 100%; display: block; }

  .pay {
    display: block; width: 100%; padding: 13px; border: none; border-radius: 12px;
    background: var(--smtc-accent); color: var(--smtc-text);
    font-size: 15px; font-weight: 700; cursor: pointer; text-decoration: none;
  }
  .pay:hover { filter: brightness(.97); }
  .account { margin-top: 14px; font-size: 12px; color: var(--smtc-sub); line-height: 1.6; }
  .name { font-weight: 700; }
`;

const THEMES = {
  light: {
    '--smtc-modal-bg': '#fff',
    '--smtc-modal-text': '#191919',
    '--smtc-sub': '#6b7280',
    '--smtc-qr-bg': '#fff',
    '--smtc-qr-border': '#eceef1',
  },
  dark: {
    '--smtc-modal-bg': '#1f2937',
    '--smtc-modal-text': '#f9fafb',
    '--smtc-sub': '#9ca3af',
    '--smtc-qr-bg': '#fff',
    '--smtc-qr-border': '#374151',
  },
} as const;

function cssVars(opts: ResolvedOptions): string {
  const theme = THEMES[opts.theme];
  const vars: Record<string, string> = {
    '--smtc-accent': opts.accentColor,
    '--smtc-text': opts.textColor,
    '--smtc-icon-size': `${opts.iconSize}px`,
    '--smtc-radius': `${opts.radius}px`,
    '--smtc-offset-x': `${opts.offsetX}px`,
    '--smtc-offset-y': `${opts.offsetY}px`,
    ...theme,
  };
  return Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
}

/** 위젯을 Shadow DOM 안에 마운트한다. 여러 번 호출돼도 하나만 유지. */
export function mount(opts: ResolvedOptions): void {
  if (document.getElementById('smtc-root')) return;

  const host = document.createElement('div');
  host.id = 'smtc-root';
  host.style.cssText = cssVars(opts);
  document.body.appendChild(host);

  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `
    <style>${STYLE}</style>
    <button class="fab ${opts.position}" part="fab">
      <span class="icon">${opts.icon}</span><span>${opts.label}</span>
    </button>
    <div class="overlay">
      <div class="modal" role="dialog" aria-modal="true" aria-label="후원하기">
        <button class="close" aria-label="닫기">&times;</button>
        <h2><span class="icon">${opts.icon}</span> ${opts.title}</h2>
        <p class="sub">${opts.description}</p>
        <div class="qr"></div>
        <a class="pay" href="${opts.kakaoPayUrl}" target="_blank" rel="noopener">카카오페이로 열기</a>
        ${opts.name ? `<div class="account"><span class="name">${opts.name}</span> 님에게 전달됩니다</div>` : ''}
      </div>
    </div>
  `;

  const fab = root.querySelector('.fab') as HTMLButtonElement;
  const overlay = root.querySelector('.overlay') as HTMLDivElement;
  const close = root.querySelector('.close') as HTMLButtonElement;
  const pay = root.querySelector('.pay') as HTMLAnchorElement;
  const qrBox = root.querySelector('.qr') as HTMLDivElement;

  QRCode.toDataURL(opts.kakaoPayUrl, { width: 400, margin: 0 })
    .then((url) => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = '후원 QR';
      qrBox.appendChild(img);
    })
    .catch(() => {
      qrBox.textContent = 'QR 생성 실패';
    });

  const open = () => {
    overlay.classList.add('open');
    track('open', opts);
  };
  const hide = () => overlay.classList.remove('open');

  fab.addEventListener('click', open);
  close.addEventListener('click', hide);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });
  pay.addEventListener('click', () => track('click_pay', opts));

  track('loaded', opts);
}
