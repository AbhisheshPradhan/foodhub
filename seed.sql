-- ============================================
-- POSTGRESQL DUMMY DATA INSERT SCRIPT
-- Run this in pgAdmin after creating your tables
-- ============================================

-- Clear existing data and reset sequences
TRUNCATE TABLE menu_item_allergens, modifiers, allergens, menu_items, categories, restaurants RESTART IDENTITY CASCADE;



-- ============================================
-- INSERT RESTAURANTS
-- ============================================

INSERT INTO restaurants (name, address, phone, email, website, created_at, updated_at) VALUES
('The Golden Spoon', '123 Main Street, Downtown', '555-0100', 'info@goldenspoon.com', 'www.goldenspoon.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bella Italia', '456 Oak Avenue, Westside', '555-0200', 'contact@bellaitalia.com', 'www.bellaitalia.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Spice Garden', '789 Elm Street, Uptown', '555-0300', 'hello@spicegarden.com', 'www.spicegarden.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ocean Blue Seafood', '321 Harbor Drive, Waterfront', '555-0400', 'info@oceanblue.com', 'www.oceanblue.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Green Leaf Cafe', '654 Park Avenue, Midtown', '555-0500', 'contact@greenleaf.com', 'www.greenleaf.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- INSERT USERS
-- ============================================
INSERT INTO users (email, password, name, restaurant_id, is_active, created_at, updated_at) VALUES
('user1@gmail.com', '1234', 'User 1', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user2@gmail.com', '1234', 'User 2', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user3@gmail.com', '1234', 'User 3', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user4@gmail.com', '1234', 'User 4', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user5@gmail.com', '1234', 'User 5', 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- INSERT CATEGORIES
-- ============================================

-- Categories for The Golden Spoon (restaurant_id = 1)
INSERT INTO categories (restaurant_id, name, description, display_order, is_active) VALUES
(1, 'Appetizers', 'Start your meal with these delicious starters', 1, true),
(1, 'Main Courses', 'Our signature entrees', 2, true),
(1, 'Desserts', 'Sweet endings to your perfect meal', 3, true),
(1, 'Beverages', 'Refreshing drinks and specialty beverages', 4, true);

-- Categories for Bella Italia (restaurant_id = 2)
INSERT INTO categories (restaurant_id, name, description, display_order, is_active) VALUES
(2, 'Antipasti', 'Traditional Italian appetizers', 1, true),
(2, 'Pasta', 'Handmade pasta dishes', 2, true),
(2, 'Pizza', 'Wood-fired authentic pizzas', 3, true),
(2, 'Dolci', 'Italian desserts', 4, true);

-- Categories for Spice Garden (restaurant_id = 3)
INSERT INTO categories (restaurant_id, name, description, display_order, is_active) VALUES
(3, 'Starters', 'Indian street food and appetizers', 1, true),
(3, 'Curries', 'Authentic curry dishes', 2, true),
(3, 'Tandoor Specials', 'Clay oven specialties', 3, true),
(3, 'Breads', 'Freshly baked Indian breads', 4, true);

-- Categories for Ocean Blue Seafood (restaurant_id = 4)
INSERT INTO categories (restaurant_id, name, description, display_order, is_active) VALUES
(4, 'Raw Bar', 'Fresh oysters and shellfish', 1, true),
(4, 'Catch of the Day', 'Daily fresh fish selections', 2, true),
(4, 'Seafood Platters', 'Combination platters', 3, true);

-- Categories for Green Leaf Cafe (restaurant_id = 5)
INSERT INTO categories (restaurant_id, name, description, display_order, is_active) VALUES
(5, 'Smoothie Bowls', 'Healthy acai and fruit bowls', 1, true),
(5, 'Salads', 'Fresh organic salads', 2, true),
(5, 'Vegan Mains', 'Plant-based entrees', 3, true);

-- ============================================
-- INSERT ALLERGENS
-- ============================================

INSERT INTO allergens (name, description, icon) VALUES
('Dairy', 'Contains milk, cheese, or dairy products', '🥛'),
('Eggs', 'Contains eggs or egg products', '🥚'),
('Fish', 'Contains fish or fish products', '🐟'),
('Shellfish', 'Contains shellfish like shrimp, crab, lobster', '🦐'),
('Tree Nuts', 'Contains almonds, walnuts, cashews, etc.', '🌰'),
('Peanuts', 'Contains peanuts or peanut products', '🥜'),
('Wheat', 'Contains wheat or gluten', '🌾'),
('Soy', 'Contains soy or soy products', '🫘'),
('Sesame', 'Contains sesame seeds or oil', '🫘'),
('Mustard', 'Contains mustard or mustard seeds', '🌶️');

-- ============================================
-- INSERT MENU ITEMS - The Golden Spoon
-- ============================================

-- Appetizers (category_id = 1)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_gluten_free, is_spicy, spice_level, calories, preparation_time, display_order, created_at, updated_at) VALUES
(1, 'Bruschetta', 'Toasted bread topped with fresh tomatoes, basil, and garlic', 8.99, true, true, false, false, 0, 180, 10, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Calamari Fritti', 'Crispy fried calamari served with marinara sauce', 12.99, false, false, false, false, 0, 320, 12, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Spinach Artichoke Dip', 'Creamy spinach and artichoke dip with tortilla chips', 10.99, true, false, true, false, 0, 420, 8, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Buffalo Wings', 'Spicy chicken wings with blue cheese dressing', 11.99, false, false, true, true, 3, 580, 15, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Caprese Salad', 'Fresh mozzarella, tomatoes, and basil with balsamic glaze', 9.99, true, false, true, false, 0, 220, 8, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Main Courses (category_id = 2)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_spicy, spice_level, calories, preparation_time, display_order, created_at, updated_at) VALUES
(2, 'Grilled Salmon', 'Atlantic salmon with lemon butter sauce and seasonal vegetables', 24.99, false, false, 0, 450, 20, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Chicken Tikka Masala', 'Tender chicken in a creamy tomato-based curry sauce', 18.99, false, true, 3, 580, 25, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Vegetable Stir Fry', 'Seasonal vegetables in a savory garlic sauce over rice', 15.99, true, false, 0, 380, 15, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Ribeye Steak', '12oz ribeye steak cooked to perfection with mashed potatoes', 32.99, false, false, 0, 720, 25, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Mushroom Risotto', 'Creamy arborio rice with wild mushrooms and parmesan', 19.99, true, false, 0, 520, 30, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Desserts (category_id = 3)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, calories, preparation_time, display_order, created_at, updated_at) VALUES
(3, 'Chocolate Lava Cake', 'Warm chocolate cake with a molten center, served with vanilla ice cream', 8.99, true, 520, 12, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Tiramisu', 'Classic Italian dessert with espresso-soaked ladyfingers', 7.99, true, 380, 5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Fresh Fruit Tart', 'Seasonal fresh fruits on a buttery tart shell', 6.99, true, 280, 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Crème Brûlée', 'Vanilla custard with caramelized sugar topping', 8.49, true, 310, 8, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Beverages (category_id = 4)
INSERT INTO menu_items (category_id, name, description, price, is_vegan, calories, display_order, created_at, updated_at) VALUES
(4, 'Fresh Squeezed Orange Juice', '100% fresh orange juice', 4.99, true, 120, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Iced Coffee', 'Cold brew coffee served over ice', 3.99, true, 5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Mango Smoothie', 'Blended mango with yogurt and honey', 5.99, false, 220, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Sparkling Water', 'San Pellegrino sparkling mineral water', 2.99, true, 0, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- INSERT MENU ITEMS - Bella Italia
-- ============================================

-- Antipasti (category_id = 5)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_gluten_free, calories, preparation_time, display_order, created_at, updated_at) VALUES
(5, 'Prosciutto e Melone', 'Italian cured ham with fresh cantaloupe', 13.99, false, true, 180, 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Arancini', 'Crispy fried risotto balls with mozzarella', 9.99, true, false, 340, 10, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Burrata', 'Creamy burrata cheese with cherry tomatoes and basil', 14.99, true, true, 280, 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pasta (category_id = 6)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, calories, preparation_time, servings, display_order, created_at, updated_at) VALUES
(6, 'Spaghetti Carbonara', 'Classic Roman pasta with eggs, pecorino, and guanciale', 16.99, false, 620, 18, 'Serves 1', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Fettuccine Alfredo', 'Fresh fettuccine in creamy parmesan sauce', 15.99, true, 740, 15, 'Serves 1', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Penne Arrabbiata', 'Spicy tomato sauce with garlic and chili peppers', 14.99, true, 480, 15, 'Serves 1', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Lasagna Bolognese', 'Layered pasta with meat sauce and béchamel', 18.99, false, 680, 25, 'Serves 1', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pizza (category_id = 7)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, servings, preparation_time, display_order, created_at, updated_at) VALUES
(7, 'Margherita Pizza', 'San Marzano tomatoes, fresh mozzarella, basil', 14.99, true, 'Serves 2', 18, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Pepperoni Pizza', 'Tomato sauce, mozzarella, pepperoni', 16.99, false, 'Serves 2', 18, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Quattro Formaggi', 'Four cheese pizza with gorgonzola, parmesan, mozzarella, fontina', 17.99, true, 'Serves 2', 18, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Diavola Pizza', 'Spicy salami, mozzarella, chili oil', 16.99, false, 'Serves 2', 18, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Dolci (category_id = 8)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, calories, display_order, created_at, updated_at) VALUES
(8, 'Panna Cotta', 'Italian cream pudding with berry compote', 7.99, true, 320, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Cannoli', 'Crispy pastry shells filled with sweet ricotta', 6.99, true, 380, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Gelato', 'Italian ice cream - ask for daily flavors', 5.99, true, 220, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- INSERT MENU ITEMS - Spice Garden
-- ============================================

-- Starters (category_id = 9)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_spicy, spice_level, calories, preparation_time, display_order, created_at, updated_at) VALUES
(9, 'Samosa', 'Crispy pastry filled with spiced potatoes and peas', 6.99, true, true, true, 2, 280, 10, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Chicken 65', 'Spicy fried chicken with curry leaves', 9.99, false, false, true, 4, 420, 15, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Paneer Tikka', 'Grilled cottage cheese marinated in spices', 10.99, true, false, true, 2, 340, 18, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Curries (category_id = 10)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_spicy, spice_level, calories, preparation_time, display_order, created_at, updated_at) VALUES
(10, 'Butter Chicken', 'Tender chicken in a creamy tomato sauce', 16.99, false, false, true, 2, 580, 25, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Palak Paneer', 'Cottage cheese in spinach curry', 14.99, true, false, true, 1, 420, 20, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Lamb Rogan Josh', 'Slow-cooked lamb in aromatic Kashmiri sauce', 19.99, false, false, true, 3, 620, 35, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Chana Masala', 'Chickpeas in spicy tomato-onion gravy', 13.99, true, true, true, 2, 380, 20, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tandoor Specials (category_id = 11)
INSERT INTO menu_items (category_id, name, description, price, is_gluten_free, is_spicy, spice_level, calories, preparation_time, display_order, created_at, updated_at) VALUES
(11, 'Tandoori Chicken', 'Half chicken marinated in yogurt and spices', 17.99, true, true, 3, 520, 30, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Seekh Kebab', 'Minced lamb kebabs with herbs and spices', 15.99, true, true, 2, 480, 25, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Tandoori Prawns', 'Jumbo prawns marinated and grilled', 21.99, true, true, 2, 380, 20, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Breads (category_id = 12)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, calories, display_order, created_at, updated_at) VALUES
(12, 'Naan', 'Traditional leavened flatbread', 2.99, true, false, 220, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Garlic Naan', 'Naan topped with garlic and cilantro', 3.49, true, false, 250, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Roti', 'Whole wheat flatbread', 2.49, true, true, 180, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Paratha', 'Layered whole wheat bread', 3.99, true, false, 290, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- INSERT MENU ITEMS - Ocean Blue Seafood
-- ============================================

-- Raw Bar (category_id = 13)
INSERT INTO menu_items (category_id, name, description, price, is_gluten_free, calories, servings, display_order, created_at, updated_at) VALUES
(13, 'Fresh Oysters', 'Daily selection of fresh oysters on the half shell', 18.99, true, 120, 'Half dozen', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Shrimp Cocktail', 'Jumbo shrimp with cocktail sauce', 16.99, true, 180, '6 pieces', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Ceviche', 'Fresh fish marinated in citrus with cilantro', 14.99, true, 220, 'Serves 1', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Catch of the Day (category_id = 14)
INSERT INTO menu_items (category_id, name, description, price, is_gluten_free, calories, preparation_time, display_order, created_at, updated_at) VALUES
(14, 'Grilled Mahi Mahi', 'Fresh mahi mahi with mango salsa', 26.99, true, 380, 22, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Pan Seared Scallops', 'Diver scallops with lemon butter', 29.99, true, 320, 18, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Blackened Swordfish', 'Cajun spiced swordfish with vegetables', 28.99, true, 420, 20, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Lobster Tail', '8oz cold water lobster tail', 42.99, true, 280, 25, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seafood Platters (category_id = 15)
INSERT INTO menu_items (category_id, name, description, price, calories, servings, preparation_time, display_order, created_at, updated_at) VALUES
(15, 'Fisherman''s Platter', 'Fried fish, shrimp, scallops, and calamari', 32.99, 920, 'Serves 2', 25, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Surf and Turf', '6oz filet mignon and lobster tail', 54.99, 780, 'Serves 1', 30, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- INSERT MENU ITEMS - Green Leaf Cafe
-- ============================================

-- Smoothie Bowls (category_id = 16)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_gluten_free, calories, display_order, created_at, updated_at) VALUES
(16, 'Acai Bowl', 'Organic acai with granola, banana, and berries', 11.99, true, true, false, 380, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Dragon Fruit Bowl', 'Pink pitaya with coconut, kiwi, and chia seeds', 12.99, true, true, true, 340, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Green Goddess Bowl', 'Spinach, mango, and spirulina with toppings', 11.99, true, true, true, 320, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Salads (category_id = 17)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_gluten_free, calories, display_order, created_at, updated_at) VALUES
(17, 'Kale Caesar', 'Organic kale with vegan caesar dressing and tempeh', 13.99, true, true, true, 380, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Rainbow Buddha Bowl', 'Quinoa, roasted vegetables, tahini dressing', 14.99, true, true, true, 420, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Mediterranean Chickpea Salad', 'Chickpeas, cucumber, tomato, olives, lemon dressing', 12.99, true, true, true, 360, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Vegan Mains (category_id = 18)
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_gluten_free, calories, preparation_time, display_order, created_at, updated_at) VALUES
(18, 'Jackfruit Tacos', 'BBQ jackfruit with avocado and slaw', 15.99, true, true, false, 480, 15, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Cauliflower Steak', 'Roasted cauliflower with chimichurri', 16.99, true, true, true, 320, 20, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Lentil Bolognese', 'Red lentils in tomato sauce over zucchini noodles', 14.99, true, true, true, 380, 18, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- INSERT ALLERGEN RELATIONSHIPS
-- ============================================

-- The Golden Spoon items
-- Bruschetta (item_id = 1) - Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (1, 7);

-- Calamari (item_id = 2) - Shellfish, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (2, 4), (2, 7);

-- Spinach Artichoke Dip (item_id = 3) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (3, 1);

-- Buffalo Wings (item_id = 4) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (4, 1);

-- Caprese Salad (item_id = 5) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (5, 1);

-- Grilled Salmon (item_id = 6) - Fish, Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (6, 3), (6, 1);

-- Chicken Tikka Masala (item_id = 7) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (7, 1);

-- Mushroom Risotto (item_id = 10) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (10, 1);

-- Chocolate Lava Cake (item_id = 11) - Dairy, Eggs, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (11, 1), (11, 2), (11, 7);

-- Tiramisu (item_id = 12) - Dairy, Eggs, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (12, 1), (12, 2), (12, 7);

-- Fresh Fruit Tart (item_id = 13) - Dairy, Eggs, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (13, 1), (13, 2), (13, 7);

-- Crème Brûlée (item_id = 14) - Dairy, Eggs
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (14, 1), (14, 2);

-- Mango Smoothie (item_id = 16) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (16, 1);

-- Bella Italia items
-- Arancini (item_id = 19) - Dairy, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (19, 1), (19, 7);

-- Burrata (item_id = 20) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (20, 1);

-- All Pasta items - Dairy, Eggs, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES 
(21, 1), (21, 2), (21, 7),
(22, 1), (22, 2), (22, 7),
(23, 1), (23, 2), (23, 7),
(24, 1), (24, 2), (24, 7);

-- All Pizza items - Dairy, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES 
(25, 1), (25, 7),
(26, 1), (26, 7),
(27, 1), (27, 7),
(28, 1), (28, 7);

-- Dolci - Dairy, Eggs, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES 
(29, 1), (29, 2),
(30, 1), (30, 2), (30, 7),
(31, 1), (31, 2);

-- Spice Garden items
-- Samosa (item_id = 32) - Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (32, 7);

-- Paneer Tikka (item_id = 34) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (34, 1);

-- Butter Chicken (item_id = 35) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (35, 1);

-- Palak Paneer (item_id = 36) - Dairy
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (36, 1);

-- Naan and Garlic Naan - Dairy, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES 
(42, 1), (42, 7),
(43, 1), (43, 7);

-- Roti (item_id = 44) - Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (44, 7);

-- Paratha (item_id = 45) - Dairy, Wheat
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES (45, 1), (45, 7);

-- Ocean Blue Seafood items
-- All seafood items - Shellfish or Fish
INSERT INTO menu_item_allergens (item_id, allergen_id) VALUES 
(46, 4),  -- Oysters
(47, 4),  -- Shrimp
(48, 3),  -- Ceviche
(49, 3),  -- Mahi Mahi
(50, 4),  -- Scallops
(51, 3),  -- Swordfish
(52, 4),  -- Lobster
(53, 3),  -- Fisherman's Platter (fish)
(53, 4),  -- Fisherman's Platter (shellfish)
(54, 4);  -- Surf and Turf (lobster)

-- ============================================
-- INSERT MODIFIERS
-- ============================================

-- Modifiers for Grilled Salmon (item_id = 6)
INSERT INTO modifiers (item_id, name, description, price_adjustment, modifier_type, is_available, display_order) VALUES
(6, 'Extra Vegetables', 'Double portion of seasonal vegetables', 3.00, 'addon', true, 1),
(6, 'Add Shrimp', 'Grilled shrimp skewer', 6.00, 'addon', true, 2),
(6, 'Substitute Rice', 'Replace vegetables with rice pilaf', 0.00, 'substitution', true, 3);

-- Modifiers for Ribeye Steak (item_id = 9)
INSERT INTO modifiers (item_id, name, description, price_adjustment, modifier_type, is_available, display_order) VALUES
(9, 'Add Lobster Tail', '6oz lobster tail', 12.00, 'addon', true, 1),
(9, 'Peppercorn Sauce', 'Creamy peppercorn sauce', 2.50, 'addon', true, 2),
(9, 'Make it Oscar Style', 'Topped with crab, asparagus, and béarnaise', 8.00, 'preparation', true, 3),
(9, 'Upgrade to 16oz', 'Larger cut', 8.00, 'size', true, 4);

-- Modifiers for Iced Coffee (item_id = 15)
INSERT INTO modifiers (item_id, name, description, price_adjustment, modifier_type, is_available, display_order) VALUES
(15, 'Add Espresso Shot', 'Extra caffeine boost', 1.50, 'addon', true, 1),
(15, 'Add Flavor Syrup', 'Vanilla, caramel, or hazelnut', 0.75, 'addon', true, 2),
(15, 'Oat Milk', 'Substitute with oat milk', 0.50, 'substitution', true, 3);

-- Modifiers for Margherita Pizza (item_id = 25)
INSERT INTO modifiers (item_id, name, description, price_adjustment, modifier_type, is_available, display_order) VALUES
(25, 'Extra Cheese', 'Additional mozzarella', 2.00, 'addon', true, 1),
(25, 'Add Prosciutto', 'Italian cured ham', 4.00, 'addon', true, 2),
(25, 'Gluten-Free Crust', 'Substitute with gluten-free crust', 3.00, 'substitution', true, 3),
(25, 'Add Fresh Burrata', 'Creamy burrata cheese', 5.00, 'addon', true, 4);

-- Modifiers for Pepperoni Pizza (item_id = 26)
INSERT INTO modifiers (item_id, name, description, price_adjustment, modifier_type, is_available, display_order) VALUES
(26, 'Extra Pepperoni', 'Double pepperoni', 2.50, 'addon', true, 1),
(26, 'Add Mushrooms', 'Fresh mushrooms', 2.00, 'addon', true, 2),
(26, 'Gluten-Free Crust', 'Substitute with gluten-free crust', 3.00, 'substitution', true, 3);

-- Modifiers for Butter Chicken (item_id = 35)
INSERT INTO modifiers (item_id, name, description, price_adjustment, modifier_type, is_available, display_order) VALUES
(35, 'Extra Spicy', 'Increase spice level', 0.00, 'preparation', true, 1),
(35, 'Add Naan', 'Include garlic naan', 3.49, 'addon', true, 2),
(35, 'Add Rice', 'Basmati rice', 2.99, 'addon', true, 3);

-- Modifiers for Acai Bowl (item_id = 55)
INSERT INTO modifiers (item_id, name, description, price_adjustment, modifier_type, is_available, display_order) VALUES
(55, 'Add Protein Powder', 'Plant-based protein', 2.00, 'addon', true, 1),
(55, 'Add Almond Butter', 'Organic almond butter drizzle', 1.50, 'addon', true, 2),
(55, 'Extra Granola', 'Double granola portion', 1.00, 'addon', true, 3),
(55, 'Substitute Gluten-Free Granola', 'GF granola option', 1.50, 'substitution', true, 4);

-- ============================================
-- VERIFICATION QUERIES (Optional - comment these out before running)
-- ============================================

-- Check total counts
-- SELECT 'Restaurants' as table_name, COUNT(*) as count FROM restaurants
-- UNION ALL SELECT 'Categories', COUNT(*) FROM categories
-- UNION ALL SELECT 'Menu Items', COUNT(*) FROM menu_items
-- UNION ALL SELECT 'Allergens', COUNT(*) FROM allergens
-- UNION ALL SELECT 'Menu Item Allergens', COUNT(*) FROM menu_item_allergens
-- UNION ALL SELECT 'Modifiers', COUNT(*) FROM modifiers;

-- Check items per restaurant
-- SELECT r.name, COUNT(mi.item_id) as item_count
-- FROM restaurants r
-- LEFT JOIN categories c ON r.restaurant_id = c.restaurant_id
-- LEFT JOIN menu_items mi ON c.category_id = mi.category_id
-- GROUP BY r.restaurant_id, r.name
-- ORDER BY r.restaurant_id;
