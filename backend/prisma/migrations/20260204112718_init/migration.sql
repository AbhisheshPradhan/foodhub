-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "cognito_sub" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "restaurant_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "phone" VARCHAR(20),
    "email" VARCHAR(100),
    "website" VARCHAR(255),
    "facebook" VARCHAR(100),
    "instagram" VARCHAR(100),
    "tiktok" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateTable
CREATE TABLE "user_restaurants" (
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editor',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_restaurants_pkey" PRIMARY KEY ("userId","restaurantId")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "item_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "image_url" VARCHAR(500),
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "is_vegetarian" BOOLEAN NOT NULL DEFAULT false,
    "is_vegan" BOOLEAN NOT NULL DEFAULT false,
    "is_gluten_free" BOOLEAN NOT NULL DEFAULT false,
    "is_spicy" BOOLEAN NOT NULL DEFAULT false,
    "spice_level" SMALLINT NOT NULL DEFAULT 0,
    "calories" INTEGER,
    "preparation_time" INTEGER,
    "servings" VARCHAR(50),
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "modifiers" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "allergens" (
    "allergen_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "allergens_pkey" PRIMARY KEY ("allergen_id")
);

-- CreateTable
CREATE TABLE "menu_item_allergens" (
    "item_id" INTEGER NOT NULL,
    "allergen_id" INTEGER NOT NULL,

    CONSTRAINT "menu_item_allergens_pkey" PRIMARY KEY ("item_id","allergen_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cognito_sub_key" ON "users"("cognito_sub");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_restaurant_order" ON "categories"("restaurant_id", "display_order");

-- CreateIndex
CREATE INDEX "idx_category_order" ON "menu_items"("category_id", "display_order");

-- CreateIndex
CREATE INDEX "idx_availability" ON "menu_items"("is_available");

-- CreateIndex
CREATE INDEX "idx_menu_items_name" ON "menu_items"("name");

-- CreateIndex
CREATE INDEX "idx_dietary_filters" ON "menu_items"("is_vegetarian", "is_vegan", "is_gluten_free");

-- CreateIndex
CREATE UNIQUE INDEX "allergens_name_key" ON "allergens"("name");

-- AddForeignKey
ALTER TABLE "user_restaurants" ADD CONSTRAINT "user_restaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_restaurants" ADD CONSTRAINT "user_restaurants_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_allergens" ADD CONSTRAINT "menu_item_allergens_allergen_id_fkey" FOREIGN KEY ("allergen_id") REFERENCES "allergens"("allergen_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_allergens" ADD CONSTRAINT "menu_item_allergens_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "menu_items"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;
