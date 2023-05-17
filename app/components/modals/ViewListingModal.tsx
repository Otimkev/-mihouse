import { Dialog } from "@headlessui/react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import ImageModal from "./ImageModal"
import { ImageProps } from "@/app/utils/types"


export default function ViewListingModal({
    images,
    onClose,
  }: {
    images: ImageProps[]
    onClose: () => void
  }) {
    const router = useRouter()
    let index = Number(0)
  
    const [direction, setDirection] = useState(0)
    const [curIndex, setCurIndex] = useState(index)
  
    function handleClose() {
      router.push('/', undefined)
      onClose()
    }
  
    function changePhotoId(newVal: number) {
      if (newVal > index) {
        setDirection(1)
      } else {
        setDirection(-1)
      }
      setCurIndex(newVal)
    }
  
    return (
      <Dialog
        static
        open={true}
        onClose={handleClose}
        className="fixed inset-0 z-10 flex items-center justify-center"
      >
        <Dialog.Overlay
          as={motion.div}
          key="backdrop"
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <ImageModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
          navigation={true}
        />
      </Dialog>
    )
  }