-- CreateTable
CREATE TABLE "cameras" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cameraId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tsStart" DATETIME NOT NULL,
    "tsEnd" DATETIME,
    "thumbnailUrl" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "incidents_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "cameras" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
