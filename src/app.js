import React, { useState, useEffect } from 'react';
import StudentListItem from './components/StudentListItem';
import handler from '../services/handler';

export default function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState('');

  const fetchStudents = () => {
    handler('GET', null, setStudents);
  };

  const studentHttpActions = {
    GET: fetchStudents,
    POST: () => {
      if (!students.includes(newStudent)) {
        handler('POST', { newStudent }, fetchStudents);
      } else {
        alert(`${newStudent} already exist`);
      }
      setNewStudent('');
    },
    PUT: (student, newStudentName, callback) => {
      if (!students.includes(newStudentName)) {
        handler('PUT', { student, newStudentName }, fetchStudents);
      } else {
        alert(`${newStudentName} already exist`);
        callback(student);
      }
    },
    DELETE: (student) => handler('DELETE', { student }, fetchStudents),
  };

  const handelInput = (e) => setNewStudent(e.target.value);

  useEffect(() => {
    studentHttpActions.GET();
  }, []);

  return (
    <div>
      <h2> hello students </h2>
      <hr />
      {
        students.map((student) => (
          <StudentListItem
            student={student}
            key={student}
            deleteStudent={studentHttpActions.DELETE}
            updateStudent={studentHttpActions.PUT}
          />
        ))
      }
      <hr />
      <input
        value={newStudent}
        onChange={handelInput}
      />
      <button type="submit" onClick={studentHttpActions.POST}> Create </button>
    </div>
  );
}
