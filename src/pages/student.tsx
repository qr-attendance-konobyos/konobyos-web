import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteStudentMutation, useStudentQuery } from "../api";
import "./students.scss";

export const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [modalIsDeleteOpen, setIsDeleteOpen] = useState(false);

  if (id === undefined) throw new Error("id is required");

  const student = useStudentQuery(id);
  const deleteStudent = useDeleteStudentMutation(id);

  if (student.isLoading) return <p>Loading...</p>;

  const studentQRLink = `${student.data.id}`;

  return (
    <div className="student-detail">
      <button
        onClick={() => navigate(-1)}
        className="button primary icon close-button"
      >
        <FaTimes />
      </button>
      <h2>Student Detail</h2>
      {student.isError && <p>Error: {student.error.message}</p>}
      {student.isSuccess && (
        <div>
          <dl>
            <dt>Name</dt>
            <dd>{student.data.name}</dd>
          </dl>
          <dl>
            <dt>Christian Name</dt>
            <dd>{student.data.christianName}</dd>
          </dl>
          <dl>
            <dt>Phone Number</dt>
            <dd>{student.data.phoneNumber}</dd>
          </dl>
          <dl>
            <dt>Email</dt>
            <dd>{student.data.email}</dd>
          </dl>
        </div>
      )}

      <h3>QR</h3>
      <QRCode value={studentQRLink} className="qr-code" />

      <h3>Actions</h3>
      <button onClick={() => setIsDeleteOpen(true)} className="button danger">
        Remove Student
      </button>

      <Modal
        isOpen={modalIsDeleteOpen}
        onRequestClose={() => setIsDeleteOpen(false)}
        contentLabel="Remove Student"
      >
        <div className="delete-modal">
          <center>
            <h3>Are you sure you want to remove {student.data.name}?</h3>
          </center>
          <button
            onClick={() => {
              deleteStudent.mutate();
              setIsDeleteOpen(false);
            }}
            className="button danger"
          >
            Yes Remove
          </button>
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="button outline"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
