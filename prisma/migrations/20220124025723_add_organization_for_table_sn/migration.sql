/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- AlterTable
ALTER TABLE "SerialNumber" ADD COLUMN "organization" TEXT;

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleName" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "realName" TEXT NOT NULL,
    "role" INTEGER
);
INSERT INTO "new_User" ("email", "id", "phone", "pwd", "realName", "role", "userName") SELECT "email", "id", "phone", "pwd", "realName", "role", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
