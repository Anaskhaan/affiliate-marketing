/*
  Warnings:

  - The primary key for the `affiliate_products` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."affiliate_products" DROP CONSTRAINT "affiliate_products_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "affiliate_products_pkey" PRIMARY KEY ("id");
