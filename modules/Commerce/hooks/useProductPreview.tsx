import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function useProductPreview() {
  const [open, setOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);
  const togglePreview = (item) => {
    if (item) {
      setOpen(true);
      setPreviewItem(item);
    } else {
      setOpen(false);
      setPreviewItem(null);
    }
  };
  return { open, previewItem, togglePreview };
}
