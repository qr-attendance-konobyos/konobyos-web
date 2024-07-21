import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StudentModel, useGetStudentsQuery } from "../api/student";
import { usePageSize } from "../hooks";
import { debounce } from "../utils";
import "./students.scss";

export const StudentsList = () => {
  const { page, size, nextPage, previousPage } = usePageSize();
  const [q, search] = useState("");
  const { data: students, isLoading } = useGetStudentsQuery({
    page,
    size,
    search: q,
  });

  return (
    <>
      <div className="content students">
        <div className="header">
          <div className="title-bar">
            <h1>Students</h1>
            <Link to="/students/register" className="button icon primary">
              <FaPlus />
            </Link>
          </div>
          <div className="form-field">
            <input
              type="text"
              value={q}
              onChange={(e) => debounce(() => search(e.target.value), 400)}
              placeholder="Search"
            />
          </div>
        </div>
        <div className="scroll-view">
          {isLoading && <div>Loading...</div>}
          {!isLoading && students?.length === 0 && (
            <h3 className="no-content">No students found</h3>
          )}
          {students?.map((student: StudentModel) => (
            <div key={student.id} className="student">
              <div className="name">{student.name}</div>
              <div className="chris-name">{student.christianName}</div>
            </div>
          ))}
          <div className="page-controls">
            {page > 0 ? (
              <button onClick={previousPage} className="button icon primary">
                <FaAngleLeft />
              </button>
            ) : (
              <span />
            )}
            {!isLoading && students?.length != 0 ? (
              <button onClick={nextPage} className="button icon primary">
                <FaAngleRight />
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
