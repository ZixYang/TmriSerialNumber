/*
  Warnings:

  - Added the required column `pwd` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "realName" TEXT NOT NULL,
    "role" TEXT
);
INSERT INTO "new_User" ("email", "id", "phone", "realName", "role", "userName") SELECT "email", "id", "phone", "realName", "role", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
