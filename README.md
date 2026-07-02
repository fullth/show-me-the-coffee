# show-me-the-coffee

스크립트 한 줄로 붙이는 "커피 한 잔 후원하기" 위젯. 채널톡처럼 플로팅 버튼을 띄우고, 누르면 카카오페이 QR 모달이 열립니다. 색·아이콘·문구·크기 전부 커스텀할 수 있습니다.

## 특징

- 스크립트 한 줄 + `SMTC('boot', {...})` 호출이면 끝
- 링크(QR URL)만 넘기면 QR을 자동으로 그려줍니다 — 이미지 파일 관리 불필요
- 버튼 문구·모달 제목·설명·색상·아이콘·크기·위치 커스텀
- 페이지의 다른 스타일과 섞이지 않게 격리되어 렌더링

## 빠른 시작

`kakaoPayUrl` 하나만 있으면 동작합니다.

```html
<script src="https://cdn.jsdelivr.net/npm/show-me-the-coffee/dist/show-me-the-coffee.js"></script>
<script>
  SMTC('boot', {
    kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
    name: '홍길동',
  });
</script>
```

### npm

```bash
npm install show-me-the-coffee
```

```ts
import { SMTC } from 'show-me-the-coffee';

SMTC('boot', {
  kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
  name: '홍길동',
});
```

## 커스텀 예시

버튼 문구·모달 제목·설명을 각각 지정하고 색·아이콘·위치까지 바꾼 예시입니다.

```html
<script src="https://cdn.jsdelivr.net/npm/show-me-the-coffee/dist/show-me-the-coffee.js"></script>
<script>
  SMTC('boot', {
    kakaoPayUrl: 'https://qr.kakaopay.com/xxxx',
    name: '홍길동',

    // 텍스트 — 버튼 문구와 모달 제목/설명을 따로 지정
    label: '후원하기',
    title: '개발자에게 커피 한 잔 ☕',
    description: '이 도구가 도움이 됐다면 커피값으로 응원해주세요!',

    // 색상 · 아이콘
    accentColor: '#6c5ce7',
    textColor: '#ffffff',
    icon: '☕',
    iconSize: 20,

    // 위치 · 스타일
    position: 'br',   // 기준 모서리 (br|bl|tr|tl)
    offsetX: 24,      // 좌/우 가장자리로부터 간격(px)
    offsetY: 24,      // 위/아래 가장자리로부터 간격(px)
    radius: 9999,     // 버튼 둥글기(px)
    theme: 'light',   // light | dark
  });
</script>
```

> `title`을 생략하면 모달 제목은 `label`을 그대로 쓰고, `description`을 생략하면 기본 안내 문구가 쓰입니다.

## 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `kakaoPayUrl` | string | (필수) | 후원 링크. 이 URL로 QR을 그립니다 |
| `name` | string | — | 수취인 이름 |
| `label` | string | `커피 한 잔 후원하기` | 버튼 문구 |
| `title` | string | (`label`) | 모달 제목. 미지정 시 버튼 문구 사용 |
| `description` | string | `QR을 스캔하거나 아래 버튼으로 카카오페이를 열어주세요` | 모달 설명 문구 |
| `icon` | string | `☕` | 버튼/모달 아이콘 (이모지) |
| `iconSize` | number | `18` | 아이콘 크기(px) |
| `accentColor` | string | `#ffd43b` | 강조색 (버튼 배경) |
| `textColor` | string | `#191919` | 버튼 위 글자색 |
| `radius` | number | `9999` | 버튼 둥글기(px). 9999=pill |
| `position` | `br`\|`bl`\|`tr`\|`tl` | `br` | 기준 모서리 |
| `offsetX` | number | `24` | 좌/우 가장자리로부터 가로 간격(px) |
| `offsetY` | number | `24` | 위/아래 가장자리로부터 세로 간격(px) |
| `theme` | `light`\|`dark` | `light` | 테마 |

## 카카오페이 링크 받는 법

`kakaoPayUrl`에 넣을 송금 링크는 카카오페이에서 발급합니다. **QR 이미지 파일은 필요 없고 링크(URL)만 있으면** 위젯이 QR을 자동으로 그려줍니다.

1. 카카오톡 → 하단 `...` 더보기 → **pay** (또는 카카오페이 앱 실행)
2. **송금** 메뉴 진입
3. **송금받기 / 내 송금코드**(QR) 선택
4. **링크 공유** → `https://qr.kakaopay.com/XXXXX` 형태의 URL 복사
5. 그 URL을 `kakaoPayUrl` 옵션에 넣으면 끝

> 메뉴 이름은 카카오페이 버전에 따라 조금씩 다를 수 있습니다(받기코드 / 내 코드 등). "송금 → 받기 코드 → 링크 공유" 흐름이면 됩니다.

## 확인 방법

붙인 뒤 페이지를 열어 아래를 확인하세요.

1. 지정한 모서리(`position`)에 후원 버튼이 뜨는지
2. 버튼을 누르면 QR 모달이 열리는지
3. QR을 휴대폰으로 스캔했을 때 **본인 카카오페이 송금 화면**으로 이동하는지
4. "카카오페이로 열기" 버튼이 같은 링크로 열리는지

## License

MIT
