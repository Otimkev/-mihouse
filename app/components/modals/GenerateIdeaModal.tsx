"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import CustomSelector from "../inputs/CustomSelector";
import Modal from "./Modal";
import useGenerateIdeaModal from "@/app/hooks/useGenerateIdeaModal";
import ImageUpload from "../inputs/ImageUpload";
import RoomStyleSelect from "../inputs/RoomStyleSelect";
import PrivacySelect from "../inputs/PrivacySelect";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { selectListingById } from "@/app/slices/listingByIdSlice";
import { createRender, selectRenderSlice } from "@/app/slices/createSlice";
import { fetchListings } from "@/app/slices/listingsSlice";
import Loading from "@/app/loading";

enum STEPS {
  ROOM_INFO = 0,
  PRIVACY = 1,
  IMAGES = 2
}
const GenerateIdealModal = () => {
  const dispatch = useAppDispatch();
  const { render, pending, error, completed } =
    useAppSelector(selectRenderSlice);

  const router = useRouter();
  const generateIdeaModal = useGenerateIdeaModal();

  const [step, setStep] = useState(STEPS.ROOM_INFO);
  const [isLoading, setIsLoading] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      roomType: "",
      roomStyle: "",
      originalImageSrc: "",
      renderImageSrc: "",
      privacy: "",
      userId: "",
    },
  });

  const roomType = watch("roomType");
  const roomStyle = watch("roomStyle");
  const privacy = watch("privacy");
  const originalImageSrc = watch("originalImageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.IMAGES) {
      return onNext();
    }
    setIsRendering(true);
    //axios s
    await dispatch(createRender(data)).unwrap();
    setIsRendering(false);
    dispatch(fetchListings("food")).unwrap();

      generateIdeaModal.onClose();
      router.push(`/listings/${render?.id}`);
    
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.ROOM_INFO) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your idea?"
        subtitle="Select what best suits you"
      />
      <CustomSelector
        placeholderText="Select Room type"
        value={roomType}
        onChange={(value) => setCustomValue("roomType", value)}
      />

      <RoomStyleSelect
        placeholderText="Select Room style"
        value={roomStyle}
        onChange={(value) => setCustomValue("roomStyle", value)}
      />
    </div>
  );

  if (step === STEPS.PRIVACY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Would you like to make the results public?"
          subtitle="Select what best suits you"
        />

        <PrivacySelect
          value={privacy}
          onChange={(value) => setCustomValue("privacy", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Take a photo of your current room."
          subtitle="For best results make sure it shows the entire room in a 90° straight angle facing a wall or window horizontally. The AI isn't great at angled pics (yet)!"
        />
                {isRendering ? <div className="absolute inset-0 flex justify-center items-center z-10"><Loading /></div> : null}
        <ImageUpload
          onChange={(value) => setCustomValue("originalImageSrc", value)}
          value={originalImageSrc}
        />
      </div>
    );
  }



  return (
    <Modal
      disabled={isLoading}
      isOpen={generateIdeaModal.isOpen}
      title="Discover your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.ROOM_INFO ? undefined : onBack}
      onClose={generateIdeaModal.onClose}
      body={bodyContent}
    />
  );
};

export default GenerateIdealModal;
