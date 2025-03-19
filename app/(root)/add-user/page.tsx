"use client";

import axios from "axios";
import Error from "next/error";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import ImageUpload from "@/app/components/ImageUpload";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, MenuItem, Select } from "@mui/material/";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/types";

const defaultTheme = createTheme();

const AddMemberPage: React.FC = () => {
  const { data } = useSession();
  const sessionUser = data?.user as SessionUser;
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<
    FieldValues & {
      age: number;
      weight: number;
      height: number;
    }
  >({
    defaultValues: {
      name: "",
      surname: "",
      fatherHusbandName: "",
      email: "",
      password: "",
      confirmPassword: "",
      residentialAddress: "",
      businessName: "",
      officeAddress: "",
      role: "",
      image: "",
      age: 18,
      weight: 50,
      height: 100,
      gender: "",
      goal: "",
      level: "",
      mobile: "",
      dateOfBirth: "",
      bloodGroup: "",
      maritalStatus: "",
      anniversaryDate: "",
    },
  });

  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("/api/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === 201) {
        toast.success("User Created Successfully");
        reset();
        router.push("trainers");
      }
    } catch (err: Error | any) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              mt: 3,
            }}
          >
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                autoComplete="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register("name", { required: true })}
                helperText={
                  errors.name && typeof errors.name.message === "string"
                    ? errors.name.message
                    : null
                }
                error={!!errors?.name?.message}
              />
            </Grid>

            {/* Surname */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                autoComplete="surname"
                required
                fullWidth
                id="surname"
                label="Surname"
                autoFocus
                {...register("surname", { required: true })}
                helperText={
                  errors.surname && typeof errors.surname.message === "string"
                    ? errors.surname.message
                    : null
                }
                error={!!errors?.surname?.message}
              />
            </Grid>

            {/* Father/Husband's name */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                autoComplete="fatherHusbandName"
                required
                fullWidth
                id="fatherHusbandName"
                label="Father's/Husband's Name"
                autoFocus
                {...register("fatherHusbandName", { required: true })}
                helperText={
                  errors.fatherHusbandName &&
                  typeof errors.fatherHusbandName.message === "string"
                    ? errors.fatherHusbandName.message
                    : null
                }
                error={!!errors?.fatherHusbandName?.message}
              />
            </Grid>

            {/* Residential Address */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                autoComplete="residentialAddress"
                required
                fullWidth
                id="residentialAddress"
                label="Residential Address"
                autoFocus
                {...register("residentialAddress", { required: true })}
                helperText={
                  errors.residentialAddress &&
                  typeof errors.residentialAddress.message === "string"
                    ? errors.residentialAddress.message
                    : null
                }
                error={!!errors?.residentialAddress?.message}
              />
            </Grid>

            {/* Blood Group */}
            <Grid item xs={12} sm={6}>
              <Select
                id="bloodGroup"
                defaultValue={"A+"}
                {...register("bloodGroup", {
                  required: "This field is required",
                  validate: (value) =>
                    ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(
                      value
                    ) || "Invalid blood group",
                })}
                required
              >
                {/* <MenuItem value="">Select Blood Group</MenuItem> */}
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                autoFocus
                required
                id="role"
                defaultValue={"user"}
                {...register("role", {
                  required: true,
                })}
                displayEmpty
              >
                {sessionUser?.role === "admin" && (
                  <MenuItem value="trainer">Trainer</MenuItem>
                )}
                <MenuItem value="user">Member</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <ImageUpload setValue={setValue} value={image} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                autoComplete="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoFocus
                error={!!errors?.email?.message}
                helperText={
                  errors.email && typeof errors.email.message === "string"
                    ? errors.email.message
                    : null
                }
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                required
                fullWidth
                id="mobile"
                label="Mobile number"
                autoFocus
                error={!!errors?.mobile?.message}
                helperText={
                  errors.mobile && typeof errors.mobile.message === "string"
                    ? errors.mobile.message
                    : null
                }
                {...register("mobile", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                id="gender"
                fullWidth
                autoFocus
                required
                defaultValue={"male"}
                {...register("gender", {
                  required: true,
                })}
                displayEmpty
              >
                {sessionUser?.role === "admin" && (
                  <MenuItem value="male">Male</MenuItem>
                )}
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                required
                fullWidth
                id="password"
                label="Enter Password"
                autoFocus
                error={!!errors?.password?.message}
                helperText={
                  errors.password && typeof errors.password.message === "string"
                    ? errors.password.message
                    : null
                }
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must have at most 20 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter and one number",
                  },
                })}
              />
            </Grid>

            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                autoComplete="age"
                autoFocus
                required
                fullWidth
                min={0}
                id="age"
                label="Age"
                {...register("age", {
                  required: true,
                  min: {
                    value: 0,
                    message: "Age must be greater than 0",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Age must be a number",
                  },
                  setValueAs: (value) => parseInt(value),
                })}
                helperText={
                  errors.age && typeof errors.age.message === "string"
                    ? errors.age.message
                    : null
                }
                error={!!errors?.age?.message}
              />
            </Grid>

            {/* Birth day */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                autoComplete="dateOfBirth"
                required
                fullWidth
                min={0}
                id="dateOfBirth"
                label="DOB"
                autoFocus
                // placeholder=""
                InputLabelProps={{ shrink: true }}
                {...register("dateOfBirth", {
                  required: true,
                  validate: (value) => {
                    const enteredDate = new Date(value);
                    const today = new Date();
                    if (enteredDate >= today) {
                      return "Date of Birth must be in the past";
                    }
                    return true;
                  },
                })}
                helperText={
                  errors.age && typeof errors.age.message === "string"
                    ? errors.age.message
                    : null
                }
                error={!!errors?.age?.message}
              />
            </Grid>

            {/* Anniversary date */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                autoComplete="date"
                fullWidth
                min={0}
                id="anniversaryDate"
                label="Anniversary Date"
                InputLabelProps={{ shrink: true }}
                autoFocus
                {...register("anniversaryDate", {
                  validate: (value) => {
                    const enteredDate = new Date(value);
                    const today = new Date();
                    if (enteredDate >= today) {
                      return "Anniversary date must be in the past";
                    }
                    return true;
                  },
                })}
                helperText={
                  errors.anniversaryDate &&
                  typeof errors.anniversaryDate.message === "string"
                    ? errors.anniversaryDate.message
                    : null
                }
                error={!!errors?.anniversaryDate?.message}
              />
            </Grid>

            {/* Weight */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                autoComplete="weight"
                required
                fullWidth
                id="weight"
                label="Weight(k.g.)"
                autoFocus
                {...register("weight", {
                  required: true,
                  min: {
                    value: 0,
                    message: "Weight must be greater than 0",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Weight must be a number",
                  },
                  setValueAs: (value) => parseInt(value),
                })}
                helperText={
                  errors.weight && typeof errors.weight.message === "string"
                    ? errors.weight.message
                    : null
                }
                error={!!errors?.weight?.message}
              />
            </Grid>

            {/* HEIGHT */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                autoComplete="height"
                required
                fullWidth
                min={0}
                id="height"
                label="Height(c.m)"
                autoFocus
                {...register("height", {
                  required: true,
                  min: {
                    value: 0,
                    message: "Height must be greater than 0",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Height must be a number",
                  },
                  setValueAs: (value) => parseInt(value),
                })}
                helperText={
                  errors.height && typeof errors.height.message === "string"
                    ? errors.height.message
                    : null
                }
                error={!!errors?.height?.message}
              />
            </Grid>

            {/* Marital Status: */}
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                autoFocus
                required
                id="maritalStatus"
                defaultValue={"single"}
                {...register("maritalStatus", {
                  required: true,
                })}
                displayEmpty
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                autoFocus
                required
                defaultValue={"gain_weight"}
                {...register("goal", {
                  required: true,
                })}
                displayEmpty
              >
                <MenuItem value="gain_weight">Gain Weight</MenuItem>
                <MenuItem value="lose_weight">Lose Weight</MenuItem>
                <MenuItem value="get_fitter">Get Fitter</MenuItem>
                <MenuItem value="get_stronger">Get Stronger</MenuItem>
                <MenuItem value="get_healthier">Get Healthier</MenuItem>
                <MenuItem value="get_more_flexible">Get More Flexible</MenuItem>
                <MenuItem value="get_more_muscular">Get More Muscular</MenuItem>
                <MenuItem value="learn_the_basics">Learn The Basics</MenuItem>
              </Select>
            </Grid>

            {/* Name and Nature of Business */}
            <Grid item xs={12}>
              <TextField
                type="text"
                autoComplete="businessName"
                required
                fullWidth
                id="businessName"
                label="Name & Nature Of Business"
                autoFocus
                {...register("businessName", { required: true })}
                helperText={
                  errors.businessName &&
                  typeof errors.businessName.message === "string"
                    ? errors.businessName.message
                    : null
                }
                error={!!errors?.businessName?.message}
              />
            </Grid>

            {/* office address */}
            <Grid item xs={12}>
              <TextField
                type="text"
                autoComplete="officeAddress"
                required
                fullWidth
                id="officeAddress"
                label="Office Address"
                autoFocus
                {...register("officeAddress", { required: true })}
                helperText={
                  errors.officeAddress &&
                  typeof errors.officeAddress.message === "string"
                    ? errors.officeAddress.message
                    : null
                }
                error={!!errors?.officeAddress?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                fullWidth
                autoFocus
                required
                defaultValue={"beginner"}
                id="level"
                {...register("level", {
                  required: true,
                })}
                displayEmpty
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            loadingIndicator="Adding Member"
            variant="outlined"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Add Member
          </LoadingButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddMemberPage;
