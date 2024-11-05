import React from "react";
import {
  PlusIcon,
  CircleDotIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { snakeCaseToTitleCase } from "@/lib/utils";

import { TaskStatus } from "../types";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size=[18px] text-pink-400" />
  ),
  [TaskStatus.TODO]: <CircleIcon className="size=[18px] text-rose-400" />,
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size=[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size=[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size=[18px] text-emerald-400" />
  ),
};

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderProps) => {
  const icon = statusIconMap[board];
  const { open } = useCreateTaskModal();

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-secondary text-xs text-secondary-foreground font-medium">
          {taskCount}
        </div>
      </div>
      <Button className="size-5" onClick={open} variant="ghost" size="icon">
        <PlusIcon className="size-4 text-primary" />
      </Button>
    </div>
  );
};
