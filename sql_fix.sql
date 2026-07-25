-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the staff table if it doesn't exist
CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Insert the default admin user if not exists (username: admin, password: admin123)
INSERT INTO staff (username, password_hash)
SELECT 'admin', '$2b$10$OHWn8chjYNyXFngMlQBIeeWkXLxJhuT4gHrGT2e1LSiKlXbxbVE2e'
WHERE NOT EXISTS (
    SELECT 1 FROM staff WHERE username = 'admin'
);

-- Create the RPC function for login that works serverless
CREATE OR REPLACE FUNCTION admin_login(p_username TEXT, p_password TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_staff RECORD;
BEGIN
  -- Find the user
  SELECT * INTO v_staff
  FROM staff
  WHERE username = p_username;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Invalid mobile number or password');
  END IF;

  -- Verify password. We replace $2b$ with $2a$ because pgcrypto uses $2a$ for bcrypt.
  IF crypt(p_password, replace(v_staff.password_hash, '$2b$', '$2a$')) = replace(v_staff.password_hash, '$2b$', '$2a$') THEN
    RETURN json_build_object(
      'success', true,
      'token', 'admin-token-' || v_staff.id || '-' || extract(epoch from now()),
      'user', json_build_object('id', v_staff.id, 'username', v_staff.username)
    );
  ELSE
    RETURN json_build_object('success', false, 'message', 'Invalid mobile number or password');
  END IF;
END;
$$;
