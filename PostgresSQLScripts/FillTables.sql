-- Insert categories
INSERT INTO public.categories (name) VALUES ('Electronics');
INSERT INTO public.categories (name) VALUES ('Apparel');
INSERT INTO public.categories (name) VALUES ('Footwear');

-- Insert subcategories for Electronics
INSERT INTO public.subcategories (name, category_id) VALUES ('TV', 1);
INSERT INTO public.subcategories (name, category_id) VALUES ('Mobile', 1);
INSERT INTO public.subcategories (name, category_id) VALUES ('Refrigerator', 1);

-- Insert subcategories for Apparel
INSERT INTO public.subcategories (name, category_id) VALUES ('Men''s Cloth', 2);
INSERT INTO public.subcategories (name, category_id) VALUES ('Women''s Cloth', 2);

-- Insert subcategories for Footwear
INSERT INTO public.subcategories (name, category_id) VALUES ('Men''s Footwear', 3);
INSERT INTO public.subcategories (name, category_id) VALUES ('Kid''s Footwear', 3);


-- Insert products for Electronics category
INSERT INTO products (code, name, price, description, image_url, quantity, category_id, subcategory_id)
VALUES ('PRD001', 'Smart TV', 999.99, 'High-definition smart TV with built-in apps.', 'https://example.com/tv.jpg', 10, 1, 1);

INSERT INTO products (code, name, price, description, image_url, quantity, category_id, subcategory_id)
VALUES ('PRD002', 'iPhone 12', 1099.99, 'Latest iPhone model with advanced features.', 'https://example.com/iphone.jpg', 5, 1, 2);

INSERT INTO products (code, name, price, description, image_url, quantity, category_id, subcategory_id)
VALUES ('PRD003', 'Refrigerator', 799.99, 'Large capacity refrigerator with energy-saving features.', 'https://example.com/fridge.jpg', 8, 1, 3);

-- Insert products for Apparel category
INSERT INTO products (code, name, price, description, image_url, quantity, category_id, subcategory_id)
VALUES ('PRD004', 'Men''s T-Shirt', 29.99, 'Comfortable and stylish men''s t-shirt.', 'https://example.com/men_tshirt.jpg', 20, 2, 4);

INSERT INTO products (code, name, price, description, image_url, quantity, category_id, subcategory_id)
VALUES ('PRD005', 'Women''s Dress', 49.99, 'Elegant and trendy women''s dress for any occasion.', 'https://example.com/women_dress.jpg', 15, 2, 5);

-- Insert products for Footwear category
INSERT INTO products (code, name, price, description, image_url, quantity, category_id, subcategory_id)
VALUES ('PRD006', 'Men''s Shoes', 79.99, 'Stylish and comfortable men''s shoes for daily wear.', 'https://example.com/men_shoes.jpg', 12, 3, 6);

INSERT INTO products (code, name, price, description, image_url, quantity, category_id, subcategory_id)
VALUES ('PRD007', 'Kid''s Sneakers', 39.99, 'Colorful and durable sneakers for kids.', 'https://example.com/kids_sneakers.jpg', 18, 3, 7);
