/*
  Warnings:

  - You are about to drop the column `id_reserva` on the `CadastroBrinquedo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CadastroBrinquedo" DROP CONSTRAINT "CadastroBrinquedo_id_reserva_fkey";

-- AlterTable
ALTER TABLE "CadastroBrinquedo" DROP COLUMN "id_reserva";

-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "Acionado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id_brinquedo" INTEGER;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_brinquedo_fkey" FOREIGN KEY ("id_brinquedo") REFERENCES "CadastroBrinquedo"("id_brinquedo") ON DELETE SET NULL ON UPDATE CASCADE;
