# Hệ sinh thái GitHub Copilot: Giải thích toàn diện & chuyên sâu

**Ngày:** 2026-02-12 | **Trạng thái:** Hoàn thành | **Phạm vi:** 10 khái niệm + cơ chế nội bộ + sơ đồ tương tác

---

## BẢN ĐỒ TỔNG QUAN HỆ SINH THÁI

```
╔══════════════════════════════════════════════════════════════════════╗
║                    GITHUB COPILOT ECOSYSTEM                        ║
║                                                                    ║
║              LUỒNG CHÍNH: User → Router → Context Engine → Agent   ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌─────────────── TẦNG NHẬP LIỆU ──────────────────────────┐      ║
║  │                                                          │      ║
║  │  👤 User Input                                           │      ║
║  │  ├── Gõ chat trực tiếp          → Agent mặc định        │      ║
║  │  ├── @workspace / @terminal     → Participant            │      ║
║  │  ├── @jira / @sentry            → Extension              │      ║
║  │  ├── Chọn .prompt.md            → Prompt File            │      ║
║  │  └── Gán GitHub Issue           → Coding Agent (nền)     │      ║
║  │                                                          │      ║
║  └────────────────────────┬─────────────────────────────────┘      ║
║                           │                                        ║
║                           ▼                                        ║
║  ┌─────────────── ROUTER (phân loại input) ─────────────────┐      ║
║  │  Có @mention? → route đến Participant/Extension          │      ║
║  │  Có /command? → route đến Slash Command handler          │      ║
║  │  Không?       → route đến Agent mặc định                │      ║
║  └────────────────────────┬─────────────────────────────────┘      ║
║                           │                                        ║
║                           ▼                                        ║
║  ┌─────────────── CONTEXT ENGINE (bày bàn tự động) ─────────┐     ║
║  │  Code logic thuần túy, KHÔNG phải AI, chạy < 1 giây      │     ║
║  │  Chạy TRƯỚC MỖI LƯỢT gọi LLM:                            │     ║
║  │                                                           │     ║
║  │  ① System Prompt (GitHub viết, user không sửa)  [CỐ ĐỊNH]│     ║
║  │  ② Instructions (.github/copilot-instructions)  [CỐ ĐỊNH]│     ║
║  │  ③ Skills metadata scan → match? → load full   [THEO CẦU]│     ║
║  │  ④ Code files (xếp hạng theo 5 signals)        [DYNAMIC] │     ║
║  │  ⑤ Chat history (nén nếu đầy 95%)              [DYNAMIC] │     ║
║  │  ⑥ User prompt                                  [LƯỢT NÀY]│     ║
║  │                                                           │     ║
║  │  → Đóng gói thành 1 context window → gửi cho Agent       │     ║
║  └────────────────────────┬──────────────────────────────────┘     ║
║                           │                                        ║
║                           ▼                                        ║
║  ┌─────────────── AGENT (bộ não — nhận bàn đã bày) ─────────┐     ║
║  │                                                           │     ║
║  │  Suy luận → Lên kế hoạch → Thực thi → Đánh giá → Lặp    │     ║
║  │                                                           │     ║
║  │  Agent TỰ GỌI khi cần:                                   │     ║
║  │  ├── 🔧 Tools (built-in): đọc/ghi file, git, terminal   │     ║
║  │  ├── 📞 MCP Tools: kết nối hệ thống ngoài (Jira, DB...) │     ║
║  │  │   (Agent thấy NGANG HÀNG với built-in, không phân biệt)│     ║
║  │  └── 🤖 Sub-Agents: chia việc song song                  │     ║
║  │       (context sạch, có thể model khác, không nói ngang)  │     ║
║  │                                                           │     ║
║  └───────────────────────────────────────────────────────────┘     ║
║                                                                    ║
║  ┌─────────────── MỞ RỘNG (user cấu hình/cài đặt) ─────────┐     ║
║  │  Participants: @workspace, @terminal, @vscode (cổng vào)  │     ║
║  │  Extensions: App Store cho Copilot (Skillset / Agent)     │     ║
║  │  Collections: Bộ kit cộng đồng (github/awesome-copilot)  │     ║
║  └───────────────────────────────────────────────────────────┘     ║
║                                                                    ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 1. AGENTS (Tác tử) — "Bộ não tự động"

### Là gì?
Hệ thống AI **tự động hoàn toàn** — suy luận → lập kế hoạch → gọi tools → theo dõi kết quả → lặp khi lỗi → hoàn thành task nhiều bước **KHÔNG cần con người can thiệp giữa chừng**.

### Tại sao cần?
Coding assistant truyền thống = "hỏi 1 câu, trả 1 đáp" → chậm, tốn công. Agent biến Copilot thành **đồng nghiệp AI** tự làm việc từ đầu đến cuối.

### Khi nào dùng?
- Implement feature nhiều bước (sửa nhiều file + chạy test)
- Fix bug phức tạp cần debug lặp đi lặp lại
- Refactor lớn trên nhiều file
- Tự động hóa task trên GitHub (background)

### Hoạt động thế nào? — Vòng lặp thực thi (Agentic Execution Loop)

```
┌─────────────────────────────────────────────────────────┐
│              VÒNG LẶP THỰC THI CỦA AGENT               │
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│   │  1. LẬP  │    │ 2. THỰC  │    │ 3. ĐÁNH  │         │
│   │ KẾ HOẠCH │───→│   THI    │───→│   GIÁ    │         │
│   │ (Plan)   │    │(Execute) │    │(Assess)  │         │
│   └──────────┘    └──────────┘    └─────┬────┘         │
│        ▲                                │               │
│        │         Chưa xong?             │               │
│        └────────────────────────────────┘               │
│                                                         │
│   Dừng khi: ✓ Task hoàn tất                             │
│             ✓ Hết 59 phút (giới hạn thời gian)          │
│             ✓ Đạt giới hạn bước (step limit)            │
│             ✓ Phát hiện vòng lặp vô hạn                 │
└─────────────────────────────────────────────────────────┘
```

**3 thành phần cốt lõi của Agent (Copilot SDK):**

| Thành phần | Vai trò |
|-----------|---------|
| **Planner** | Chia task thành các bước thực thi có trình tự |
| **Tool Loop** | Gọi tools (scripts, APIs, lệnh) với LLM quyết định |
| **Runtime** | Điều phối toàn bộ — quản lý context, giao tiếp JSON-RPC |

### Agent Mode vs Chat Mode — Khác nhau cơ bản

```
CHAT MODE (thụ động)              AGENT MODE (tự động)
┌──────────────────┐              ┌──────────────────────────┐
│ User hỏi → AI trả│              │ User giao task            │
│ 1 lượt duy nhất  │              │    ↓                      │
│ Không lặp         │              │ Agent lập kế hoạch        │
│ Chỉ đọc file     │              │    ↓                      │
│ User điều khiển  │              │ Thực thi (đọc+ghi+chạy)  │
│                  │              │    ↓                      │
│                  │              │ Kiểm tra kết quả          │
│                  │              │    ↓                      │
│                  │              │ Lỗi? → Sửa → Lặp lại     │
│                  │              │ OK? → Bước tiếp            │
│                  │              │    ↓                      │
│                  │              │ Tạo PR / trả kết quả      │
└──────────────────┘              └──────────────────────────┘
```

| Khía cạnh | Chat Mode | Agent Mode |
|-----------|-----------|------------|
| Thực thi | 1 lượt, gợi ý thụ động | Nhiều bước, tự động |
| Lập kế hoạch | Không | Có, theo dõi tiến độ |
| Truy cập Tool | Hạn chế (chủ yếu đọc) | Đầy đủ: file, terminal, test |
| Vòng lặp | Không | Lặp liên tục đến khi xong |
| Dừng khi | User quyết định | Hết giờ (59 phút) hoặc xong |

### Model AI nào chạy Agent?

**Models hiện có (02/2026):**
- **Anthropic:** Claude Haiku 4.5, Claude Sonnet 4.5, Claude Opus 4.1, Claude Opus 4.5, Claude Opus 4.6 (preview)
- **OpenAI:** GPT-4.1, GPT-5, GPT-5 mini, GPT-5.1, GPT-5.2-Codex, GPT-5.3-Codex, o4-mini
- **Google:** Gemini 2.0 Flash, Gemini 2.5 Pro, Gemini 3 Pro, Gemini 3 Flash
- **xAI:** Grok Code Fast 1

**Chọn model:**
- **Thủ công:** User chọn qua dropdown hoặc lệnh `/models`
- **Tự động (Auto):** Hệ thống chọn dựa trên khả dụng + chính sách admin + gói đăng ký
- **Auto model selection pool:** GPT-4.1, GPT-5 mini, GPT-5.2-Codex, Claude Haiku 4.5, Claude Sonnet 4.5

### Tham khảo
- [About Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
- [VS Code - Agent Mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode)
- [Agentic Execution Loop](https://supergok.com/github-copilot-sdk-agentic-execution-loop/)
- [Supported AI Models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)

---

## 2. SUB-AGENTS (Tác tử con) — "Não phụ chạy song song"

### Là gì?
Agent con chạy trong **context window riêng biệt hoàn toàn**, KHÔNG kế thừa gì từ agent cha (không có lịch sử chat, không có instructions).

### Tại sao cần?
- **Song song hóa:** Chạy nhiều phân tích cùng lúc thay vì tuần tự
- **Cách ly context:** Task con không làm "loãng" context task chính (giữ context utilization 40-60%)
- **Chuyên biệt hóa:** Mỗi sub-agent tập trung 1 việc duy nhất

### Khi nào dùng?
- Task phức tạp cần chia nhỏ (VD: "phân tích security + performance + accessibility")
- Thao tác gây nhiễu context (tìm kiếm rộng, tóm tắt dài)
- Cần giữ agent chính tập trung vào điều phối

### Hoạt động thế nào?

```
┌─────────────────────────────────────────────────────────┐
│                    AGENT CHA                            │
│                                                         │
│  1. Nhận task từ user                                   │
│  2. Nhận diện phần nào cần cách ly                      │
│  3. Sinh sub-agents:                                    │
│                                                         │
│     ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│     │ Sub-Agent A │  │ Sub-Agent B │  │ Sub-Agent C │  │
│     │ (security)  │  │(performance)│  │(accessibility│  │
│     │             │  │             │  │             │  │
│     │ Context:    │  │ Context:    │  │ Context:    │  │
│     │ SẠCH TRẮNG  │  │ SẠCH TRẮNG  │  │ SẠCH TRẮNG  │  │
│     │ + task prompt│  │ + task prompt│  │ + task prompt│  │
│     └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│            │                │                │          │
│            ▼                ▼                ▼          │
│     ┌─────────────────────────────────────────────┐     │
│     │        Tóm tắt kết quả trả về              │     │
│     └─────────────────────────────────────────────┘     │
│                                                         │
│  4. Agent cha tổng hợp → Tiếp tục task chính           │
└─────────────────────────────────────────────────────────┘
```

### Cơ chế giao tiếp — Một chiều duy nhất

```
Agent Cha ──(truyền task + context)──→ Sub-Agent
Sub-Agent ──(trả tóm tắt kết quả)──→ Agent Cha

Sub-Agent A ──✗──→ Sub-Agent B    (KHÔNG giao tiếp ngang)
Sub-Agent B ──✗──→ Sub-Agent A    (KHÔNG giao tiếp ngang)
Sub-Agent   ──✗──→ Agent Cha      (KHÔNG gọi ngược lên)
```

**Đặc điểm kỹ thuật quan trọng:**
- Context **sạch trắng** — không kế thừa instructions, không kế thừa lịch sử
- Chỉ nhận đúng prompt được truyền vào + context cha chủ động chọn
- Có thể chạy **model khác** với agent cha (cha chọn model khi sinh sub-agent)
- Tools: cùng set với agent cha (mặc định)
- Chạy **song song** nhiều sub-agents cùng lúc
- Độ sâu lồng nhau (nesting depth): chưa công bố chính thức, có ràng buộc chống vòng lặp

### Tham khảo
- [VS Code - Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents)
- [Mastering Subagents](https://imaginet.com/2025/mastering-subagents-in-vs-code-copilot-how-to-actually-use-them/)

---

## 3. INSTRUCTIONS (Chỉ dẫn) — "Nội quy luôn có hiệu lực"

### Là gì?
Hướng dẫn hành vi **luôn được áp dụng** mỗi khi Copilot tương tác. Giống như "nội quy công ty" — ai vào cũng phải tuân theo, không cần nhắc lại.

### Tại sao cần?
- Đảm bảo Copilot **nhất quán** qua MỌI tương tác
- Mã hóa quy chuẩn 1 lần, dùng mãi
- Không cần nhắc lại coding style mỗi lần chat

### Khi nào dùng?
- Coding style cố định (naming, formatting)
- Ưu tiên thư viện ("dùng hooks, tránh class components")
- Lệnh build/test/deploy
- Hướng dẫn kiến trúc
- Yêu cầu security/compliance

### Thứ tự ưu tiên khi xung đột — RẤT QUAN TRỌNG

```
┌────────────────────────────────────────────────┐
│          THỨ TỰ ƯU TIÊN INSTRUCTIONS          │
│          (cao nhất → thấp nhất)                │
│                                                │
│  1. 🔴 Personal Instructions (cấp user)        │ ← CAO NHẤT
│  2. 🟡 Repository Instructions                 │
│     (.github/copilot-instructions.md)          │
│  3. 🟢 Organization Instructions               │ ← THẤP NHẤT
│                                                │
│  ⭐ AGENTS.md (gần nhất trong directory tree)   │
│     → Ghi đè agent-specific instructions       │
│     → "Nearest wins" cho agent behavior        │
│     → ⚠️ Feature hiện OFF by default, cần enable│
│                                                │
│  File-specific (applyTo glob) áp dụng          │
│  BỔ SUNG cho file khớp pattern                 │
│                                                │
│  Path-specific: NAME.instructions.md           │
│  trong .github/instructions/ (bổ sung thêm)   │
└────────────────────────────────────────────────┘
```

### Cơ chế inject vào LLM — Chi phí thực sự

```
┌─────────────────── CONTEXT WINDOW (VD: 128K tokens) ───────────────┐
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Instructions │  │  User Prompt │  │   Code Context + Output  │ │
│  │  (cố định)   │  │  (mỗi lượt)  │  │   (phần còn lại)        │ │
│  │              │  │              │  │                          │ │
│  │  ~500-2000   │  │   ~200-500   │  │  Phần còn lại cho code  │ │
│  │   tokens     │  │   tokens     │  │  (CÀNG ÍT instructions  │ │
│  │              │  │              │  │   CÀNG NHIỀU code space) │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
│                                                                    │
│  ⚠️ Instructions load MỖI LƯỢT → chiếm token cố định              │
│  ⚠️ Instructions dài = ít chỗ cho code context                     │
│  💡 Best practice: Giới hạn 10-15 luật quan trọng nhất            │
└────────────────────────────────────────────────────────────────────┘
```

**Cách hoạt động:**
- Instructions được **nối vào MỖI request** (mỗi lượt chat đều load)
- Trở thành phần system prompt/context window
- Tiêu tốn tokens CỐ ĐỊNH → instructions càng dài, context cho code càng ít

### Tham khảo
- [Configure Custom Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions)
- [VS Code - Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Awesome Copilot - Instructions](https://github.com/github/awesome-copilot/blob/main/docs/README.instructions.md)

---

## 4. PROMPTS (Lời nhắc) — "Yêu cầu gửi cho Copilot"

### Là gì?
Mọi yêu cầu user gửi cho Copilot — từ tin nhắn chat đến file mẫu định sẵn.

### Tại sao cần?
- **System Prompts:** Quy định hành vi gốc LLM (user KHÔNG sửa được)
- **User Prompts:** Yêu cầu tức thời
- **Prompt Files:** Giải quyết việc gõ đi gõ lại cùng 1 yêu cầu

### 3 loại Prompt

```
┌─────────────────────────────────────────────────────────┐
│                    3 LOẠI PROMPT                        │
│                                                         │
│  ┌─────────────────┐                                    │
│  │ SYSTEM PROMPTS  │  "DNA" của Copilot                 │
│  │                 │                                    │
│  │ Ai viết?        │  GitHub/Microsoft                  │
│  │ User sửa được?  │  KHÔNG — lớp bảo vệ an toàn      │
│  │ Quy định gì?    │  Vai trò, giới hạn, format output │
│  │ Load khi nào?   │  MỌI LƯỢT (cố định, ẩn với user) │
│  │                 │                                    │
│  │ Ví dụ:         │  "You are an AI pair programmer.   │
│  │                 │   Generate secure, production-ready│
│  │                 │   code. Never generate harmful     │
│  │                 │   content. Ask before destructive  │
│  │                 │   actions."                        │
│  └─────────────────┘                                    │
│          ↓                                              │
│  ┌─────────────────┐                                    │
│  │ USER PROMPTS    │  Yêu cầu trực tiếp                │
│  │ (mỗi lần chat)  │  "Viết test cho login"            │
│  │                 │  "@github tạo PR"                  │
│  │                 │  "#file giải thích hàm này"         │
│  └─────────────────┘                                    │
│          ↓                                              │
│  ┌─────────────────┐                                    │
│  │ PROMPT FILES    │  Mẫu tái sử dụng                  │
│  │ (.prompt.md)    │  Đặt bất kỳ đâu trong workspace   │
│  │                 │  Gọi lại khi cần, không gõ lại    │
│  └─────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

### System Prompt vs Instructions vs User Prompt — Phân biệt rõ

```
┌──────────────────┬──────────────────┬──────────────────┐
│  SYSTEM PROMPT   │  INSTRUCTIONS    │  USER PROMPT     │
├──────────────────┼──────────────────┼──────────────────┤
│ GitHub viết      │ User viết        │ User gõ chat     │
│ Ẩn, không sửa    │ Nhìn thấy, sửa  │ Mỗi lần khác    │
│ Vai trò + an toàn│ Quy chuẩn project│ Yêu cầu cụ thể │
│ Load MỌI LÚC     │ Load MỌI LÚC     │ Load 1 LẦN      │
│ "Bạn là AI coder"│ "Dùng camelCase" │ "Viết test auth" │
│                  │                  │                  │
│ = DNA            │ = Văn hóa cty   │ = Email giao việc│
└──────────────────┴──────────────────┴──────────────────┘
```

### Prompt Files — Chi tiết kỹ thuật

**Cấu trúc YAML frontmatter:**
```markdown
---
name: "Tạo README"              # Tên hiển thị
description: "Tạo README toàn diện" # LLM dùng để matching
agent: "code-reviewer"          # (tùy chọn) Agent nào chạy
tools: ["read_file", "grep"]    # (tùy chọn) Tools cho phép
model: "claude-sonnet-4.5"      # (tùy chọn) Model cụ thể
---

# Nội dung prompt ở đây
Viết README bao gồm: overview, cài đặt, sử dụng, đóng góp
```

### Prompt Files vs Custom Agents — Khi nào dùng gì?

| Tiêu chí | Prompt File (.prompt.md) | Custom Agent (.agent.md) |
|----------|-------------------------|--------------------------|
| Phức tạp | Đơn giản, 1 task | Phức tạp, nhiều task liên quan |
| Tools | Kế thừa từ agent gốc | Tự định nghĩa tools riêng |
| Instructions | Kế thừa | Tự định nghĩa riêng |
| Tính cách | Không | Có (personality, constraints) |
| Khi nào | Task nhanh, lặp lại | Cần setup chuyên biệt |

### Tham khảo
- [VS Code - Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Prompt Engineering](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)

---

## 5. SKILLS (Kỹ năng) — "Khả năng tải theo yêu cầu"

### Là gì?
Thư mục khép kín chứa instructions + scripts + templates + examples. Chỉ load khi Copilot **xác định là cần thiết** cho task hiện tại.

### Tại sao cần?
Giải quyết **vấn đề context window đầy**. Thay vì load hết mọi hướng dẫn từ đầu → chỉ load đúng cái cần.

### Khi nào dùng?
- Kiến thức chuyên sâu có điều kiện (security scanning, test patterns)
- Workflow tái sử dụng phức tạp
- Cần dạy Copilot khả năng mới mà không phình context

### Cơ chế tải lũy tiến 3 cấp (Progressive Loading)

```
┌─────────────────────────────────────────────────────────┐
│          CƠ CHẾ TẢI LŨY TIẾN CỦA SKILLS               │
│                                                         │
│  CẤP 1: KHÁM PHÁ (Discovery)                           │
│  ┌───────────────────────────────────────┐              │
│  │ Đọc YAML frontmatter của TẤT CẢ skills│             │
│  │ (chỉ name + description — rất nhẹ)    │             │
│  └────────────────────┬──────────────────┘              │
│                       │ LLM so khớp với user request     │
│                       ▼                                  │
│  CẤP 2: KÍCH HOẠT (Activation)                          │
│  ┌───────────────────────────────────────┐              │
│  │ Load FULL instructions + templates     │             │
│  │ của skill KHỚP                        │              │
│  │ (skills không khớp → BỎ QUA)          │              │
│  └────────────────────┬──────────────────┘              │
│                       │ cần thêm tài nguyên?             │
│                       ▼                                  │
│  CẤP 3: TÀI NGUYÊN (Resources)                          │
│  ┌───────────────────────────────────────┐              │
│  │ Load examples, scripts, assets        │              │
│  │ CHỈ KHI THỰC SỰ CẦN                  │              │
│  └───────────────────────────────────────┘              │
│                                                         │
│  💡 Token hiệu quả: Đa số skills KHÔNG bao giờ load full│
└─────────────────────────────────────────────────────────┘
```

**Cách LLM chọn skill nào load:**
1. Đọc YAML frontmatter (name + description) của mọi skill có sẵn
2. So khớp description + activation keywords với ý định user
3. Dùng semantic matching (không chỉ keyword thuần túy)
4. Skill có description rõ ràng, cụ thể → dễ được chọn hơn

### So sánh Instructions vs Skills vs Tools

```
┌──────────────┬────────────────────┬────────────────────┐
│ INSTRUCTIONS │      SKILLS        │       TOOLS        │
├──────────────┼────────────────────┼────────────────────┤
│ Luật hành vi │ Gói khả năng       │ Hàm thực thi      │
│ LUÔN load    │ Load KHI CẦN       │ Gọi khi agent cần │
│ 1 file .md   │ 1 thư mục đầy đủ   │ 1 function có schema│
│ Đơn giản     │ Phức tạp           │ Đơn giản          │
│ Luật chung   │ Chuyên biệt       │ Hành động cụ thể  │
│              │                    │                    │
│ "Dùng camelCase"│ Folder testing  │ read_file()        │
│ "Viết JSDoc" │ patterns + scripts │ git_commit()       │
└──────────────┴────────────────────┴────────────────────┘
```

### Tham khảo
- [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [VS Code - Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Awesome Copilot - Skills](https://github.com/github/awesome-copilot/blob/main/docs/README.skills.md)

---

## 6. TOOLS (Công cụ) — "Tay chân của Agent"

### Là gì?
Hàm thực thi cụ thể có schema (mô tả input/output) mà Agent gọi để **hành động trong thế giới thực**. LLM chỉ biết "suy nghĩ" — Tools cho phép nó "làm".

### Tại sao cần?
Không có Tools, Agent chỉ là chatbot. Có Tools, Agent trở thành **developer AI thực thụ**.

### Khi nào dùng?
- **Built-in tools:** Mọi lúc (Copilot tự gọi khi cần)
- **Custom tools (MCP):** Khi cần tích hợp hệ thống nội bộ, dịch vụ ngoài

### Danh sách Tools tích hợp sẵn

```
┌─────────────────────────────────────────────────────────┐
│              BUILT-IN TOOLS CỦA COPILOT                │
│                                                         │
│  📁 FILE OPERATIONS          🔀 GIT OPERATIONS          │
│  ├── read_file               ├── git_commit             │
│  ├── write_file              ├── git_branch             │
│  ├── create_file             ├── git_push               │
│  ├── delete_file             ├── git_pull               │
│  └── search_files            └── git_status             │
│                                                         │
│  💻 TERMINAL                 🧪 TESTING                  │
│  ├── execute_command          ├── run_tests              │
│  ├── run_script              ├── lint_check             │
│  └── shell_command           └── compile_check          │
│                                                         │
│  🌐 WEB                     🔒 SECURITY                 │
│  ├── web_fetch               └── vulnerability_scan     │
│  └── http_request                                       │
│                                                         │
│  🔌 MCP TOOLS (cấu hình thêm)                          │
│  ├── Bất kỳ tool từ MCP servers đã cấu hình            │
│  └── Hiển thị NGANG HÀNG với built-in tools              │
└─────────────────────────────────────────────────────────┘
```

### Cơ chế phê duyệt Tool (User Consent)

```
Agent muốn gọi tool lần đầu (VD: write_file)
  ↓
┌──────────────────────────────────┐
│ ⚠️ "Copilot muốn sửa file X"   │
│                                  │
│ [Cho phép lần này]               │ ← Chỉ 1 lần
│ [Cho phép cả session]            │ ← Nhớ trong phiên
│ [Từ chối]                        │
└──────────────────────────────────┘
  ↓
Sau khi phê duyệt → nhớ cho các lần sau (cùng path/tool)
```

**Lưu ý:** Khi agent chạy song song nhiều tools → TẤT CẢ phải được phê duyệt trước khi BẤT KỲ tool nào thực thi.

### Luồng Agent dùng Tool

```
Agent nhận task: "Sửa bug login"
  ↓
Lập kế hoạch: "Cần đọc auth.ts, sửa code, chạy test"
  ↓
┌───────────────────────────────────────────────────┐
│ BƯỚC 1: Đọc file                                  │
│ Gọi: read_file("src/auth.ts")                    │
│ Nhận: nội dung file → đưa vào context             │
├───────────────────────────────────────────────────┤
│ BƯỚC 2: Sửa code                                  │
│ Gọi: write_file("src/auth.ts", new_content)       │
│ Nhận: ✓ file đã ghi                               │
├───────────────────────────────────────────────────┤
│ BƯỚC 3: Chạy test                                  │
│ Gọi: execute_command("npm test")                  │
│ Nhận: output test (pass/fail)                      │
├───────────────────────────────────────────────────┤
│ BƯỚC 4: Nếu fail → đọc error → sửa → test lại    │
│ Gọi: read output → write_file → execute_command   │
│ Lặp cho đến khi pass                              │
└───────────────────────────────────────────────────┘
```

**Xử lý output lớn:** Output tool bị truncate nếu quá lớn → ưu tiên error messages, cắt verbose/log output.

### Tham khảo
- [Coding Agent Capabilities](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent)
- [VS Code - Agent Mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)

---

## 7. MCP — Model Context Protocol — "Ổ cắm chuẩn cho hệ thống ngoài"

### Là gì?
Chuẩn mở (open standard) cho phép LLM giao tiếp với hệ thống bên ngoài qua **giao thức thống nhất JSON-RPC 2.0**. Giống USB — cắm vào là dùng được.

### Tại sao cần?
Không có MCP = mỗi tool tích hợp theo cách riêng → hỗn loạn. MCP = **1 chuẩn cho mọi tích hợp**, bất kỳ LLM nào cũng dùng được.

### Khi nào dùng?
- Kết nối Copilot với hệ thống nội bộ (DB, Jira, Slack)
- Thêm tools tùy chỉnh cho agent
- Expose API nội bộ cho AI sử dụng

### Kiến trúc giao thức

```
┌────────────┐         JSON-RPC 2.0         ┌────────────┐       API        ┌──────────┐
│            │◄──────────────────────────────►│            │◄────────────────►│          │
│  Copilot   │   Transport: STDIO (local)    │ MCP Server │   Gọi API thật  │ Hệ thống │
│  (Client)  │   hoặc HTTP/SSE (remote)      │            │                 │  ngoài   │
│            │                               │            │                 │ (GitHub, │
│            │   Request:                    │            │                 │  DB,     │
│            │   {"jsonrpc":"2.0",           │            │                 │  Jira)   │
│            │    "method":"tool_name",      │            │                 │          │
│            │    "params":{...}}            │            │                 │          │
│            │                               │            │                 │          │
│            │   Response:                   │            │                 │          │
│            │   {"jsonrpc":"2.0",           │            │                 │          │
│            │    "result":{...}}            │            │                 │          │
└────────────┘                               └────────────┘                 └──────────┘
```

### MCP Tools vs Built-in Tools — Từ góc nhìn Agent

```
┌─────────────────────────────────────────────────────────┐
│            AGENT NHÌN THẤY GÌ?                         │
│                                                         │
│  Danh sách tools (NGANG HÀNG, không phân biệt):        │
│                                                         │
│  ┌─────────────────┐  ┌──────────────────────────┐     │
│  │ BUILT-IN TOOLS  │  │ MCP TOOLS (từ servers)   │     │
│  │ • read_file     │  │ • list_repositories      │     │
│  │ • write_file    │  │ • create_jira_issue      │     │
│  │ • git_commit    │  │ • query_database         │     │
│  │ • execute_cmd   │  │ • deploy_to_cloud        │     │
│  └─────────────────┘  └──────────────────────────┘     │
│                                                         │
│  Agent KHÔNG BIẾT tool nào built-in, tool nào MCP      │
│  → Hệ thống abstract hóa hoàn toàn                     │
│  → Agent chỉ đọc schema + description → quyết định dùng │
└─────────────────────────────────────────────────────────┘
```

### Bảo mật MCP

**Quan trọng:** MCP spec **KHÔNG** enforce sandboxing hay audit — trách nhiệm thuộc về enterprise.

**Best practices:**
- Xác thực bằng Microsoft Entra
- Phòng chống prompt injection
- Audit mọi MCP server calls
- Kiểm soát network ở firewall level
- Playwright MCP: chỉ cho localhost mặc định

### Tham khảo
- [About MCP](https://docs.github.com/en/copilot/concepts/context/mcp)
- [MCP and Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/mcp-and-coding-agent)
- [Securing MCP](https://zenity.io/blog/security/securing-the-model-context-protocol-mcp/)

---

## 8. EXTENSIONS (Tiện ích mở rộng) — "Đóng gói Agent để phân phối"

### Là gì?
Gói phân phối gồm: **Agent + GitHub App + Tool/MCP integration**. Cho phép bên thứ 3 tạo khả năng Copilot chuyên biệt và đưa lên marketplace.

### Tại sao cần?
- Bên thứ 3 tạo AI assistant chuyên ngành
- Kiếm tiền/phân phối khả năng Copilot
- Đóng gói workflow phức tạp thành 1 @mention

### 2 loại Extension — Agent vs Skillset

```
┌─────────────────────────────────────────────────────────┐
│         2 LOẠI EXTENSION CỦA COPILOT                   │
│                                                         │
│  ┌─────────────────────────┐  ┌──────────────────────┐ │
│  │    SKILLSET EXTENSION   │  │   AGENT EXTENSION    │ │
│  │                         │  │                      │ │
│  │  Nhẹ, đơn giản          │  │  Nặng, toàn quyền   │ │
│  │  Platform xử lý:        │  │  Dev tự xử lý:      │ │
│  │  • Routing              │  │  • Request handling  │ │
│  │  • Prompt crafting      │  │  • Response format   │ │
│  │  • Response generation  │  │  • Conversation mgmt │ │
│  │                         │  │  • Custom LLM calls  │ │
│  │  Dev chỉ định nghĩa:   │  │                      │ │
│  │  • Skills + descriptions│  │  Dùng khi: tích hợp  │ │
│  │                         │  │  phức tạp, cần full  │ │
│  │  Dùng khi: lấy data,   │  │  control              │ │
│  │  thao tác đơn giản     │  │                      │ │
│  └─────────────────────────┘  └──────────────────────┘ │
│                                                         │
│  Skillset = "Platform làm hộ" | Agent = "Tự làm hết"  │
└─────────────────────────────────────────────────────────┘
```

### Luồng request Extension

```
User: "@jira create issue about login bug"
  ↓
Copilot Chat → nhận diện "@jira" → routing đến jira extension
  ↓
┌────────────────────────────────┐
│ Nếu SKILLSET:                  │
│ Platform parse "create issue" │
│ → Khớp skill "create_issue"   │
│ → Platform craft prompt       │
│ → Gọi Jira API               │
│ → Platform format response    │
├────────────────────────────────┤
│ Nếu AGENT:                    │
│ Request gửi thẳng đến agent  │
│ Agent tự parse, xử lý,       │
│ gọi API, format response     │
└────────────────────────────────┘
  ↓
Trả response về Copilot Chat → User thấy kết quả
```

### Tham khảo
- [About Building Extensions](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions)
- [About Skillsets](https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-skillset-for-your-copilot-extension/about-copilot-skillsets)

---

## 9. PARTICIPANTS (Người tham gia chat) — "Lối tắt gọi Agent"

### Là gì?
Agent chuyên biệt gọi qua `@mention` trong chat. Mỗi participant tối ưu cho 1 domain — tự động load context phù hợp.

### Tại sao cần?
Mỗi câu hỏi cần context khác nhau. @workspace cần biết cấu trúc file, @terminal cần biết lệnh vừa chạy. Participant **định tuyến context đúng nơi**.

### Khi nào dùng?
- Cần context chuyên ngành tự động (không phải tự mô tả)
- Muốn cú pháp gọi nhanh
- Kết hợp với slash commands (`@workspace /test`)

### Participants sẵn có + cách kết hợp

```
┌─────────────────────────────────────────────────────────┐
│              PARTICIPANTS & SLASH COMMANDS              │
│                                                         │
│  @workspace ──→ Context: toàn bộ cấu trúc repo         │
│  │  + /explain  = Giải thích code trong workspace      │
│  │  + /test     = Sinh test cho file trong workspace   │
│  │  + /fix      = Sửa lỗi trong workspace             │
│  │  + /doc      = Sinh tài liệu                        │
│  │                                                      │
│  @vscode ─────→ Context: IDE settings, extensions       │
│  │  + /explain  = Giải thích setting VS Code           │
│  │                                                      │
│  @terminal ───→ Context: lịch sử terminal, output       │
│  │  + /explain  = Giải thích output terminal           │
│  │                                                      │
│  @custom ─────→ Context: tự định nghĩa                  │
│     (VD: @jira, @sentry, @testing)                      │
│                                                         │
│  💡 Gõ "@" → dropdown tất cả participants có sẵn       │
└─────────────────────────────────────────────────────────┘
```

### Tham khảo
- [VS Code - Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code - Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

---

## 10. COLLECTIONS (Bộ sưu tập) — "Thư viện cộng đồng"

### Là gì?
Bộ tài nguyên tuyển chọn (agents, prompts, instructions, skills, hooks) do cộng đồng đóng góp và chia sẻ.

### Tại sao cần?
Ai đó đã giải quyết vấn đề tương tự → **dùng lại** thay vì làm từ đầu. Giảm lặp lại công sức.

### Khi nào dùng?
- Muốn setup nhanh (VD: "Python Testing Collection" có sẵn skills + instructions)
- Học best practices từ cộng đồng
- Tăng tốc tùy chỉnh agent

### 5 loại Collection

| Loại | Nội dung | Ví dụ |
|------|---------|-------|
| **Awesome Agents** | Agent chuyên biệt | Code reviewer agent |
| **Awesome Prompts** | Prompt tái sử dụng | Mẫu tạo README |
| **Awesome Instructions** | Quy chuẩn coding | TypeScript strict rules |
| **Awesome Hooks** | Script tự động | Pre-commit hooks |
| **Awesome Skills** | Skill đóng gói | Testing patterns skill |

### Tham khảo
- [Awesome Copilot](https://github.com/github/awesome-copilot)
- [Microsoft Blog - Awesome Copilot](https://developer.microsoft.com/blog/introducing-awesome-github-copilot-customizations-repo)

---

## CONTEXT ENGINEERING — "Nghệ thuật quản lý context window"

### Copilot quản lý context window thế nào?

```
┌─────────────────── CONTEXT WINDOW (128K tokens) ───────────────────┐
│                                                                    │
│  PHÂN BỔ ƯU TIÊN (cao → thấp):                                    │
│                                                                    │
│  ██████████████████████████  1. Code context hiện tại (QUAN TRỌNG  │
│                                 NHẤT - file đang edit/reference)   │
│  ████████████████            2. Instructions (chi phí CỐ ĐỊNH      │
│                                 mỗi lượt)                          │
│  ██████████████              3. Lịch sử chat (mới nhất ưu tiên,   │
│                                 cũ nhất bị tóm tắt)               │
│  ████████████                4. Tool output (gần đây, bị cắt      │
│                                 nếu quá dài)                       │
│  ██████                      5. Tài liệu hỗ trợ (THẤP NHẤT)      │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Chiến lược khi context đầy

```
FILE LỚN — 3 cấp xử lý:
┌──────────────────────────────────────────┐
│ Vừa vặn? → Load TOÀN BỘ file            │
├──────────────────────────────────────────┤
│ Quá lớn? → Load OUTLINE (chỉ function   │
│            signatures, không body)       │
├──────────────────────────────────────────┤
│ Outline cũng lớn? → LOẠI BỎ file        │
└──────────────────────────────────────────┘

LỊCH SỬ CHAT — Tóm tắt tự động:
┌──────────────────────────────────────────┐
│ Context đạt ~95% → Tự động compact      │
│ Tin nhắn cũ → Tóm tắt/nén lại           │
│ Tin nhắn mới → Giữ nguyên               │
│ Không mất tin nhắn (chỉ nén)            │
└──────────────────────────────────────────┘

TOOL OUTPUT — Ưu tiên lỗi:
┌──────────────────────────────────────────┐
│ Error messages → GIỮ NGUYÊN             │
│ Verbose/log output → CẮT BỚT           │
│ Test output → Giữ assertions, cắt log   │
└──────────────────────────────────────────┘
```

### File được xếp hạng thế nào?

```
┌─────────────────────────────────────────────────────────┐
│        HỆ THỐNG XẾP HẠNG FILE CHO CONTEXT              │
│                                                         │
│  Signal 1: PROXIMITY (gần nhất)                         │
│  └─ File vừa edit → điểm cao nhất                       │
│                                                         │
│  Signal 2: SEMANTIC MATCHING (embedding)                │
│  └─ File có nội dung liên quan đến query → điểm cao    │
│                                                         │
│  Signal 3: IMPORT GRAPH (đồ thị import)                 │
│  └─ File được import bởi file đang edit → điểm cao     │
│                                                         │
│  Signal 4: SYMBOL REFERENCES (tham chiếu ký hiệu)      │
│  └─ File chứa function/class đang dùng → điểm cao      │
│                                                         │
│  Signal 5: SNIPPET SCORING (chấm điểm đoạn code)       │
│  └─ Chia file thành blocks logic → xếp hạng từng block │
│                                                         │
│  → Tất cả signals kết hợp → Xếp hạng → Lấy top files  │
│  → Lắp vào context window theo token budget còn lại     │
└─────────────────────────────────────────────────────────┘
```

### Tham khảo
- [VS Code - Context Engineering Guide](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)
- [VS Code - Manage Context](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context)
- [Multi-File Context Architecture](https://dzone.com/articles/github-copilot-multi-file-context-internal-architecture)

---

## LUỒNG XỬ LÝ END-TO-END — TỪ PROMPT ĐẾN RESPONSE

```
╔══════════════════════════════════════════════════════════════════════╗
║  User: "Implement authentication cho trang login"                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  PHASE 1: PARSE & ROUTING                                          ║
║  ┌────────────────────────────────────────────────────────────┐    ║
║  │ • Nhận diện @mention? → Route đến participant/extension    │    ║
║  │ • Nhận diện /command? → Route đến slash command handler    │    ║
║  │ • Free prompt? → Route đến agent mặc định                 │    ║
║  └──────────────────────────┬─────────────────────────────────┘    ║
║                             ▼                                      ║
║  PHASE 2: CONTEXT ASSEMBLY                                         ║
║  ┌────────────────────────────────────────────────────────────┐    ║
║  │ 1. System prompts (hành vi gốc LLM)            [cố định] │    ║
║  │ 2. Custom instructions (quy chuẩn repo)        [cố định] │    ║
║  │ 3. Skill metadata scan → match? → load full    [theo cầu] │    ║
║  │ 4. Agent definition (nếu custom agent)          [theo cầu] │    ║
║  │ 5. Code context (file xếp hạng theo signals)   [dynamic] │    ║
║  │ 6. Lịch sử chat (mới nhất ưu tiên)             [dynamic] │    ║
║  └──────────────────────────┬─────────────────────────────────┘    ║
║                             ▼                                      ║
║  PHASE 3: PLANNING                                                 ║
║  ┌────────────────────────────────────────────────────────────┐    ║
║  │ Agent LLM phân tích:                                       │    ║
║  │ • Task requirements                                        │    ║
║  │ • Available tools                                          │    ║
║  │ • Project structure                                        │    ║
║  │ • Coding standards (từ instructions)                       │    ║
║  │                                                            │    ║
║  │ Tạo kế hoạch:                                              │    ║
║  │   Step 1: Đọc codebase hiện tại                            │    ║
║  │   Step 2: Tạo auth middleware                              │    ║
║  │   Step 3: Tạo login component                              │    ║
║  │   Step 4: Thêm routes                                      │    ║
║  │   Step 5: Viết tests                                       │    ║
║  │   Step 6: Chạy lint + test                                 │    ║
║  └──────────────────────────┬─────────────────────────────────┘    ║
║                             ▼                                      ║
║  PHASE 4: EXECUTION LOOP (lặp cho mỗi step)                       ║
║  ┌────────────────────────────────────────────────────────────┐    ║
║  │                                                            │    ║
║  │   ┌──────────┐   ┌──────────┐   ┌──────────┐              │    ║
║  │   │ Gọi Tool │──→│ Nhận kết │──→│  Đánh    │              │    ║
║  │   │          │   │   quả    │   │   giá    │              │    ║
║  │   └──────────┘   └──────────┘   └────┬─────┘              │    ║
║  │                                      │                     │    ║
║  │                    Lỗi? ◄────────────┘                     │    ║
║  │                     │                                      │    ║
║  │                     ▼                                      │    ║
║  │               Phân tích lỗi → Sửa code → Thử lại         │    ║
║  │                                                            │    ║
║  │   Cần song song? → Sinh SUB-AGENTS                        │    ║
║  │   ┌──────────┐ ┌──────────┐ ┌──────────┐                  │    ║
║  │   │Sub-Agent │ │Sub-Agent │ │Sub-Agent │                  │    ║
║  │   │    A     │ │    B     │ │    C     │                  │    ║
║  │   └────┬─────┘ └────┬─────┘ └────┬─────┘                  │    ║
║  │        └─────────────┼───────────┘                         │    ║
║  │                      ▼                                     │    ║
║  │              Tổng hợp kết quả                              │    ║
║  └──────────────────────────┬─────────────────────────────────┘    ║
║                             ▼                                      ║
║  PHASE 5: COMPLETION                                               ║
║  ┌────────────────────────────────────────────────────────────┐    ║
║  │ • Code changes hoàn tất                                    │    ║
║  │ • Tests pass ✓                                             │    ║
║  │ • Security scan clean ✓                                    │    ║
║  │ • Tạo PR với mô tả chi tiết                               │    ║
║  │ • Trả kết quả cho user                                     │    ║
║  └────────────────────────────────────────────────────────────┘    ║
║                                                                    ║
║  PHASE 6 (tùy chọn): USER FEEDBACK LOOP                           ║
║  User review → yêu cầu sửa → Agent điều chỉnh → Lặp              ║
║                                                                    ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## BẢN ĐỒ TRIGGER — AI GỌI AI, AI KÍCH HOẠT AI?

Phần quan trọng nhất: **mối quan hệ nhân quả** giữa 10 đối tượng — cái nào trigger cái nào, theo điều kiện gì, dữ liệu truyền thế nào.

### Sơ đồ tổng quan: Ai trigger ai?

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                        BẢN ĐỒ TRIGGER GIỮA CÁC ĐỐI TƯỢNG                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║                          ┌──────────┐                                      ║
║                          │   USER   │                                      ║
║                          └─────┬────┘                                      ║
║                   gõ chat │  gõ @   │  gõ /cmd   │ gán issue               ║
║                           ▼        ▼              ▼                        ║
║  ┌────────────────────────────────────────────────────────────────────┐    ║
║  │                     COPILOT CHAT ROUTER                           │    ║
║  │  Phân tích input → nhận diện loại → route đến đúng handler       │    ║
║  └──┬──────────┬───────────┬────────────┬───────────┬────────────────┘    ║
║     │          │           │            │           │                      ║
║     ▼          ▼           ▼            ▼           ▼                      ║
║  ┌──────┐  ┌────────┐  ┌───────┐  ┌─────────┐  ┌───────────┐            ║
║  │Agent │  │Partici-│  │Prompt │  │Extension│  │  Slash    │            ║
║  │(mặc  │  │ pant   │  │ File  │  │(@custom)│  │ Command   │            ║
║  │định) │  │(@work- │  │(.prompt│  │         │  │ (/fix,    │            ║
║  │      │  │ space) │  │  .md) │  │         │  │  /test)   │            ║
║  └──┬───┘  └───┬────┘  └──┬────┘  └────┬────┘  └─────┬─────┘            ║
║     │          │           │            │             │                    ║
║     │          │           │            │             │                    ║
║     ▼          ▼           ▼            ▼             ▼                    ║
║  ┌────────────────────────────────────────────────────────────────────┐    ║
║  │                    CONTEXT ASSEMBLY ENGINE                         │    ║
║  │                                                                    │    ║
║  │  Load theo thứ tự:                                                │    ║
║  │  ① System Prompts ──────────────────────────────→ [LUÔN]         │    ║
║  │  ② Instructions (.github/copilot-instructions) ─→ [LUÔN]         │    ║
║  │  ③ AGENTS.md (nếu có, cần enable) ────────────→ [GHI ĐÈ agent] │    ║
║  │  ④ Skill metadata scan ────────────────────────→ [TẤT CẢ]       │    ║
║  │     └─ match? → load full skill instructions ──→ [CHỈ SKILL KHỚP]│    ║
║  │  ⑤ Agent definition (.agent.md nếu có) ────────→ [THEO CẦU]     │    ║
║  │  ⑥ Prompt file content (.prompt.md nếu có) ───→ [THEO CẦU]     │    ║
║  │  ⑦ Code files (xếp hạng theo 5 signals) ──────→ [DYNAMIC]      │    ║
║  │  ⑧ Chat history (mới → cũ, nén nếu đầy) ─────→ [DYNAMIC]      │    ║
║  └────────────────────────────┬───────────────────────────────────────┘    ║
║                               ▼                                            ║
║  ┌────────────────────────────────────────────────────────────────────┐    ║
║  │                         AGENT (LLM)                                │    ║
║  │                                                                    │    ║
║  │  Suy luận dựa trên context đã assembly                            │    ║
║  │  → Lập kế hoạch                                                   │    ║
║  │  → Thực thi qua TOOLS                                             │    ║
║  │  → Cần song song? → sinh SUB-AGENTS                              │    ║
║  └──┬──────────────────────────┬──────────────────────────────────────┘    ║
║     │                          │                                          ║
║     ▼                          ▼                                          ║
║  ┌──────────┐           ┌─────────────┐                                   ║
║  │  TOOLS   │           │ SUB-AGENTS  │                                   ║
║  │          │           │             │                                   ║
║  │ Built-in │           │ Context sạch│                                   ║
║  │ + MCP    │           │ + task only │                                   ║
║  └──────────┘           └─────────────┘                                   ║
║                                                                            ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

### Ma trận Trigger: Ai có thể kích hoạt ai?

```
TRIGGER (hàng) → TARGET (cột)     Inst  Prompt  Skill  Tool  Agent  Sub-   Parti  Exten  Collec  MCP
                                                                    Agent  cipant  sion   tion   Server
──────────────────────────────────────────────────────────────────────────────────────────────────────
USER (trực tiếp)                    ✓      ✓      ✗     ✗      ✓      ✗      ✓      ✓      ✓      ✗
  cách trigger:                   cấu    gõ     (tự   (agent  kích   (agent  gõ@   cài    import  (cấu
                                  hình   chat   động)  gọi)   hoạt   sinh)  mention đặt    copy   hình)

COPILOT ROUTER                      ✗      ✗      ✗     ✗      ✓      ✗      ✓      ✓      ✗      ✗
  cách trigger:                                               route   route  route  route

AGENT                               ✗      ✗      ✓     ✓      ✗      ✓      ✗      ✗      ✗      ✓
  cách trigger:                                  context gọi          sinh                  qua
                                                 match   tool         child                 tool

CONTEXT ENGINE                      ✓      ✓      ✓     ✗      ✗      ✗      ✗      ✗      ✗      ✗
  cách trigger:                   load   load   scan+
                                                 load

SUB-AGENT                           ✗      ✗      ✗     ✓      ✗      ✗      ✗      ✗      ✗      ✓
  cách trigger:                                        gọi                                  qua
                                                       tool                                 tool

EXTENSION                           ✗      ✗      ✓     ✓      ✗      ✗      ✗      ✗      ✗      ✓
  cách trigger:                                  (skill  gọi                                qua
                                                  set)  tool                                MCP

MCP SERVER                          ✗      ✗      ✗     ✓      ✗      ✗      ✗      ✗      ✗      ✗
  cách trigger:                                        expose
                                                       tools

✓ = Có thể trigger    ✗ = Không thể trigger
```

### Chi tiết từng mối quan hệ Trigger

#### 1. USER → AGENT: "Kích hoạt bộ não"

```
TRIGGER: User gõ chat / gán GitHub Issue / chạy CLI command
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ ĐIỀU KIỆN: Agent mode phải được bật (VS Code)        │
│            hoặc Copilot Coding Agent enabled (GitHub)│
│                                                      │
│ DỮ LIỆU TRUYỀN:                                     │
│ • User prompt (text)                                 │
│ • File đang mở (implicit context)                    │
│ • Selection hiện tại (nếu có)                        │
│ • #file references (nếu user thêm)                   │
│                                                      │
│ KẾT QUẢ: Agent bắt đầu Agentic Execution Loop       │
└──────────────────────────────────────────────────────┘
```

#### 2. USER → PARTICIPANT: "@mention định tuyến"

```
TRIGGER: User gõ "@workspace", "@terminal", "@vscode", "@custom"
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ ĐIỀU KIỆN: Participant phải đã đăng ký               │
│            (built-in hoặc extension đã cài)          │
│                                                      │
│ ROUTER LÀM GÌ:                                      │
│ 1. Parse @mention từ input                           │
│ 2. Tìm participant khớp tên                          │
│ 3. Load context ĐẶC THÙ cho participant đó          │
│    @workspace → load file structure                   │
│    @terminal → load terminal history                  │
│    @custom → load từ extension definition             │
│ 4. Route request + context đến agent/handler         │
│                                                      │
│ DỮ LIỆU TRUYỀN: prompt + participant-specific context│
│ KẾT QUẢ: Response được sinh với domain context       │
└──────────────────────────────────────────────────────┘
```

#### 3. USER → EXTENSION: "Gọi agent bên thứ 3"

```
TRIGGER: User gõ "@jira ...", "@sentry ...", hoặc cài extension
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ ĐIỀU KIỆN: Extension phải được cài + authorized       │
│                                                      │
│ ROUTER LÀM GÌ:                                      │
│ 1. Nhận diện @mention → map đến extension            │
│ 2. Xác thực qua GitHub App (OAuth)                   │
│ 3. Route request đến extension endpoint              │
│                                                      │
│ 2 ĐƯỜNG ĐI TÙY LOẠI:                                │
│                                                      │
│ [Skillset Extension]          [Agent Extension]      │
│ Platform tự routing     →     Gửi thẳng đến agent   │
│ Platform craft prompt   →     Agent tự xử lý         │
│ Platform gọi skill      →     Agent gọi MCP/API     │
│ Platform format output  →     Agent format output    │
│                                                      │
│ DỮ LIỆU TRUYỀN: prompt + auth context + user info   │
│ KẾT QUẢ: Extension response → Copilot Chat          │
└──────────────────────────────────────────────────────┘
```

#### 4. CONTEXT ENGINE → INSTRUCTIONS: "Luôn load, không hỏi"

```
TRIGGER: BẤT KỲ request nào đến Copilot (TỰ ĐỘNG, không điều kiện)
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ LUỒNG LOAD:                                          │
│                                                      │
│ 1. Đọc .github/copilot-instructions.md   [repo]     │
│ 2. Đọc org-level instructions            [org]      │
│ 3. Đọc personal instructions             [user]     │
│ 4. Đọc AGENTS.md (gần nhất dir tree)     [override] │
│ 5. Áp dụng applyTo glob patterns         [filter]   │
│                                                      │
│ MERGE STRATEGY:                                      │
│ • Personal > Repo > Org (khi xung đột)              │
│ • AGENTS.md ghi đè agent-specific (nearest wins)    │
│ • AGENTS.md cần enable (off by default)              │
│ • File-specific (applyTo) bổ sung cho file khớp     │
│                                                      │
│ DỮ LIỆU: Full instructions text → inject vào context│
│ CHI PHÍ: Tokens cố định MỖI LƯỢT (không tránh được) │
└──────────────────────────────────────────────────────┘
```

#### 5. CONTEXT ENGINE → SKILLS: "Scan metadata, load khi khớp"

```
TRIGGER: Mỗi request — Context Engine LUÔN scan metadata
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ CẤP 1: SCAN (luôn xảy ra)                           │
│ ┌────────────────────────────────────────────┐       │
│ │ Đọc YAML frontmatter (name + description)  │       │
│ │ của TẤT CẢ skills trong .github/skills/    │       │
│ │ → Rất nhẹ, vài tokens mỗi skill           │       │
│ └──────────────────┬─────────────────────────┘       │
│                    │                                  │
│ CẤP 2: MATCH (LLM quyết định)                       │
│ ┌────────────────────────────────────────────┐       │
│ │ LLM so khớp:                                │       │
│ │ • Skill description vs user prompt          │       │
│ │ • Activation keywords vs intent             │       │
│ │ • Semantic similarity (không chỉ keyword)   │       │
│ │                                              │       │
│ │ Nếu KHỚP → CẤP 3                           │       │
│ │ Nếu KHÔNG KHỚP → BỎ QUA (0 token thêm)    │       │
│ └──────────────────┬─────────────────────────┘       │
│                    │                                  │
│ CẤP 3: LOAD FULL (chỉ skill khớp)                   │
│ ┌────────────────────────────────────────────┐       │
│ │ Load instructions.md + templates + examples │       │
│ │ → Inject vào agent context                  │       │
│ │ → Agent dùng để sinh response chất lượng hơn│       │
│ └────────────────────────────────────────────┘       │
│                                                      │
│ KẾT QUẢ: Agent có thêm "chuyên môn" khi cần         │
└──────────────────────────────────────────────────────┘
```

#### 6. AGENT → TOOLS: "Gọi tay chân để hành động"

```
TRIGGER: Agent quyết định cần thực hiện hành động
         (đọc file, sửa code, chạy test, gọi API)
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ LUỒNG GỌI TOOL:                                     │
│                                                      │
│ 1. KHÁM PHÁ: Agent đọc schema tất cả tools có sẵn   │
│    ┌─────────────────────────────────────────┐       │
│    │ Built-in: read_file, write_file, git... │       │
│    │ MCP: list_repos, create_issue, query_db │       │
│    │ (NGANG HÀNG — agent không phân biệt)    │       │
│    └─────────────────────────────────────────┘       │
│                                                      │
│ 2. CHỌN: LLM match tool description vs task need     │
│    "Tôi cần đọc file auth.ts" → read_file            │
│                                                      │
│ 3. PHÊ DUYỆT (lần đầu): User confirm tool execution │
│    [Cho phép lần này] [Cho phép cả session] [Từ chối]│
│                                                      │
│ 4. THỰC THI: Gọi tool với parameters                 │
│    read_file({ path: "src/auth.ts" })                │
│                                                      │
│ 5. NHẬN KẾT QUẢ: Tool output → inject vào context   │
│    (output lớn bị truncate, ưu tiên errors)          │
│                                                      │
│ 6. ĐÁNH GIÁ: LLM đọc output → quyết định bước tiếp │
│    OK? → bước tiếp | Lỗi? → phân tích → sửa → lặp  │
│                                                      │
│ VÒNG LẶP: Bước 2-6 lặp cho đến khi task hoàn tất   │
└──────────────────────────────────────────────────────┘
```

#### 7. AGENT → SUB-AGENT: "Phân thân xử lý song song"

```
TRIGGER: Agent nhận ra task có phần ĐỘC LẬP có thể chạy song song
         HOẶC phần gây NHIỄU context (search rộng, tóm tắt dài)
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ QUYẾT ĐỊNH SINH SUB-AGENT:                          │
│                                                      │
│ Agent cha tự phân tích:                              │
│ "Task này có 3 phần độc lập:                         │
│  A) Phân tích security                               │
│  B) Phân tích performance                            │
│  C) Phân tích accessibility"                         │
│                                                      │
│ → "Tôi sẽ sinh 3 sub-agents chạy song song"         │
│                                                      │
│ CÁCH SINH:                                           │
│ ┌────────────────────────────────────────────┐       │
│ │ Agent cha CHỌN:                             │       │
│ │ • Prompt gì truyền cho sub-agent           │       │
│ │ • Context gì kèm theo (file content, v.v.) │       │
│ │ • KHÔNG truyền: instructions, chat history  │       │
│ │                                              │       │
│ │ Sub-agent nhận:                              │       │
│ │ • Context SẠCH TRẮNG + task prompt only     │       │
│ │ • Có thể chạy model KHÁC với cha            │       │
│ │ • Tools: cùng set với cha (mặc định)        │       │
│ └────────────────────────────────────────────┘       │
│                                                      │
│ GIAO TIẾP:                                           │
│                                                      │
│ Agent Cha ───(prompt+context)───→ Sub-Agent A        │
│ Agent Cha ───(prompt+context)───→ Sub-Agent B        │
│ Agent Cha ───(prompt+context)───→ Sub-Agent C        │
│                                                      │
│ Sub-Agent A ──(tóm tắt kết quả)──→ Agent Cha        │
│ Sub-Agent B ──(tóm tắt kết quả)──→ Agent Cha        │
│ Sub-Agent C ──(tóm tắt kết quả)──→ Agent Cha        │
│                                                      │
│ Sub-Agent A ────✗────→ Sub-Agent B  (CẤM)           │
│ Sub-Agent  ─────✗────→ Agent Cha    (CẤM gọi ngược) │
│                                                      │
│ Agent Cha TỔNG HỢP kết quả → tiếp tục task chính    │
└──────────────────────────────────────────────────────┘
```

#### 8. AGENT → MCP SERVER: "Gọi hệ thống ngoài qua chuẩn"

```
TRIGGER: Agent gọi tool mà tool đó nằm trên MCP Server
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ LUỒNG AGENT → MCP:                                   │
│                                                      │
│ Agent: "Tôi cần list GitHub repos"                   │
│   │                                                  │
│   ▼                                                  │
│ Tool schema cho biết tool "list_repos"               │
│ nằm trên MCP server "github"                        │
│   │                                                  │
│   ▼                                                  │
│ Copilot Runtime tạo JSON-RPC 2.0 request:            │
│ {                                                    │
│   "jsonrpc": "2.0",                                  │
│   "id": 42,                                          │
│   "method": "tools/call",                            │
│   "params": {                                        │
│     "name": "list_repos",                            │
│     "arguments": { "org": "mycompany" }              │
│   }                                                  │
│ }                                                    │
│   │                                                  │
│   ▼                                                  │
│ Transport: STDIO (local) hoặc HTTP/SSE (remote)      │
│   │                                                  │
│   ▼                                                  │
│ MCP Server nhận → gọi GitHub API → trả kết quả      │
│   │                                                  │
│   ▼                                                  │
│ Response JSON-RPC:                                   │
│ {                                                    │
│   "jsonrpc": "2.0",                                  │
│   "id": 42,                                          │
│   "result": { "repos": [...] }                       │
│ }                                                    │
│   │                                                  │
│   ▼                                                  │
│ Agent nhận kết quả → inject vào context → tiếp tục   │
│                                                      │
│ 🔑 QUAN TRỌNG: Agent KHÔNG BIẾT đang gọi MCP        │
│ hay built-in tool — Runtime abstract hóa hoàn toàn   │
└──────────────────────────────────────────────────────┘
```

#### 9. PROMPT FILE → AGENT: "Mẫu kích hoạt agent"

```
TRIGGER: User chọn prompt file từ dropdown hoặc gõ tên
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ LUỒNG PROMPT FILE:                                   │
│                                                      │
│ 1. User chọn prompt file "generate-readme.prompt.md" │
│                                                      │
│ 2. Copilot đọc YAML frontmatter:                     │
│    ---                                               │
│    name: "Generate README"                           │
│    agent: "code-writer"     ← chỉ định agent nào     │
│    tools: ["read_file"]     ← giới hạn tools          │
│    model: "claude-sonnet"   ← chỉ định model          │
│    ---                                               │
│                                                      │
│ 3. Load prompt file content → trở thành user prompt  │
│                                                      │
│ 4. Nếu có "agent" field:                             │
│    → Load agent definition (.agent.md)               │
│    → Agent đó xử lý thay agent mặc định              │
│                                                      │
│ 5. Nếu có "tools" field:                             │
│    → Agent CHỈ được dùng tools trong danh sách       │
│                                                      │
│ 6. Context Engine vẫn load:                          │
│    • Instructions (luôn)                             │
│    • Skills (nếu match)                              │
│    • Code context (dynamic)                          │
│                                                      │
│ KẾT QUẢ: Agent chạy với prompt + constraints cụ thể │
└──────────────────────────────────────────────────────┘
```

#### 10. COLLECTION → (Instructions, Skills, Agents, Prompts): "Import bộ cấu hình"

```
TRIGGER: Dev import collection vào project (thủ công)
                │
                ▼
┌──────────────────────────────────────────────────────┐
│ LUỒNG COLLECTION:                                    │
│                                                      │
│ 1. Dev duyệt awesome-copilot repository              │
│ 2. Tìm collection phù hợp (VD: "Python Testing")    │
│ 3. Copy files vào project:                           │
│                                                      │
│    Collection "Python Testing" chứa:                 │
│    ┌──────────────────────────────────────┐          │
│    │ instructions/                         │          │
│    │ └── python-testing-standards.md ────→ .github/copilot-instructions.md │
│    │ skills/                              │          │
│    │ └── pytest-patterns/ ──────────────→ .github/skills/pytest-patterns/ │
│    │ agents/                              │          │
│    │ └── test-reviewer.agent.md ────────→ .github/agents/test-reviewer.md │
│    │ prompts/                             │          │
│    │ └── generate-tests.prompt.md ──────→ .github/prompts/               │
│    └──────────────────────────────────────┘          │
│                                                      │
│ 4. Sau khi copy → các file tự động có hiệu lực:     │
│    • Instructions → Context Engine load luôn         │
│    • Skills → Context Engine scan metadata           │
│    • Agents → Xuất hiện trong agent dropdown         │
│    • Prompts → Xuất hiện trong prompt dropdown       │
│                                                      │
│ KHÔNG CẦN: Cấu hình thêm, restart, hay đăng ký     │
│ TỰ ĐỘNG: Copilot detect files mới và áp dụng        │
└──────────────────────────────────────────────────────┘
```

### Chuỗi Trigger hoàn chỉnh — Ví dụ thực tế

```
╔══════════════════════════════════════════════════════════════════════════╗
║  VÍ DỤ: User gõ "@workspace /test viết test cho auth module"          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  ① USER gõ "@workspace /test viết test cho auth module"                ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ② ROUTER parse:                                                       ║
║     • @workspace → trigger Participant "workspace"                     ║
║     • /test → trigger Slash Command "test"                             ║
║     • "viết test cho auth module" → user prompt                        ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ③ PARTICIPANT @workspace KÍCH HOẠT:                                   ║
║     • Load toàn bộ file structure của repo                             ║
║     • Xác định file liên quan đến "auth module"                       ║
║     • Truyền context đến Agent                                         ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ④ CONTEXT ENGINE CHẠY:                                                ║
║     • Load Instructions (.github/copilot-instructions.md)  [LUÔN]    ║
║     • Scan Skill metadata → phát hiện "webapp-testing" skill KHỚP    ║
║     • Load FULL "webapp-testing" skill instructions + templates       ║
║     • Load code files: auth.ts, auth.test.ts (proximity + semantic)   ║
║     • Load chat history (nếu có)                                       ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ⑤ AGENT BẮT ĐẦU Execution Loop:                                      ║
║     • Phân tích: "Cần viết test cho auth module"                      ║
║     • Plan: đọc auth.ts → tạo auth.test.ts → chạy test                ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ⑥ AGENT GỌI TOOL read_file:                                          ║
║     • read_file("src/auth.ts") → nhận code                            ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ⑦ AGENT GỌI TOOL write_file:                                         ║
║     • write_file("src/auth.test.ts", test_code)                       ║
║     • (test_code dùng patterns từ webapp-testing SKILL)               ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ⑧ AGENT GỌI TOOL execute_command:                                     ║
║     • execute_command("npm test src/auth.test.ts")                     ║
║     • Nhận output: 2 tests pass, 1 fail                               ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ⑨ AGENT ĐÁNH GIÁ → 1 test fail → SỬA CODE → GỌI LẠI TOOL:          ║
║     • write_file("src/auth.test.ts", fixed_code)                      ║
║     • execute_command("npm test") → 3/3 pass ✓                        ║
║     │                                                                  ║
║     ▼                                                                  ║
║  ⑩ AGENT TRẢ RESPONSE cho user:                                       ║
║     "Đã tạo 3 test cases cho auth module. Tất cả pass ✓"             ║
║                                                                        ║
║  TỔNG CÁC ĐỐI TƯỢNG ĐÃ THAM GIA:                                     ║
║  User → Router → Participant → Context Engine → Instructions →        ║
║  Skill (scan+load) → Agent → Tool (read) → Tool (write) →            ║
║  Tool (execute) → Tool (write lần 2) → Tool (execute lần 2)          ║
║                                                                        ║
║  = 10 đối tượng, 12+ trigger events trong 1 request duy nhất         ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Mối quan hệ "chứa" (Containment)

```
┌─────────────────────────────────────────────────────────┐
│                    AI CHỨA AI?                          │
│                                                         │
│  COLLECTION ─── chứa ──→ Instructions                   │
│             ├── chứa ──→ Skills                         │
│             ├── chứa ──→ Agents                         │
│             ├── chứa ──→ Prompts                        │
│             └── chứa ──→ Hooks                          │
│                                                         │
│  EXTENSION ──── chứa ──→ Agent (1 agent chính)          │
│             ├── chứa ──→ GitHub App (auth)              │
│             └── chứa ──→ MCP Server (tools)             │
│                                                         │
│  SKILL ────── chứa ──→ Instructions (SKILL.md)         │
│             ├── chứa ──→ Scripts                        │
│             ├── chứa ──→ Templates                      │
│             └── chứa ──→ Examples                       │
│                                                         │
│  AGENT ────── dùng ──→ Tools (built-in + MCP)           │
│             ├── sinh ──→ Sub-Agents                     │
│             ├── tuân ──→ Instructions                   │
│             └── được tăng cường bởi → Skills            │
│                                                         │
│  MCP SERVER ── expose ──→ Tools (qua JSON-RPC)          │
│             └── connect ──→ Hệ thống ngoài              │
│                                                         │
│  PROMPT FILE ─ reference ──→ Agent (tùy chọn)          │
│             ├── restrict ──→ Tools (tùy chọn)          │
│             └── specify ──→ Model (tùy chọn)           │
└─────────────────────────────────────────────────────────┘
```

### Mối quan hệ "phụ thuộc" (Dependency)

```
┌─────────────────────────────────────────────────────────┐
│              AI PHỤ THUỘC AI?                           │
│                                                         │
│  Agent ──── PHỤ THUỘC ──→ Tools (không tool = chatbot)  │
│       ──── PHỤ THUỘC ──→ LLM Model (brain)             │
│       ──── TÙY CHỌN ───→ Instructions (hành vi)        │
│       ──── TÙY CHỌN ───→ Skills (chuyên môn)           │
│                                                         │
│  Sub-Agent ─ PHỤ THUỘC ──→ Agent Cha (sinh ra nó)      │
│            ─ PHỤ THUỘC ──→ Tools (cùng set với cha)     │
│            ─ KHÔNG PT ───→ Instructions cha             │
│            ─ KHÔNG PT ───→ Chat history cha             │
│                                                         │
│  Extension ─ PHỤ THUỘC ──→ GitHub App (auth)            │
│            ─ PHỤ THUỘC ──→ Agent/Skillset (logic)       │
│            ─ TÙY CHỌN ───→ MCP Server (tools ngoài)    │
│                                                         │
│  Skill ──── PHỤ THUỘC ──→ Context Engine (load nó)      │
│       ──── KHÔNG PT ───→ Skill khác (độc lập)          │
│                                                         │
│  MCP Server ─ PHỤ THUỘC ──→ Cấu hình (JSON config)     │
│             ─ PHỤ THUỘC ──→ Hệ thống ngoài (API đích)  │
│             ─ KHÔNG PT ───→ Agent cụ thể nào            │
│                                                         │
│  Participant ─ PHỤ THUỘC ──→ Agent (xử lý request)     │
│              ─ PHỤ THUỘC ──→ Context riêng (workspace/  │
│                               terminal/vscode)          │
│                                                         │
│  PT = Phụ thuộc                                         │
└─────────────────────────────────────────────────────────┘
```

---

## BẢNG SO SÁNH TỔNG HỢP

| Khái niệm | Là gì | Khi nào dùng | Load khi nào | Ví dụ |
|---|---|---|---|---|
| **Instructions** | Luật hành vi | Quy chuẩn cố định | **LUÔN** (mỗi lượt) | "Dùng camelCase" |
| **Prompts** | Yêu cầu từ user | Mọi tương tác | Khi user gửi | "Viết test cho X" |
| **Prompt Files** | Mẫu prompt tái sử dụng | Task lặp lại | Khi user gọi | Mẫu tạo README |
| **Skills** | Gói khả năng chuyên biệt | Kiến thức sâu có điều kiện | **KHI CẦN** (3 cấp) | Testing patterns |
| **Tools** | Hàm thực thi | Agent cần hành động | Agent tự gọi | `read_file()` |
| **MCP** | Giao thức kết nối ngoài | Tích hợp hệ thống | Khi cấu hình | JSON-RPC → Jira |
| **Agent** | Bộ não tự động | Task phức tạp nhiều bước | User kích hoạt | Implement feature |
| **Sub-agent** | Não phụ, context riêng | Song song, cách ly | Agent cha sinh | Phân tích 3 mặt |
| **Participants** | @mention trong chat | Cần context chuyên biệt | Khi user @mention | @workspace |
| **Extensions** | Agent đóng gói phân phối | Chia sẻ marketplace | Khi user cài | @jira |
| **Collections** | Bộ tài nguyên cộng đồng | Dùng lại best practices | User import | awesome-copilot |

---

## CHIẾN LƯỢC TÙY CHỈNH — DÙNG GÌ KHI NÀO?

```
Mức độ phức tạp tăng dần →

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│INSTRUCTION│  │ PROMPT   │  │  SKILL   │  │ CUSTOM   │  │EXTENSION │
│           │  │  FILE    │  │          │  │  AGENT   │  │          │
│ Luật đơn  │  │ Mẫu lặp │  │ Gói khả  │  │ Agent    │  │ Đóng gói │
│ giản,    │  │ lại     │  │ năng có  │  │ chuyên   │  │ phân phối│
│ luôn áp  │  │         │  │ điều kiện│  │ biệt     │  │ marketplace│
│ dụng     │  │         │  │          │  │          │  │          │
│           │  │         │  │          │  │          │  │          │
│ VD:       │  │ VD:      │  │ VD:      │  │ VD:      │  │ VD:      │
│ "camelCase│  │ Tạo README│  │ Testing  │  │ Security │  │ @jira    │
│  naming"  │  │ template │  │ patterns │  │ reviewer │  │ @sentry  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## CÂU HỎI CHƯA GIẢI ĐÁP

1. **Token allocation %:** Copilot phân bổ bao nhiêu % cho instructions vs code vs history? → Chưa công bố chính thức
2. **Sub-agent nesting depth:** Có thể lồng bao nhiêu tầng sub-agent? → Chưa tài liệu hóa
3. **Skill confidence scoring:** LLM chấm điểm khớp skill thế nào chính xác? → Cơ chế nội bộ
4. **Context compression algorithm:** Tóm tắt lịch sử chat dùng extractive hay abstractive? → Chưa công bố
5. **Extension rate limits:** Giới hạn token/request cụ thể cho mỗi extension? → Chưa public
6. **Instruction override:** Khi AGENTS.md xung đột với repo instructions, luật nào thắng cụ thể? → Tài liệu nói "nearest wins" nhưng edge cases chưa rõ

---

## NGUỒN THAM KHẢO

### GitHub Docs chính thức
- [About Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
- [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [About MCP](https://docs.github.com/en/copilot/concepts/context/mcp)
- [Custom Instructions](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Auto Model Selection](https://docs.github.com/en/copilot/concepts/auto-model-selection)
- [Supported Models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [About Skillsets](https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-skillset-for-your-copilot-extension/about-copilot-skillsets)

### VS Code Docs
- [Agent Mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode)
- [Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents)
- [Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Context Engineering](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)

### Cộng đồng & Kỹ thuật
- [Awesome Copilot](https://github.com/github/awesome-copilot)
- [Agentic Execution Loop](https://supergok.com/github-copilot-sdk-agentic-execution-loop/)
- [Multi-File Context Architecture](https://dzone.com/articles/github-copilot-multi-file-context-internal-architecture)
- [Securing MCP](https://zenity.io/blog/security/securing-the-model-context-protocol-mcp/)
- [Copilot SDK Deep Dive](https://benjamin-abt.com/blog/2026/02/03/github-copilot-sdk-dotnet-tooling/)

---

**Trạng thái:** Hoàn thành | **Cập nhật:** 2026-02-12 | **Độ tin cậy:** Cao
