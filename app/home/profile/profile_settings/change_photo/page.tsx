'use client';

import i18n from "i18next";
import { useState } from "react";
import { store } from "@/store/store";
import { uploadAvatar } from "@/store/actions/uploadAvatar";

import resources from "@/locales/resource";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";
import { Footer } from "@/components/Footer/Footer";

import css from "./page.module.css";
import { useRouter } from "next/navigation";

i18n.init({
  resources,
  lng: "en",
});

export default function changePhoto(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      store.dispatch(uploadAvatar(selectedFile));
      router.push('/home/profile/profile_settings');
    }
  };

  return (
    <div className={css.wrapper}>
      <SettingsHeader title={i18n.t("change_photo")} link="/home/profile/profile_settings" />
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload a photo</button>
      </div>
      <Footer />
    </div>
  );
}
