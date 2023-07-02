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
import {
  createRender,
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
  selectRenderSlice,
} from "@/app/slices/createSlice";
import { fetchListings } from "@/app/slices/listingsSlice";
import Loading from "@/app/loading";
import { toast } from "react-hot-toast";

enum STEPS {
  ROOM_INFO = 0,
  PRIVACY = 1,
  IMAGES = 2,
}
const GenerateIdealModal = () => {
  const dispatch = useAppDispatch();
  const { render, isFetchingData, error } = useAppSelector(selectRenderSlice);

  const router = useRouter();
  const generateIdeaModal = useGenerateIdeaModal();

  //const currentUser = await getCurrentUser();

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
    dispatch(fetchDataStart);

    try {
      var formData = new FormData();
      formData.append("image", data.originalImageSrc);

      const urlEndpoint = `https://funcapp-southn-test-01.azurewebsites.net/api/v1/renders?code=esW6_Nk_NZzAIFzn7z6PEIffxdo66EfvF6ES_0LxJApvAzFuqo0HNw==`;
      //const urlEndpoint = "http://localhost:7145/api/v1/renders"
      const result = await fetch(
        urlEndpoint +
          "&" +
          new URLSearchParams({
            prompt: `${data.roomStyle.value}`,
            roomStyle: `${data.roomStyle.value}`,
            roomType: `${data.roomType.value}`,
            public: data.roomStyle.value === "public" ? "true" : "false",
            userId: `dcbbbe93-e4e3-469f-9af5-72e1d9edad9b`,
          }),
        {
          method: "POST",
          body: formData,
        }
      );
      const createdRenderData = await result.json();

      if (result.status === 200) {
        setIsRendering(false);
        dispatch(fetchDataSuccess(createdRenderData));
        generateIdeaModal.onClose();
        reset();
        setStep(STEPS.ROOM_INFO);
        router.push(`/listings/${createdRenderData?.id}`);
      } else {
        dispatch(fetchDataFailure(`System at maximum capacity, unable to process request. Please try again later!`));
        setIsRendering(false);
        generateIdeaModal.onClose();
      }
    } catch (error) {
      dispatch(fetchDataFailure(error));
      setIsRendering(false);
      generateIdeaModal.onClose();
    }
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
        title="Which of these best describes your result quality?"
        subtitle="Select what best suits you"
      />
      <CustomSelector
        placeholderText="Select result quality"
        value={roomType}
        onChange={(value) => setCustomValue("roomType", value)}
      />

      {/* <RoomStyleSelect
        placeholderText="Select Room style"
        value={roomStyle}
        onChange={(value) => setCustomValue("roomStyle", value)}
      /> */}
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
        {isRendering ? (
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <Loading />
          </div>
        ) : null}
        {error ? (
          <div className="absolute inset-0 justify-center items-center z-10 hidden">
            {toast.error(`System is at maximum capacity, unable to process request. Try again later!`)}
          </div>
        ) : null}
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
function uploadToStableDiffusion(data: FieldValues) {
  throw new Error("Function not implemented.");
}
