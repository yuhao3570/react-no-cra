import React, { useState, useEffect } from 'react';
import StudentListItem from './components/StudentListItem';
import handler from '../services/handler';

export default function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState('');

  const buttonActionHandler = {
    GET: () => handler(setStudents, 'GET'),
    POST: () => {
      handler(setStudents, 'POST', { newStudent });
      setNewStudent('');
    },
    PUT: (student, newStudentName) => handler(setStudents, 'PUT', { student, newStudentName }),
    DELETE: (student) => handler(setStudents, 'DELETE', { student }),
  };

  const handelInput = (e) => setNewStudent(e.target.value);

  useEffect(() => {
    buttonActionHandler.GET();
  }, []);

  return (
    <div>
      <h2>hello</h2>
      <hr />
      {students.map((student) => (
        <StudentListItem
          student={student}
          key={student}
          deleteStudent={buttonActionHandler.DELETE}
          updateStudent={buttonActionHandler.PUT}
        />
      ))}
      <hr />
      <input value={newStudent} onChange={handelInput} />
      <button type="submit" onClick={buttonActionHandler.POST}>Create</button>
    </div>
  );
}
