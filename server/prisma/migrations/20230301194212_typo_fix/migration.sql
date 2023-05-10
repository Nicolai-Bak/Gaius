/*
  Warnings:

  - You are about to drop the column `isComplete` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isComplete",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
