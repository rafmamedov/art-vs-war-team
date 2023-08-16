"use client"

import { Authenticator } from "@aws-amplify/ui-react";

import style from "../page.module.scss";

import CreatePainting from "@/app/components/createPainting/createPainting";

const EditProfilePage = () => {
return (
  <Authenticator className={style.auth}>
    <CreatePainting />
  </Authenticator>
  );
};

export default EditProfilePage