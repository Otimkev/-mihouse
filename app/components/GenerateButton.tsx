'use client';

import { IconType } from "react-icons";
import useGenerateIdeaModal from "../hooks/useGenerateIdeaModal";
import { useCallback } from "react";

interface GenerateButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ 
  label, 
  disabled, 
  outline,
  small,
  icon: Icon,
}) => {
  const generateIdeaModal = useGenerateIdeaModal();
  
  const onGenerateIdea = useCallback(() => {
    // if (!currentUser) {
    //   return loginModal.onOpen();
    // }
    generateIdeaModal.onOpen();
  }, [generateIdeaModal]);

  // const clickHandler = () => {
  //   return (event: React.MouseEvent<HTMLButtonElement>) => {
  //       onGenerateIdea
  //     event.preventDefault();
  //   }
  // }
  
  return ( 
    <button
      disabled={disabled}
      onClick={onGenerateIdea}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
   );
}
 
export default GenerateButton;
