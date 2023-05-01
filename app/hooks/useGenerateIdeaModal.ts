import { create } from "zustand";

interface GenerateIdeaModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useGenerateIdeaModal = create<GenerateIdeaModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useGenerateIdeaModal;