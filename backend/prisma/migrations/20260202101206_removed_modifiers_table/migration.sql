/*
  Warnings:

  - You are about to drop the `modifiers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "modifiers" DROP CONSTRAINT "modifiers_item_id_fkey";

-- AlterTable
ALTER TABLE "menu_items" ADD COLUMN     "modifiers" JSONB;

-- DropTable
DROP TABLE "modifiers";

-- DropEnum
DROP TYPE "modifier_type";
