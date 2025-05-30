import * as t from 'drizzle-orm/pg-core';

/**
* 機密情報を扱うスキーマ
* 機密情報を扱うテーブルは、privateSchema.table を利用する。t.pgTable を利用ではなく。
*/

import { userTable } from './user';
import { id, createdAt, updatedAt, privateSchema } from './helper';

// メールアドレスの検証用のトークンを保持するテーブル
export const emailVerificationTokenTable = privateSchema.table('email_verification_tokens',
  {
    id,
    // 検証対象のメールアドレス（検索用）
    hashedEmail: t.varchar('hashedEmail', { length: 255 }).notNull(),
    // 暗号化されたメールアドレス
    encryptedEmail: t.varchar('encrypted_email', { length: 255 }).notNull(),
    // 手入力用の短い認証コード
    hashedShortAuthorizationCode: t.varchar('hashed_short_authorization_code', { length: 255 }).notNull(),
    // トークンの検証の状態
    // - pending: 検証待ち
    // - verified: 検証済み
    // - revoked: 検証が取り消され検証不可 / 例: 送信できないメールアドレスだった、検証回数が上限に達した
    status: t.varchar('status', { length: 255 }).notNull().$type<'pending' | 'verified' | 'revoked'>(),
    // 認証トークンの有効期限
    expiredAt: t.timestamp('expired_at').notNull(),
    // 認証トークンの検証回数
    // 何度も間違える場合、悪意のあるユーザーの可能性があるため、検証を取り消す
    verifiedCount: t.integer('verified_count').notNull().default(0),
    // 認証トークンの最後に検証された日時
    lastVerifiedAt: t.timestamp('last_verified_at'),
    // デバイスフィンガープリントのハッシュ値
    // 利用例:
    // - 普段と異なるデバイスからメール検証を求めている場合に、ユーザーにその旨を通知するために利用する
    deviceFingerprintHash: t.varchar('device_fingerprint_hash', { length: 255 }),
    createdAt,
    updatedAt,
  },
  (table) => [
    t.uniqueIndex('email_short_authorization_code_unique_index').on(table.hashedEmail, table.hashedShortAuthorizationCode),
    // 有効期限切れになったトークを取得し、削除するためのインデックス
    t.index('email_verification_tokens_expired_at_index').on(table.expiredAt),
    // 同一デバイスから、複数のメールアドレスを短期間に入力している場合、アカウント偽造が疑われる為、それを抽出するためのインデックス
    t.index('email_verification_tokens_device_fingerprint_hash_index').on(table.deviceFingerprintHash),
  ]
)

// リフレッシュトークンを保持するテーブル
// - アクセストークンのリフレッシュを行い、ログイン状態を維持するために利用される
export const refreshTokenTable = privateSchema.table('refresh_tokens',
  {
    id,
    // リフレッシュトークンのハッシュ値
    hashedRefreshToken: t.varchar('hashed_refresh_token', { length: 255 }).notNull(),
    // リフレッシュトークンの有効期限
    expiredAt: t.timestamp('expired_at').notNull(),
    // リフレッシュトークンを発行したユーザーのID
    userId: t.uuid('user_id').references(() => userTable.id).notNull(),
    // リフレッシュトークンを発行したユーザーのデバイスフィンガープリントのハッシュ値
    deviceFingerprintHash: t.varchar('device_fingerprint_hash', { length: 255 }),
    // リフレッシュトークンがローテーションした回数
    // アクセストークンのリフレッシュを行うたびに、リフレッシュトークンがローテーションされる
    rotationCount: t.integer('rotation_count').notNull().default(0),
    createdAt,
    updatedAt,
  },
  (table) => [
    t.uniqueIndex('refresh_tokens_hashed_refresh_token_unique_index').on(table.hashedRefreshToken),
    t.uniqueIndex('user_device_unique_index').on(table.userId, table.deviceFingerprintHash),
    // 有効期限切れになったトークを取得し、削除するためのインデックス
    t.index('refresh_tokens_expired_at_index').on(table.expiredAt),
  ],
)

// ユーザーの個人情報を保持するテーブル
export const sensitiveUserTable = privateSchema.table('sensitive_users',
  {
    id,
    userId: t.uuid('user_id').references(() => userTable.id).notNull(),
    // ユーザーのメールアドレスのハッシュ値（検索用途）
    hashedEmail: t.varchar('hashed_email', { length: 255 }).notNull(),
    // ユーザーのメールアドレスの暗号化された値
    encryptedEmail: t.varchar('encrypted_email', { length: 255 }).notNull(),
  },
  (table) => [
    t.uniqueIndex('user_unique_index').on(table.userId),
    t.uniqueIndex('hashed_email_unique_index').on(table.hashedEmail),
  ]
)

