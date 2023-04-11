/*
  Warnings:

  - Added the required column `Descricao` to the `Manutencao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manutencao" ADD COLUMN     "Descricao" TEXT NOT NULL;
