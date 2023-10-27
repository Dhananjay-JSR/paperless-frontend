-- CreateTable
CREATE TABLE "StorageEngine" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "languageType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "StorageEngine_pkey" PRIMARY KEY ("id")
);
