"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useCreditsModal from "@/app/hooks/useCreditsModal";
import Loading from "@/app/loading";

const CreditsModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const creditsModal = useCreditsModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    creditsModal.onClose();
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Available credits: 12"
        subtitle="Share your feedback to get more credits"
      />
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <Loading />
        </div>
      ) : null}
      {isLoading ? (
        <div className="absolute inset-0 justify-center items-center z-10 hidden">
          {toast.success(`Credit request successful`)}
        </div>
      ) : null}
      <Input
        id="review"
        label="Review"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={creditsModal.isOpen}
      title="Request for credits"
      actionLabel="Continue"
      onClose={creditsModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      //footer={footerContent}
    />
  );
};

export default CreditsModal;
