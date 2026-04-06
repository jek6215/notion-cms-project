// ─── Rich Text ───────────────────────────────────────────────────────────────

export interface RichTextAnnotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

export interface RichText {
  type: "text"
  text: string
  href: string | null
  annotations: RichTextAnnotations
}

// ─── Notice Block ─────────────────────────────────────────────────────────────

interface BaseBlock {
  id: string
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph"
  richText: RichText[]
}

export interface Heading1Block extends BaseBlock {
  type: "heading_1"
  richText: RichText[]
}

export interface Heading2Block extends BaseBlock {
  type: "heading_2"
  richText: RichText[]
}

export interface Heading3Block extends BaseBlock {
  type: "heading_3"
  richText: RichText[]
}

export interface BulletedListItemBlock extends BaseBlock {
  type: "bulleted_list_item"
  richText: RichText[]
}

export interface NumberedListItemBlock extends BaseBlock {
  type: "numbered_list_item"
  richText: RichText[]
}

export interface CodeBlock extends BaseBlock {
  type: "code"
  richText: RichText[]
  language: string
}

export interface ImageBlock extends BaseBlock {
  type: "image"
  url: string
  caption: RichText[]
}

export interface QuoteBlock extends BaseBlock {
  type: "quote"
  richText: RichText[]
}

export interface CalloutBlock extends BaseBlock {
  type: "callout"
  richText: RichText[]
  icon: string | null
}

export interface DividerBlock extends BaseBlock {
  type: "divider"
}

export interface UnsupportedBlock extends BaseBlock {
  type: "unsupported"
  originalType: string
}

export type NoticeBlock =
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | BulletedListItemBlock
  | NumberedListItemBlock
  | CodeBlock
  | ImageBlock
  | QuoteBlock
  | CalloutBlock
  | DividerBlock
  | UnsupportedBlock

// ─── Notice ──────────────────────────────────────────────────────────────────

export interface Notice {
  id: string
  title: string
  summary: string
  category: string
  isPinned: boolean
  publishedAt: string // ISO 8601
  isPublic: boolean
}

// ─── Mapper 함수 시그니처 ──────────────────────────────────────────────────────

/** Notion API 페이지 응답 → Notice */
export type MapPageToNotice = (page: unknown) => Notice

/** Notion API 블록 응답 → NoticeBlock */
export type MapBlockToNoticeBlock = (block: unknown) => NoticeBlock

/** Notion API 블록 목록 응답 → NoticeBlock[] */
export type MapBlocksToNoticeBlocks = (blocks: unknown[]) => NoticeBlock[]
