import { createContext } from 'react';
type TPreviewProductContext = {
  open: boolean;
  previewItem: any;
  togglePreview: (item?: any) => void;
};
const PreviewProductContext = createContext<Partial<TPreviewProductContext>>(
  {}
);
export default PreviewProductContext;
