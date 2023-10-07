/*
  Warnings:

  - Added the required column `city` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;
