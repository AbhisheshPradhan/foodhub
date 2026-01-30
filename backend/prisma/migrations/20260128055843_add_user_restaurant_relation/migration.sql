/*
  Warnings:

  - You are about to drop the column `restaurant_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "restaurant_id",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "user_restaurants" (
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_restaurants_pkey" PRIMARY KEY ("userId","restaurantId")
);

-- AddForeignKey
ALTER TABLE "user_restaurants" ADD CONSTRAINT "user_restaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_restaurants" ADD CONSTRAINT "user_restaurants_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;
