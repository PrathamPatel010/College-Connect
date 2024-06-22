-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "latestMessage" INTEGER;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "readBy" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
