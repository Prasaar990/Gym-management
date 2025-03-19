import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.json();

  let {
    name,
    surname,
    fatherHusbandName,
    password,
    // confirmPassword,
    residentialAddress,
    // flatNo,
    // wing,
    // floor,
    // buildingName,
    // area,
    // street,
    // landmark,
    // pinCode,
    businessName,
    officeAddress,
    // officeNo,
    // officeFloor,
    // officeBuildingName,
    // officeArea,
    // officeStreet,
    // officeLandmark,
    // officePinCode,
    telephone,
    mobile,
    email,
    dateOfBirth,
    bloodGroup,
    maritalStatus,
    anniversaryDate,
    gender,
    image,
    role,
  } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  dateOfBirth = new Date(dateOfBirth).toISOString();

  anniversaryDate = new Date(anniversaryDate).toISOString();

  const user = await prisma.user.create({
    data: {
      email,
      name,
      surname,
      fatherHusbandName,
      hashedPassword,
      residentialAddress,
      businessName,
      officeAddress,
      // flatNo,
      // wing,
      // floor,
      // buildingName,
      // area,
      // street,
      // landmark,
      // pinCode,
      // officeNo,
      // officeFloor,
      // officeBuildingName,
      // officeArea,
      // officeStreet,
      // officeLandmark,
      // officePinCode,
      // telephone,
      mobile,
      dateOfBirth,
      bloodGroup,
      maritalStatus,
      anniversaryDate,
      gender,
      image,
      role,
    },
  });

  user.hashedPassword = undefined as any;

  return NextResponse.json(user);
}
