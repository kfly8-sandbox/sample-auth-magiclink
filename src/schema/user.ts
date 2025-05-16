import * as t from 'drizzle-orm/pg-core';

import type { UserId } from '../domain'
import { id, createdAt, updatedAt } from './helper';

// ユーザーテーブル
export const userTable = t.pgTable('users',
  {
    id: t.uuid('id').$type<UserId>().primaryKey(),

    // ----- 他者に表示するプロフィール情報 -----
    // ユーザー名
    name: t.varchar('name', { length: 255 }).notNull(),
    // アイコン画像のURL
    iconUrl: t.varchar('icon_url', { length: 255 }),
    // 自己紹介文
    biography: t.text('biography'),

    // ----- システム設定 -----
    // 利用言語
    language: t.varchar('language', { length: 255 }).notNull().$type<'ja' | 'en'>(),

    createdAt,
    updatedAt,
  }
)

// ユーザーが利用しているデバイスの情報
// 利用例:
// - 普段と異なるデバイスでサービスを利用しようとした場合に、ユーザーに通知を行う
export const userDeviceTable = t.pgTable('user_devices',
  {
    id,
    userId: t.uuid('user_id').references(() => userTable.id).notNull(),
    deviceFingerprintHash: t.varchar('device_fingerprint_hash', { length: 255 }).notNull(),

    createdAt,
    updatedAt,
  },
  (table) => [
    t.uniqueIndex('user_device_unique_index').on(table.userId, table.deviceFingerprintHash),
  ]
)

