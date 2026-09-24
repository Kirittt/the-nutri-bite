import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { deleteProductImage, updateProductGallery } from "@/lib/store.functions";

type ProductImageManagerProps = {
  productId: string;
  productName: string;
  productSlug: string;
  paths: string[];
  previewUrls: string[];
  onSaved: () => void;
};

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 8 * 1024 * 1024;

export function ProductImageManager({ productId, productName, productSlug, paths, previewUrls, onSaved }: ProductImageManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const saveOrder = async (nextPaths: string[]) => {
    setBusy(true);
    try {
      await updateProductGallery({ data: { id: productId, paths: nextPaths } });
      onSaved();
    } catch {
      toast.error("The image order could not be saved.");
    } finally {
      setBusy(false);
    }
  };

  const move = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= paths.length) return;
    const next = [...paths];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    void saveOrder(next);
  };

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    const selected = Array.from(files);
    if (paths.length + selected.length > 12) {
      toast.error("Each product can have up to 12 images.");
      return;
    }
    const invalid = selected.find((file) => !allowedTypes.has(file.type) || file.size > maxFileSize);
    if (invalid) {
      toast.error("Use JPG, PNG or WebP images up to 8 MB each.");
      return;
    }

    setBusy(true);
    const uploadedPaths: string[] = [];
    try {
      for (const file of selected) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${productSlug}/${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, {
          cacheControl: "31536000",
          contentType: file.type,
          upsert: false,
        });
        if (error) throw error;
        uploadedPaths.push(path);
      }
      await updateProductGallery({ data: { id: productId, paths: [...paths, ...uploadedPaths] } });
      toast.success(`${selected.length} image${selected.length === 1 ? "" : "s"} uploaded for ${productName}`);
      onSaved();
    } catch {
      if (uploadedPaths.length) await supabase.storage.from("product-images").remove(uploadedPaths);
      toast.error("The images could not be uploaded.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
      setBusy(false);
    }
  };

  const remove = async (path: string) => {
    setBusy(true);
    try {
      await deleteProductImage({ data: { id: productId, path } });
      toast.success("Image removed");
      onSaved();
    } catch {
      toast.error("The image could not be removed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Product images</p>
          <p className="text-xs text-muted-foreground">The first image is the main photo. Maximum 12.</p>
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => void upload(event.target.files)} />
        <Button type="button" size="sm" variant="outline" disabled={busy || paths.length >= 12} onClick={() => inputRef.current?.click()}>
          {busy ? <Loader2 className="animate-spin" /> : <ImagePlus />} Upload images
        </Button>
      </div>
      {paths.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {paths.map((path, index) => (
            <div key={path} className="overflow-hidden rounded-md border border-border bg-muted">
              <div className="relative aspect-square">
                <img src={previewUrls[index]} alt={`${productName} image ${index + 1}`} className="size-full object-cover" width={320} height={320} loading="lazy" />
                {index === 0 && <span className="absolute left-2 top-2 rounded bg-primary px-2 py-1 text-[0.65rem] font-semibold text-primary-foreground">Main</span>}
              </div>
              <div className="grid grid-cols-3 border-t border-border bg-background">
                <Button type="button" variant="ghost" size="icon" disabled={busy || index === 0} onClick={() => move(index, -1)} aria-label={`Move ${productName} image left`}><ArrowLeft /></Button>
                <Button type="button" variant="ghost" size="icon" disabled={busy || index === paths.length - 1} onClick={() => move(index, 1)} aria-label={`Move ${productName} image right`}><ArrowRight /></Button>
                <Button type="button" variant="ghost" size="icon" disabled={busy} onClick={() => void remove(path)} aria-label={`Remove ${productName} image`}><Trash2 /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}