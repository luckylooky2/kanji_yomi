"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AdminService } from "@/features/admin/api";

import styles from "../../../features/admin/styles/admin.module.css";

interface IFormInput {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (email === "" || password === "") {
      toast.info("이메일이나 비밀번호를 입력해주세요.");
      return;
    }

    try {
      await AdminService.login({
        email: email,
        password: password,
      });
      router.push("/admin");
    } catch {
      setIsLoginFailed(true);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Administration</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <input placeholder="E-mail" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Log in
        </Button>
      </form>
      {isLoginFailed && (
        <div className={styles.loginFailure}>로그인에 실패하였습니다.</div>
      )}
    </div>
  );
};

export default AdminLogin;
