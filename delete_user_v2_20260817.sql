-- Check the user before deleting
SELECT
    "id",
    "name",
    "email",
    "role"
FROM "user"
WHERE "id" = 'USER_ID_HERE';

BEGIN;
-- Delete sessions
DELETE FROM "session"
WHERE "userId" = 'USER_ID_HERE';

-- Delete OAuth / authentication accounts
DELETE FROM "account"
WHERE "userId" = 'USER_ID_HERE';

-- Delete user.
-- physician_profile is automatically deleted by ON DELETE CASCADE.
DELETE FROM "user"
WHERE "id" = 'USER_ID_HERE';

COMMIT;