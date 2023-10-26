-- CreateTable
CREATE TABLE "StorageEngine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "languageType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "password" TEXT
);
