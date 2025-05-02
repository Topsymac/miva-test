"use client";

import { Button } from "@chakra-ui/react";

import React  from "react";
import { IoIosTrash } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteModal = ({
  text,
  close,

  handleDelete,
}: {
  close: () => void;
  handleDelete: () => void;
  text?: string;
}) => {
  return (
    <div className="relative max-h-[95vh] w-[90%] lg:w-[35%] overflow-y-auto rounded-xl border-t-4 border-red-500 bg-white p-6">
      {" "}
      <div className="mb-5 flex items-center gap-x-2.5">
        <IoIosTrash size={20} color="red" />
        <span className="text-[20px] font-bold capitalize">Delete</span>
      </div>
      <div className="flex items-center gap-x-2.5 pb-3">
        <FiAlertTriangle size={14} color="red" />
        <h3 className="text-sm font-semibold text-primary">
          Warning: This action cannot be undone.
        </h3>
      </div>
      <p>{text}</p>
      <div className="mt-4 flex items-center justify-end gap-4">
        <Button
          className="flex h-10 w-auto items-center gap-2 bg-lightpink active:bg-primary"
          colorScheme="gray"
          onClick={() => {
            close();
          }}
        >
          Cancel
        </Button>

        <Button
          className="flex h-10 w-auto items-center gap-2 bg-primary text-white"
          onClick={() => {
            handleDelete();
          }}
          colorScheme="red"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
