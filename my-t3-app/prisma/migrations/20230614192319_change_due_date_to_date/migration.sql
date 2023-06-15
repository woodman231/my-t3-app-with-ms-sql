/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Todo] ALTER COLUMN [dueDate] DATE NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
