# npm 배포

GitHub Actions의 `Publish to npm` workflow가 GitHub Release 발행 또는 수동 실행 시 패키지를 빌드하고 npm에 배포합니다. npm Trusted Publishing(OIDC)을 사용하며, 저장소에 npm 토큰을 저장하지 않습니다.

## 최초 연결

npm 패키지 소유 계정으로 [패키지 설정](https://www.npmjs.com/package/show-me-the-coffee/access)에 접속해 Trusted Publisher를 다음과 같이 등록합니다.

| 항목 | 값 |
| --- | --- |
| Publisher | GitHub Actions |
| Organization or user | `fullth` |
| Repository | `show-me-the-coffee` |
| Workflow filename | `publish.yml` |
| Environment | 비워 둠 |

workflow 파일만 추가해서는 npm 권한이 생기지 않습니다. npm의 위 설정이 완료되어야 배포할 수 있습니다. workflow는 GitHub가 호스팅하는 Ubuntu runner와 Node.js 24, npm 11을 사용합니다.

## 배포 순서

1. `package.json`과 `package-lock.json`의 버전을 올리고 커밋합니다.
2. `v버전` 형식의 태그를 올리고 같은 태그로 GitHub Release를 발행합니다.
3. [Publish to npm](https://github.com/fullth/show-me-the-coffee/actions/workflows/publish.yml)의 실행 결과를 확인합니다.
4. [npm 패키지](https://www.npmjs.com/package/show-me-the-coffee)와 버전이 지정된 jsDelivr URL을 확인합니다.

Git 태그를 푸시하는 것만으로는 실행되지 않습니다. GitHub Release를 발행하거나 Actions 페이지에서 **Run workflow**를 선택하세요. 이미 배포된 npm 버전은 다시 배포할 수 없습니다.

## 이번 0.1.2 배포

`v0.1.2` 태그는 workflow 추가 전에 생성되었습니다. npm Trusted Publisher 연결 후에는 현재 master의 workflow를 **Run workflow**로 실행해 `0.1.2`를 배포하세요. 기존 태그를 변경할 필요는 없습니다.

배포 후 확인할 주소:

- https://www.npmjs.com/package/show-me-the-coffee/v/0.1.2
- https://cdn.jsdelivr.net/npm/show-me-the-coffee@0.1.2/dist/show-me-the-coffee.js

GitHub에는 workflow와 위 npm 링크가 연결됩니다. GitHub의 **Packages** 목록은 GitHub Packages 레지스트리용이므로 npmjs.org 배포만으로 해당 목록에 패키지가 생기지는 않습니다.
