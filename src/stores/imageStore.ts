import { create } from "zustand";

interface ImageState {
  image: File | null;
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  setImage: (file: File | null) => void;
  setImageUrl: (url: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearImage: () => void;
}

export const useImageStore = create<ImageState>((set) => ({
  image: null,
  imageUrl: null,
  isLoading: false,
  error: null,
  setImage: (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      set({ image: file, imageUrl: url, error: null });
    } else {
      set({ image: null, imageUrl: null });
    }
  },
  setImageUrl: (url) => set({ imageUrl: url }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearImage: () => {
    set((state) => {
      if (state.imageUrl) {
        URL.revokeObjectURL(state.imageUrl);
      }
      return { image: null, imageUrl: null, error: null };
    });
  },
}));

