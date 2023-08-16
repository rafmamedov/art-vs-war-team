'use client'

import { Authenticator } from "@aws-amplify/ui-react";

import style from "./page.module.scss";

const SignIn = () => {
  return <Authenticator className={style.auth} />
};

export default SignIn;