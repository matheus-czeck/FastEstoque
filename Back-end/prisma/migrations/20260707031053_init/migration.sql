/*
  Warnings:

  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Produtos" DROP CONSTRAINT "Produtos_created_by_fkey";

-- DropTable
DROP TABLE "Usuarios";
