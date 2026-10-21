# show-me-the-coffee

간편하게 붙이는 커피 후원 위젯입니다.   
카카오페이에서 링크를 생성한 후 링크만으로 후원 위젯을 붙이실 수 있습니다.

버튼을 누르면 QR과 카카오페이 이동 버튼이 있는 후원 창이 열립니다.
모바일에서는 QR을 노출하지 않는 옵션도 제공합니다.

## 주요기능 
- QR 이미지 자동 생성
- 문구, 색상, 아이콘, 크기와 위치 커스텀
- **모바일 QR 숨김 옵션 제공**: `hideQrOnMobile: true`
- 이름 선택 표시: `name`을 생략하면 이름과 전달 안내를 표시하지 않음
- 별도 서버 없이 사용 가능, 사용 이벤트 수집은 선택 사항

## 적용 화면

[to-high](https://github.com/fullth/to-high)에 수정한 라이브러리를 연결한 **로컬 미리보기**입니다. 두 이미지 모두 1:1 비율이며, 모바일 QR 숨김 옵션을 켠 상태입니다. 버튼의 세이지 색상과 유리 질감은 to-high의 설정·스타일입니다.

| 데스크톱 · QR과 버튼 표시 | 모바일 · QR 숨김, 버튼 유지 |
| --- | --- |
| ![to-high 데스크톱 후원 창: QR과 카카오페이 버튼 표시](https://raw.githubusercontent.com/fullth/show-me-the-coffee/master/docs/screenshots/to-high-desktop.png) | ![to-high 모바일 후원 창: QR 없이 카카오페이 버튼만 표시](https://raw.githubusercontent.com/fullth/show-me-the-coffee/master/docs/screenshots/to-high-mobile.png) |

## 빠른 시작

**계좌 바로가기 링크만 발급 후, 에이전트에게 해당 README.md 링크를 전달드리는 것을 추천드립니다.**

## 카카오페이 링크 받기

1. 카카오톡의 더보기에서 **pay**, 또는 카카오페이 앱을 엽니다.
2. **송금 → 송금받기 / 내 송금코드**로 이동합니다.
3. **링크 공유**로 `https://qr.kakaopay.com/XXXXX` 형태의 URL을 복사합니다.
4. 복사한 URL을 `kakaoPayUrl`에 넣습니다.

메뉴 이름은 카카오페이 버전에 따라 다를 수 있습니다. 송금받기 QR의 링크를 사용하세요.

### script 태그

`kakaoPayUrl`만 필수입니다. 별도의 QR 이미지는 필요하지 않습니다.

```html
<script src="https://cdn.jsdelivr.net/npm/show-me-the-coffee@0.1.1/dist/show-me-the-coffee.js"></script>
<script>
  SMTC('boot', {
    kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
  });
</script>
```

위 예시는 현재 공개 버전입니다. 새 옵션을 사용하려면 해당 옵션이 포함된 버전으로 스크립트 URL을 변경하세요.

### npm

```bash
npm install show-me-the-coffee
```

DOM이 준비된 브라우저에서 호출하세요. React에서는 `useEffect` 등 클라이언트에서 실행되는 위치에 넣습니다.

```ts
import { SMTC } from 'show-me-the-coffee';

SMTC('boot', {
  kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
});
```

같은 문서에서 여러 번 호출해도 위젯은 하나만 생성되며, 최초 설정이 유지됩니다.

## 모바일 QR 표시 설정

새 버전에서는 **라이브러리 옵션**으로 모바일 QR을 숨길 수 있습니다. 서비스에서 QR을 숨기는 CSS를 별도로 작성할 필요가 없습니다.

```ts
SMTC('boot', {
  kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
  hideQrOnMobile: true,
});
```

| 설정 | 화면 너비 767px 이하 | 화면 너비 768px 이상 |
| --- | --- | --- |
| 생략 또는 `false` | QR + 카카오페이 버튼 | QR + 카카오페이 버튼 |
| `true` | 카카오페이 버튼만 표시 | QR + 카카오페이 버튼 |

화면 크기가 바뀌면 자동으로 전환됩니다. QR을 숨겨도 후원 링크는 유지됩니다.

`hideQrOnMobile: true`이고 `description`을 생략하면 기본 설명은 “아래 버튼으로 카카오페이를 열어주세요.”입니다. 이 문구는 모든 화면에서 사용하며, 직접 지정한 `description`은 그대로 유지됩니다.

## 수취인 이름 표시 설정

이름을 표시하려면 `name`을 전달하세요.

```ts
SMTC('boot', {
  kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
  name: '홍길동', // 후원 창 하단에 “홍길동 님에게 전달됩니다” 표시
});
```

`name`을 생략하면 이름과 전달 안내 전체를 표시하지 않습니다. 이 설정은 위젯의 표시만 제어하며, 카카오페이 송금 화면의 표시는 카카오페이를 따릅니다.

## 디자인 설정 예시

```ts
SMTC('boot', {
  kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
  label: '커피 후원',
  title: '커피 한 잔으로 응원해주세요',
  description: '아래 버튼으로 카카오페이를 열어주세요.',
  accentColor: '#e4f2e9',
  textColor: '#245b42',
  icon: '☕',
  iconSize: 20,
  position: 'br',
  offsetX: 24,
  offsetY: 24,
  radius: 9999,
  theme: 'light',
});
```

## 옵션

### 링크와 문구

| 옵션 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `kakaoPayUrl` | `string` | 필수 | QR과 카카오페이 버튼에 사용하는 후원 링크 |
| `hideQrOnMobile` | `boolean` | `false` | 새 버전 옵션. `true`이면 767px 이하에서 QR 숨김 |
| `name` | `string` | 생략 | 수취인 이름. 생략하면 이름과 전달 안내를 표시하지 않음 |
| `label` | `string` | `커피 한 잔 후원하기` | 플로팅 버튼 문구 |
| `title` | `string` | `label` 값 | 후원 창 제목 |
| `description` | `string` | QR 스캔·카카오페이 안내 | 후원 창 설명. 모바일 QR 숨김 옵션을 켜면 카카오페이 안내로 변경 |

기본 `description`은 “QR을 스캔하거나 아래 버튼으로 카카오페이를 열어주세요”입니다. 모바일 QR 숨김 옵션을 켰을 때의 기본값은 위의 [모바일 QR 표시 설정](#모바일-qr-표시-설정)을 참고하세요.

### 모양과 위치

| 옵션 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `icon` | `string` | `☕` | 버튼과 제목의 아이콘 |
| `iconSize` | `number` | `18` | 버튼 아이콘 크기(px) |
| `accentColor` | `string` | `#ffd43b` | 버튼 배경색 |
| `textColor` | `string` | `#191919` | 버튼 글자색 |
| `radius` | `number` | `9999` | 플로팅 버튼 모서리 반경(px) |
| `position` | `'br' \| 'bl' \| 'tr' \| 'tl'` | `'br'` | 우하단·좌하단·우상단·좌상단 |
| `offsetX` | `number` | `24` | 기준 모서리에서 가로 간격(px) |
| `offsetY` | `number` | `24` | 기준 모서리에서 세로 간격(px) |
| `theme` | `'light' \| 'dark'` | `'light'` | 후원 창 테마 |

### 이벤트 수집

| 옵션 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `analytics` | `boolean` | `false` | 위젯 사용 이벤트 수집 활성화 |
| `siteKey` | `string` | 생략 | 이벤트에 포함할 서비스 식별자 |
| `endpoint` | `string` | 생략 | 이벤트를 전송할 URL. 생략하면 `window.dataLayer`에 추가 |

수집 이벤트는 `loaded`, `open`, `click_pay`이며, 서비스 식별자·도메인·경로·시각을 포함합니다. 송금 완료 여부나 금액은 확인하지 않습니다. `analytics: false`이면 수집하지 않습니다.

## 적용 후 확인

- 지정한 위치에 버튼이 보이고 후원 창을 열고 닫을 수 있는지
- QR 스캔과 카카오페이 버튼이 원하는 송금 화면으로 연결되는지
- 모바일 QR 숨김 옵션을 켰을 때 767px 이하에서 숨겨지고 768px 이상에서 다시 표시되는지
- `name`을 생략했을 때 수취인 이름과 전달 안내가 사라지는지

## 로컬 개발

```bash
npm ci
npm run typecheck
npm run build
npm run dev -- --host 127.0.0.1
```

개발 서버에서 `/example/`을 열면 빌드한 위젯을 확인할 수 있습니다. 소스를 변경하면 다시 빌드하세요.

## License

MIT
