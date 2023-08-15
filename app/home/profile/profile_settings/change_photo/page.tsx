'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { uploadAvatar } from "@/store/actions/uploadAvatar";

import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from "./page.module.css";

i18n.init({
  resources,
  lng: "en",
});

export default function changePhoto(): JSX.Element {
  const router = useRouter();

  useEffect((): void => {
    store.dispatch(userGet());
  }, []);

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  const handleUpload = async (file: File): Promise<void> => {
    if (file) {
      store.dispatch(uploadAvatar(file));
      router.push("/home/profile/profile_settings");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleSelectPhoto = (): void => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t("my_photo")}
      />
      <div className={css.container}>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!user?.user?.link_avatar ? (
          <div className={css.avatarWrapper}>
            <div className={theme ? css.darkAvatarData : css.avatarData}>
              {user?.user?.name.slice(0, 1)}
            </div>
            <button
              className={css.button}
              onClick={handleSelectPhoto}
            >
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
            <button
              className={css.button}
              onClick={handleSelectPhoto}
            >
              {i18n.t("change_photo")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
