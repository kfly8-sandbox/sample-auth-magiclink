import * as t from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7'

export const privateSchema = t.pgSchema('private'); // 個人情報などの機密情報を保持するスキーマ

export const id = t.uuid('id').primaryKey().$defaultFn(() => uuidv7());
export const createdAt = t.timestamp("created_at").notNull().defaultNow(); // レコードの作成日時
export const updatedAt = t.timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()); // レコードの更新日時
