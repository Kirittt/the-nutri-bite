CREATE OR REPLACE FUNCTION public.claim_admin_invitation(_token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  invitation public.admin_invitations%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  SELECT * INTO invitation
  FROM public.admin_invitations
  WHERE token_hash = encode(digest(_token, 'sha256'), 'hex')
    AND used_at IS NULL
    AND expires_at > now()
  FOR UPDATE;

  IF invitation.id IS NULL THEN
    RETURN false;
  END IF;

  INSERT INTO public.user_roles(user_id, role)
  VALUES (auth.uid(), invitation.role)
  ON CONFLICT (user_id, role) DO NOTHING;

  UPDATE public.admin_invitations
  SET used_at = now(), used_by = auth.uid()
  WHERE id = invitation.id;

  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_admin_invitation(text) TO authenticated;