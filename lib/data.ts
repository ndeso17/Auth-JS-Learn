import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const GetUsers = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error data GetUsers : ", error);
  }
};

export const GetProducts = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const products = await prisma.product.findMany({
        include: { user: { select: { name: true } } },
      });
      return products;
    } catch (error) {
      console.error("Error data GetProducts : ", error);
    }
  } else {
    try {
      const products = await prisma.product.findMany({
        where: { userId: session.user.id },
        include: { user: { select: { name: true } } },
      });
      return products;
    } catch (error) {
      console.error("Error data GetProducts : ", error);
    }
  }
};
