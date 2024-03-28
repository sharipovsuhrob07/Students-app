import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const StyledButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledListItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditStudent = ({
  student,
  editingId,
  editedFirstName,
  setEditedFirstName,
  editedLastName,
  setEditedLastName,
  editedGroup,
  setEditedGroup,
  updateStudent,
  deleteStudent,
  editStudent,
}) => {
  return (
    <>
      {editingId === student.id ? (
        <>
          <StyledInput
            type="text"
            placeholder="First Name"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="Last Name"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="Group"
            value={editedGroup}
            onChange={(e) => setEditedGroup(e.target.value)}
            required
          />
          <StyledButton onClick={updateStudent}>Save</StyledButton>
        </>
      ) : (
        <>
          <div>
            <strong>
              {student.firstName} {student.lastName}
            </strong>{" "}
            - Group: {student.group}
          </div>
          <div>
            <StyledButton onClick={() => editStudent(student.id)}>Edit</StyledButton>
            <StyledButton onClick={() => deleteStudent(student.id)}>Delete</StyledButton>
          </div>
        </>
      )}
    </>
  );
};

const StudentList = ({
  students,
  deleteStudent,
  editStudent,
  editingId,
  editedFirstName,
  setEditedFirstName,
  editedLastName,
  setEditedLastName,
  editedGroup,
  setEditedGroup,
  updateStudent,
}) => {
  return (
    <>
      {students.map((student) => (
        <StyledListItem key={student.id}>
          <EditStudent
            student={student}
            editingId={editingId}
            editedFirstName={editedFirstName}
            setEditedFirstName={setEditedFirstName}
            editedLastName={editedLastName}
            setEditedLastName={setEditedLastName}
            editedGroup={editedGroup}
            setEditedGroup={setEditedGroup}
            updateStudent={updateStudent}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
          />
        </StyledListItem>
      ))}
    </>
  );
};

export { StudentList, EditStudent };
