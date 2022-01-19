-- CreateTable
CREATE TABLE "SerialNumber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "snType" TEXT,
    "city" TEXT NOT NULL,
    "sn" TEXT NOT NULL,
    "editTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editUser" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "realName" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
