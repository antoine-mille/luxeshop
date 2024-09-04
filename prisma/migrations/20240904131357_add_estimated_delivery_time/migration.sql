/*
  Warnings:

  - Added the required column `estimatedDeliveryTime` to the `ShippingMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShippingMethod" ADD COLUMN     "estimatedDeliveryTime" INTEGER NOT NULL;
