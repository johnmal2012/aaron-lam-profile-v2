import { relations } from 'drizzle-orm';
import { user, session, account } from '@/db/schema/auth-schema';
import { physicianProfile } from '@/db/schema/physician-profile';

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  physicianProfiles: many(physicianProfile),
}));

export const physicianProfileRelations = relations(
  physicianProfile,
  ({ one }) => ({
    user: one(user, {
      fields: [physicianProfile.userId],
      references: [user.id],
    }),
  }),
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));