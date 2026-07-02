export type WidgetPosition = 'br' | 'bl' | 'tr' | 'tl';
export type WidgetTheme = 'light' | 'dark';

export interface CoffeeOptions {
  /** 후원 링크 (카카오페이 송금 QR URL 등). 필수. */
  kakaoPayUrl: string;
  /** 수취인 이름. 모달 하단에 "OOO 님에게 전달됩니다"로 노출. */
  name?: string;
  /** 서비스 식별자. 어느 서비스가 위젯을 쓰는지 추적할 때 사용. */
  siteKey?: string;

  // ===== 커스텀 =====
  /** 버튼 문구. 기본 "커피 한 잔 후원하기". */
  label?: string;
  /** 모달 제목. 미지정 시 label을 사용. */
  title?: string;
  /** 모달 설명 문구. 기본 "QR을 스캔하거나 아래 버튼으로 카카오페이를 열어주세요". */
  description?: string;
  /** 아이콘 (이모지). 기본 "☕". */
  icon?: string;
  /** 아이콘 크기(px). 기본 18. */
  iconSize?: number;
  /** 강조색 (버튼 배경). 기본 "#ffd43b". */
  accentColor?: string;
  /** 버튼 위 글자색. 기본 "#191919". */
  textColor?: string;
  /** 버튼 둥글기(px). 기본 9999(pill). */
  radius?: number;
  /** 위치. 기본 "br"(우하단). */
  position?: WidgetPosition;
  /** 가까운 가장자리(좌/우)로부터 가로 간격(px). 기본 24. */
  offsetX?: number;
  /** 가까운 가장자리(위/아래)로부터 세로 간격(px). 기본 24. */
  offsetY?: number;
  /** 테마. 기본 "light". */
  theme?: WidgetTheme;

  // ===== 추적 =====
  /** 사용처 추적 활성화 여부. 기본 false. */
  analytics?: boolean;
  /** 이벤트 수집 엔드포인트. analytics=true이고 이 값이 있으면 여기로 전송. */
  endpoint?: string;
}

export type TrackEvent = 'loaded' | 'open' | 'click_pay';
