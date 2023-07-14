CREATE OR REPLACE FUNCTION get_categories_with_subcategories()
  RETURNS JSON
AS
$$
DECLARE
  result JSON;
BEGIN
  SELECT json_agg(categories) INTO result
  FROM (
    SELECT
      c.id AS category_id,
      c.name AS category_name,
      (
        SELECT json_agg(subcategories)
        FROM (
          SELECT
            sc.id AS subcategory_id,
            sc.name AS subcategory_name
          FROM
            public.subcategories sc
          WHERE
            sc.category_id = c.id
        ) AS subcategories
      ) AS subcategories
    FROM
      public.categories c
  ) AS categories;
  
  RETURN result;
END;
$$
LANGUAGE plpgsql;
