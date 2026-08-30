"use client";

import { useEffect, useRef, useState } from "react";
import { AutodeskShareViewer } from "./AutodeskShareViewer";
import { ProductForm } from "./ProductForm";
import { StepCanvas } from "./StepCanvas";
import { autodeskShareForProduct } from "@/lib/autodesk-share";
import { showcaseForProduct } from "@/lib/models";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "180px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function ProductCatalogVisual({ slug }: { slug: string }) {
  const { ref, visible } = useInView();
  const autodesk = autodeskShareForProduct(slug);
  const showcase = showcaseForProduct(slug);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-inset">
      {!visible ? null : autodesk ? (
        <AutodeskShareViewer
          part={autodesk.id}
          chrome="bare"
          className="absolute inset-0 h-full min-h-0"
        />
      ) : showcase ? (
        <StepCanvas
          source={{
            type: "wire",
            id: showcase.id,
            diameterIn: 0.375,
            finish: "carbon",
          }}
          autoRotate
          className="absolute inset-0 h-full min-h-0 w-full overflow-hidden bg-inset"
        />
      ) : (
        <ProductForm slug={slug} className="h-full w-full p-4" />
      )}
    </div>
  );
}
