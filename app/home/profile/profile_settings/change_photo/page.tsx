'use client';

import i18n from "i18next";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { uploadAvatar } from "@/store/actions/uploadAvatar";

import resources from "@/locales/resource";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";
import { Footer } from "@/components/Footer/Footer";

import css from "./page.module.css";
import { useRouter } from "next/navigation";
import { userGet } from "@/store/actions/getUser";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en",
});

export default function changePhoto(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    store.dispatch(userGet());
  }, []);

  const user = useSelector((state: State) => state.user);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (file) {
      await store.dispatch(uploadAvatar(file));
      router.push("/home/profile/profile_settings");
    }
  };

  // Function to trigger file input click
  const handleSelectPhoto = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className={css.wrapper}>
      <SettingsHeader
        title={i18n.t("my_photo")}
      />
      <div className={css.container}>
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!user?.user?.link_avatar ? (
          <div className={css.avatarWrapper}>
            <div className={css.avatarData}>
              {user?.user?.name.slice(0, 1)}
            </div>
            {/* Trigger file input click */}
            <button className={css.button} onClick={handleSelectPhoto}>
              {i18n.t("add_photo")}
            </button>
          </div>
        ) : (
          <div className={css.avatarWrapper}>
            <img
              src={user?.user?.link_avatar}
              className={css.avatar}
              alt="User Avatar"
            />
            {/* Trigger file input click */}
            <button className={css.button} onClick={handleSelectPhoto}>
              {i18n.t("change_photo")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
