# WWW_BE 프로젝트 전체 흐름도

## 시스템 아키텍처 흐름도

```mermaid
graph TB
    subgraph "Client (Frontend)"
        A[사용자 브라우저]
    end

    subgraph "WWW_BE Backend"
        B[NestJS Application]
        C[Redis Session Store]
        D[MySQL Database]
        E[External Job API]
    end

    subgraph "Authentication Flow"
        F[Session Auth Guard]
        G[Local Strategy]
    end

    subgraph "Modules"
        H[Auth Module]
        I[User Module]
        J[Post Module]
        K[Comment Module]
        L[Job Module]
        M[Bookmark Module]
    end

    A --> B
    B --> C
    B --> D
    B --> E
    B --> F
    F --> G
    B --> H
    B --> I
    B --> J
    B --> K
    B --> L
    B --> M
```

## API 엔드포인트 흐름도

```mermaid
flowchart TD
    A[Client Request] --> B{Authentication Required?}

    B -->|Yes| C[Session Auth Guard]
    B -->|No| D[Public Endpoint]

    C --> E{Session Valid?}
    E -->|Yes| F[Process Request]
    E -->|No| G[Return 401 Unauthorized]

    D --> F
    F --> H{Endpoint Type}

    H -->|Auth| I[Auth Controller]
    H -->|User| J[User Controller]
    H -->|Post| K[Post Controller]
    H -->|Comment| L[Comment Controller]
    H -->|Job| M[Job Controller]
    H -->|Bookmark| N[Bookmark Controller]

    I --> O[Auth Service]
    J --> P[User Service]
    K --> Q[Post Service]
    L --> R[Comment Service]
    M --> S[Job Service]
    N --> T[Bookmark Service]

    O --> U[Database Operations]
    P --> U
    Q --> U
    R --> U
    S --> V[External API + Database]
    T --> U

    U --> W[Response to Client]
    V --> W
```

## 사용자 인증 흐름도

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth Controller
    participant S as Auth Service
    participant D as Database
    participant R as Redis Session

    Note over C,R: 회원가입 흐름
    C->>A: POST /auth/signup
    A->>S: signup(request)
    S->>D: 사용자 정보 저장
    S->>A: 성공 응답
    A->>R: 세션 생성 (user.id = email)
    A->>C: 201 Created

    Note over C,R: 로그인 흐름
    C->>A: POST /auth/login
    A->>S: login(request)
    S->>D: 사용자 정보 조회
    S->>A: 사용자 정보 반환
    A->>R: 세션 생성 (user.id = email)
    A->>C: 200 OK

    Note over C,R: 로그아웃 흐름
    C->>A: POST /auth/logout
    A->>R: 세션 삭제
    A->>C: 204 No Content
```

## 게시글 관리 흐름도

```mermaid
flowchart TD
    A[Client] --> B[Post Controller]
    B --> C{Action Type}

    C -->|Create| D[POST /post/save]
    C -->|Read All| E[GET /post/query/all]
    C -->|Read by Type| F[GET /post/query/:type]
    C -->|Read Detail| G[GET /post/query/detail/:id]

    D --> H[Session Auth Guard]
    E --> H
    F --> H
    G --> H

    H --> I[Post Service]
    I --> J[Database Operations]
    J --> K[Response to Client]

    subgraph "Post Types"
        L[EXPERIENCE - 경험]
        M[FILE - 자료]
    end
```

## 댓글 관리 흐름도

```mermaid
flowchart TD
    A[Client] --> B[Comment Controller]
    B --> C{Action Type}

    C -->|Create| D[POST /comment/save]
    C -->|Delete| E[DELETE /comment/delete/:id]

    D --> F[Session Auth Guard]
    E --> F

    F --> G[Comment Service]
    G --> H[Database Operations]
    H --> I[Response to Client]

    subgraph "Comment Validation"
        J[Content Length ≤ 500]
        K[User Authorization]
        L[Post Existence]
    end
```

## 직무 정보 관리 흐름도

```mermaid
flowchart TD
    A[Client] --> B[Job Controller]
    B --> C{Action Type}

    C -->|Save External Data| D[POST /job/save]
    C -->|Get All Jobs| E[GET /job/query/all]
    C -->|Get by Country| F[GET /job/query/:countryCode]
    C -->|Get Detail| G[GET /job/query/detail/:id]

    D --> H[Job Service]
    E --> H
    F --> H
    G --> H

    H --> I[External Job API]
    H --> J[Database Operations]

    I --> K[Process Job Data]
    J --> K
    K --> L[Response to Client]

    subgraph "Job Data Processing"
        M[Company Information]
        N[Location Data]
        O[Salary Information]
        P[Employment Details]
    end
```

## 북마크 관리 흐름도

```mermaid
flowchart TD
    A[Client] --> B[Bookmark Controller]
    B --> C{Action Type}

    C -->|Create| D[POST /bookmark/save/:jobId]
    C -->|Delete| E[DELETE /bookmark/delete/:bookmarkId]
    C -->|Get My Bookmarks| F[GET /bookmark/my]

    D --> G[Session Auth Guard]
    E --> G
    F --> G

    G --> H[Bookmark Service]
    H --> I[Database Operations]
    I --> J[Response to Client]

    subgraph "Bookmark Validation"
        K[Job Existence Check]
        L[User Authorization]
        M[Duplicate Prevention]
    end
```

## 데이터베이스 연관 관계 흐름도

```mermaid
flowchart TD
    A[User Table] --> B[Post Table]
    A --> C[Comment Table]
    A --> D[Bookmark Table]

    B --> C
    E[Job Table] --> D

    subgraph "Cascade Operations"
        F[User 삭제 → Post 삭제]
        G[User 삭제 → Comment 삭제]
        H[User 삭제 → Bookmark 삭제]
        I[Post 삭제 → Comment 삭제]
    end

    subgraph "Foreign Key Relationships"
        J[User.email → Post.user_mail]
        K[User.email → Comment.user_mail]
        L[User.email → Bookmark.user_mail]
        M[Post.id → Comment.post_id]
        N[Job.id → Bookmark.job_id]
    end
```

## 에러 처리 흐름도

```mermaid
flowchart TD
    A[Request] --> B{Validation Error?}
    B -->|Yes| C[ValidationPipe Error]
    B -->|No| D{Authentication Error?}

    D -->|Yes| E[401 Unauthorized]
    D -->|No| F{Authorization Error?}

    F -->|Yes| G[403 Forbidden]
    F -->|No| H{Database Error?}

    H -->|Yes| I[500 Internal Server Error]
    H -->|No| J[Success Response]

    C --> K[400 Bad Request]
    E --> L[Redirect to Login]
    G --> M[Access Denied]
    I --> N[Error Logging]

    K --> O[Client Error Handling]
    L --> O
    M --> O
    N --> O
    J --> P[Success Response to Client]
```

## 주요 특징

1. **세션 기반 인증**: Redis를 사용한 세션 관리
2. **가드 기반 보안**: SessionAuthGuard로 보호된 엔드포인트
3. **모듈화된 구조**: 각 기능별로 독립적인 모듈 구성
4. **외부 API 통합**: 직무 정보를 외부 API에서 가져와서 저장
5. **CASCADE 삭제**: 데이터 무결성을 위한 자동 삭제 처리
6. **검증 파이프**: 요청 데이터의 자동 검증
7. **CORS 설정**: 프론트엔드와의 통신을 위한 CORS 설정
