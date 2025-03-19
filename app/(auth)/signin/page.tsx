"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader/Loader";
import { useSession, signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import {
  Grid,
  Link,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material/";

const defaultTheme = createTheme();

export default function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [testUser, setTestUser] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const { status } = useSession();

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
  const router = useRouter();

  const handleSignIn: SubmitHandler<FieldValues> = (data) => {
    setIsSubmitting(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok && callback?.error === undefined) {
          toast.success("Logged in successfully!");
          router.refresh();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return redirect("/");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        sx={{
          width: { sm: "75%", lg: "40%" },
          height: "100vh",
          backgroundColor: ["white", null, null, "#f2a23e"],
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "2rem",
          padding: "0",
          margin: "auto 0",
        }}
      >
        <Typography variant="body1" sx={{ marginRight: 1, fontSize: "1.8rem" }}>
          Don&apos;t have an account?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/signup")}
        >
          SIGN UP
        </Button>
      </Container>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, width: "150px", height: "80px", borderRadius: "0" }}
            className="rounded-none"
          >
            <Image
              src="/logo.webp"
              alt="Gym Logo"
              width={150}
              height={80}
              priority
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In To SmartFlex
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignIn)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "This field is required",
              })}
              error={!!errors?.email?.message}
              helperText={
                errors?.email && typeof errors?.email?.message === "string"
                  ? errors?.email?.message
                  : null
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "This field is required",
              })}
              error={!!errors?.password?.message}
              helperText={
                errors?.password &&
                typeof errors?.password?.message === "string"
                  ? errors?.password?.message
                  : null
              }
            />
            <Grid container>
              <Grid item xs ml={1}>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingX: "3rem",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: "2rem",
          }}
        >
          <p>Don&apos;t have account?</p>
          <Button
            onClick={() => router.push("/signup")}
            size="small"
            variant="contained"
          >
            Signup
          </Button>
        </Box> */}
      </Container>
    </ThemeProvider>
  );
}
