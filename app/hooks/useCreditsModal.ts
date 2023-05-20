import { create } from 'zustand';

interface CreditsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreditsModal = create<CreditsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useCreditsModal;
