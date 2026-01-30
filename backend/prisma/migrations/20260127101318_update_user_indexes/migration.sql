/*
  Warnings:

  - Made the column `cognito_sub` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_restaurant_id_idx";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cognito_sub" SET NOT NULL;
