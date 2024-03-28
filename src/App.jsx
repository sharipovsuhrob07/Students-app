import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
`;

const API_URL = "http://localhost:3000/users";

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
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

const StyledButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

function App() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedGroup, setEditedGroup] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setStudents(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addStudent = async (studentData) => {
    try {
      const response = await axios.post(API_URL, studentData);
      setStudents([...students, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditingId(id);
    setEditedFirstName(studentToEdit.firstName);
    setEditedLastName(studentToEdit.lastName);
    setEditedGroup(studentToEdit.group);
  };

  const updateStudent = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, {
        firstName: editedFirstName,
        lastName: editedLastName,
        group: editedGroup,
      });
      const updatedStudents = students.map((student) => {
        if (student.id === editingId) {
          return {
            ...student,
            firstName: editedFirstName,
            lastName: editedLastName,
            group: editedGroup,
          };
        }
        return student;
      });
      setStudents(updatedStudents);
      setEditingId(null);
      setEditedFirstName("");
      setEditedLastName("");
      setEditedGroup("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>Students</h1>
      <StudentForm addStudent={addStudent} />
      <StyledList>
        <StudentList
          students={students}
          deleteStudent={deleteStudent}
          editStudent={editStudent}
          editingId={editingId}
          editedFirstName={editedFirstName}
          setEditedFirstName={setEditedFirstName}
          editedLastName={editedLastName}
          setEditedLastName={setEditedLastName}
          editedGroup={editedGroup}
          setEditedGroup={setEditedGroup}
          updateStudent={updateStudent}
        />
      </StyledList>
    </Container>
  );
}

export default App;

function StudentForm({ addStudent }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !group) return;
    addStudent({ firstName, lastName, group });
    setFirstName("");
    setLastName("");
    setGroup("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <StyledInput
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <StyledInput
        type="text"
        placeholder="Group"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        required
      />
      <StyledButton type="submit">Add Student</StyledButton>
    </form>
  );
}

function StudentList({
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
}) {
  return (
    <>
      {students.map((student) => (
        <StyledListItem key={student.id}>
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
        </StyledListItem>
      ))}
    </>
  );
}
