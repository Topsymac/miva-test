"use client";
import useStudents from "@/hooks/useStudents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Modal from "../molecules/Modals/ModalBackground";
import DeleteModal from "../molecules/Modals/DeleteModal/DeleteModal";
import { Spinner, useToast } from "@chakra-ui/react";
// import { CiEdit } from "react-icons/ci";
// import EditModal from "../molecules/Modals/EditModal/EditModal";
import Link from "next/link";

interface Student {
  _id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

interface StudentsTableProps {
  searchTerm: string;
  filterType: "major" | "gpa" | "";
  filterValue: string;
}

const StudentsTable = ({
  searchTerm,
  filterType,
  filterValue,
}: StudentsTableProps) => {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "edit" | "">("");
  const idRef = useRef<string>("");
  const { getStudent, deleteStudent } = useStudents();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, refetch, isFetching } = useQuery({
    queryKey: ["students"],
    queryFn: getStudent,
    enabled: true,
  });

  const mutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast({
        title: "Student Deleted Successfully",
        status: "success",
        position: "top",
        isClosable: true,
      });
      refetch();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: Error) => {
      toast({
        title: error?.message || "An error occurred",
        position: "top",
        status: "error",
        isClosable: true,
      });
    },
  });

  const handleDeleteStudent = () => {
    mutation.mutate(idRef.current);
  };

  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  // const [selectedItem, setSelectedItem] = useState<Student | null>(null);

  // Ensure we're working with an array
  const studentsData = Array.isArray(data) ? data : [];
  // const endOffset = itemOffset + itemsPerPage;
  // const currentItems = studentsData.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(studentsData.length / itemsPerPage);
  // 1. Apply search and filter
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filterType === "major" && filterValue) {
      matchesFilter = student.major === filterValue;
    } else if (filterType === "gpa" && filterValue) {
      if (filterValue === "3.0") {
        matchesFilter = student.gpa < 3.0;
      } else if (filterValue === "3.5") {
        matchesFilter = student.gpa >= 3.5 && student.gpa < 4.0;
      } else if (filterValue === "4.0") {
        matchesFilter = student.gpa === 4.0;
      }
    }

    return matchesSearch && matchesFilter;
  });

  // 2. Paginate
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredStudents.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % studentsData.length;
    setItemOffset(newOffset);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-64 text-red-500">
        Error loading students data
      </div>
    );
  }

  return (
    <div>
      <div className="h-auto w-full overflow-auto bg-white shadow-xl mt-8">
        <table className="no-scrollbar w-full overflow-scroll leading-normal lg:overflow-hidden">
          <thead>
            <tr className="border-gray-400 border-b bg-white">
              <th className="px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                S/N
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Reg No.
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Major
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Date of Birth
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                GPA
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold capitalize tracking-wider text-black">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="w-full text-black shadow-lg [&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gold [&>*:nth-child(odd)]:text-black">
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-500 py-6 text-sm font-medium"
                >
                  No results found
                </td>
              </tr>
            ) : (
              currentItems.map((item: Student, index: number) => (
                <tr key={item._id}>
                  <td className="px-5 py-3 text-sm">{index + 1}</td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    <Link href={`/students/${item._id}`}>{item.name}</Link>
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item.registrationNumber}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item.major}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item.dob}
                  </td>
                  <td className="whitespace-no-wrap px-5 py-3 text-sm font-normal capitalize">
                    {item.gpa}
                  </td>
                  <td className="flex items-center gap-2 px-5 py-3 text-sm">
                    {/* <button
                      onClick={() => {
                        setSelectedItem(item);
                        idRef.current = item._id;
                        setOpen(true);
                        setModalType("edit");
                      }}
                      className="text-md cursor-pointer rounded-md p-2 font-semibold"
                    >
                      <CiEdit color="green" size={20} />
                    </button> */}
                    <button
                      onClick={() => {
                        idRef.current = item._id;
                        setOpen(true);
                        setModalType("delete");
                      }}
                      className="text-md cursor-pointer rounded-md p-2 font-semibold"
                    >
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                          fill="red"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="flex items-center justify-center gap-2"
          pageClassName="px-3 py-1 rounded hover:bg-gray-100"
          activeClassName="bg-primary text-white"
          previousClassName="px-3 py-1 rounded hover:bg-gray-100"
          nextClassName="px-3 py-1 rounded hover:bg-gray-100"
        />
      </div>

      {/* Modals */}
      {open && modalType === "delete" && (
        <Modal open={open} setOpen={() => setOpen(false)}>
          <DeleteModal
            close={() => setOpen(false)}
            handleDelete={handleDeleteStudent}
            text="Do you want to permanently delete this student?"
          />
        </Modal>
      )}

      {/* {open && modalType === "edit" && (
        <Modal open={open} setOpen={() => setOpen(false)}>
          <EditModal
            users={selectedItem}
            id={idRef}
            setOpen={() => setOpen(false)}
          />
        </Modal>
      )} */}
    </div>
  );
};

export default StudentsTable;
