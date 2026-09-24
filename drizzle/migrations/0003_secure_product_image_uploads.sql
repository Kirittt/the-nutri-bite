CREATE POLICY "Store admins can view product images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'product-images' AND public.is_store_admin(auth.uid()));

CREATE POLICY "Store admins can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.is_store_admin(auth.uid()));

CREATE POLICY "Store admins can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_store_admin(auth.uid()))
WITH CHECK (bucket_id = 'product-images' AND public.is_store_admin(auth.uid()));

CREATE POLICY "Store admins can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_store_admin(auth.uid()));