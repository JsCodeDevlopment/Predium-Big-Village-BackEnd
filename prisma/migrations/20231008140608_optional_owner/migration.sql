-- CreateEnum
CREATE TYPE "ResidentType" AS ENUM ('Owner', 'Tenant');

-- CreateEnum
CREATE TYPE "FineStatus" AS ENUM ('PaymentInProgress', 'Canceled', 'Paid');

-- CreateEnum
CREATE TYPE "HallReservationStatus" AS ENUM ('Pending', 'Confirmed', 'Canceled', 'Finished');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('Motorcycle', 'Car');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'RESIDENT', 'OWNER');

-- CreateTable
CREATE TABLE "Owners" (
    "id" UUID NOT NULL,
    "person_id" UUID NOT NULL,

    CONSTRAINT "Owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartments" (
    "id" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "block" TEXT NOT NULL,
    "owner_id" UUID,

    CONSTRAINT "Apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Residents" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "access_tag" TEXT NOT NULL,
    "type" "ResidentType" NOT NULL,
    "apartment_id" UUID NOT NULL,
    "person_id" UUID NOT NULL,

    CONSTRAINT "Residents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "resident_id" UUID NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitors" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "street_number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "relationship_with_resident" TEXT NOT NULL,
    "resident_id" UUID NOT NULL,
    "person_id" UUID NOT NULL,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fines" (
    "id" UUID NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "FineStatus" NOT NULL,
    "apartment_id" UUID NOT NULL,

    CONSTRAINT "Fines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HallReservations" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "HallReservationStatus" NOT NULL,
    "apartment_id" UUID NOT NULL,

    CONSTRAINT "HallReservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaints" (
    "id" UUID NOT NULL,
    "details" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "apartment_id" UUID NOT NULL,

    CONSTRAINT "Complaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warnings" (
    "id" UUID NOT NULL,
    "details" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "apartment_id" UUID NOT NULL,

    CONSTRAINT "Warnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicles" (
    "id" UUID NOT NULL,
    "type" "VehicleType" NOT NULL,
    "brand" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "apartment_id" UUID NOT NULL,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRequests" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "service_id" UUID NOT NULL,
    "apartment_id" UUID,
    "resident_id" UUID,

    CONSTRAINT "ServiceRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "password" TEXT NOT NULL,
    "person_id" UUID NOT NULL,
    "type" "UserRoles" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owners_person_id_key" ON "Owners"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "Apartments_block_key" ON "Apartments"("block");

-- CreateIndex
CREATE UNIQUE INDEX "Apartments_owner_id_key" ON "Apartments"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Residents_access_tag_key" ON "Residents"("access_tag");

-- CreateIndex
CREATE UNIQUE INDEX "Residents_person_id_key" ON "Residents"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "Visitors_resident_id_key" ON "Visitors"("resident_id");

-- CreateIndex
CREATE UNIQUE INDEX "Visitors_person_id_key" ON "Visitors"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "HallReservations_date_key" ON "HallReservations"("date");

-- CreateIndex
CREATE UNIQUE INDEX "People_phone_number_key" ON "People"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "People_email_key" ON "People"("email");

-- CreateIndex
CREATE UNIQUE INDEX "People_cpf_key" ON "People"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "People_rg_key" ON "People"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Users_person_id_key" ON "Users"("person_id");

-- AddForeignKey
ALTER TABLE "Owners" ADD CONSTRAINT "Owners_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartments" ADD CONSTRAINT "Apartments_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residents" ADD CONSTRAINT "Residents_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residents" ADD CONSTRAINT "Residents_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "Residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "Residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fines" ADD CONSTRAINT "Fines_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HallReservations" ADD CONSTRAINT "HallReservations_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaints" ADD CONSTRAINT "Complaints_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warnings" ADD CONSTRAINT "Warnings_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicles" ADD CONSTRAINT "Vehicles_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequests" ADD CONSTRAINT "ServiceRequests_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequests" ADD CONSTRAINT "ServiceRequests_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "Apartments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequests" ADD CONSTRAINT "ServiceRequests_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "Residents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
