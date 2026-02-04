/*
  Warnings:

  - You are about to drop the column `image_url` on the `restaurants` table. All the data in the column will be lost.
  - Added the required column `menu_url` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "image_url",
ADD COLUMN     "menu_url" VARCHAR(255) NOT NULL;
