-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ocupado', 'Venda', 'Locacao');

-- AlterTable
ALTER TABLE "Apartments" ADD COLUMN     "status" "Status"[];
