"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AdminService } from "@/features/admin/api";

import styles from "../../../features/admin/styles/admin.module.css";

interface IFormInput {
  email: string;
  password: string;
}

const AdminLogin = () => {
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
      await AdminService.loginAdmin(
        {
          email: email,
          password: password,
        },
        "이메일 또는 비밀번호가 일치하지 않습니다."
      );
      router.push("/admin");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "403") {
          toast.error("관리자 권한이 없습니다.");
        }
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>관리자 로그인</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <input placeholder="E-mail" {...register("email")} aria-label="email" />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          aria-label="password"
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
