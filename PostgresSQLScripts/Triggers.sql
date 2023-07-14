CREATE OR REPLACE FUNCTION generate_unique_product_code()
  RETURNS TRIGGER AS $$
DECLARE
  chars VARCHAR(62) := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  code_length INT := 8; -- Change the code length as per your requirement
  generated_code VARCHAR(255);
BEGIN
  LOOP
    generated_code := '';
    
    -- Generate random alphanumeric code
    FOR i IN 1..code_length LOOP
      generated_code := generated_code || substr(chars, floor(random() * 62)::int + 1, 1);
    END LOOP;
    
    -- Check if the generated code already exists in the products table
    EXIT WHEN NOT EXISTS (
      SELECT 1
      FROM products
      WHERE code = generated_code
      LIMIT 1
    );
  END LOOP;
  
  NEW.code := generated_code;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_unique_product_code_trigger
  BEFORE INSERT ON products
  FOR EACH ROW
  WHEN (NEW.code IS NULL)
  EXECUTE FUNCTION generate_unique_product_code();

