/*
  Warnings:

  - A unique constraint covering the columns `[menu_url]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "restaurants_menu_url_key" ON "restaurants"("menu_url");
