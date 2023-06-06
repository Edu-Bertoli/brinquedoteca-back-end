/*
  Warnings:

  - You are about to drop the column `id_brinquedo` on the `Reserva` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_id_brinquedo_fkey";

-- AlterTable
ALTER TABLE "CadastroBrinquedo" ADD COLUMN     "id_reserva" INTEGER;

-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "id_brinquedo";

-- AddForeignKey
ALTER TABLE "CadastroBrinquedo" ADD CONSTRAINT "CadastroBrinquedo_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "Reserva"("id_reserva") ON DELETE SET NULL ON UPDATE CASCADE;
