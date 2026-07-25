CREATE OR REPLACE FUNCTION get_admin_submissions(p_token TEXT)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_readiness json;
  v_consults json;
BEGIN
  IF p_token NOT LIKE 'admin-token-%' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT COALESCE(json_agg(r), '[]'::json) INTO v_readiness
  FROM (
    SELECT * FROM readiness_tests ORDER BY created_at DESC
  ) r;

  SELECT COALESCE(json_agg(c), '[]'::json) INTO v_consults
  FROM (
    SELECT * FROM consultations ORDER BY created_at DESC
  ) c;

  RETURN json_build_object('readiness', v_readiness, 'consults', v_consults);
END;
$$;
