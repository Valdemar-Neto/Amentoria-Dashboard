-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation_scores" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "simulation_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_sessions" (
    "id" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "study_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- AddForeignKey
ALTER TABLE "simulation_scores" ADD CONSTRAINT "simulation_scores_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_sessions" ADD CONSTRAINT "study_sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
