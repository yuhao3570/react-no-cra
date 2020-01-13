import React, { useState, useEffect } from 'react';
import StudentListItem from './components/StudentListItem';

export default function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState('');

  const handler = (action, data) => {
    const fetchConfig = {
      method: action,
    };
    if (action !== 'GET') {
      Object.assign(fetchConfig, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
    fetch('http://localhost:3000/students', fetchConfig)
      .then((res) => res.json())
      .then((result) => setStudents(result))
      .catch();
  };

  useEffect(() => {
    handler('GET');
  }, []);

  const submitNewStudent = () => {
    handler('POST', { studentName: newStudent });
    setNewStudent('');
  };

  return (
    <div>
      <h2>hello</h2>
      <hr />
      {students.map((student) => (
        <StudentListItem
          student={student}
          key={student}
          deleteStudent={(studentName) => handler('DELETE', { studentName })}
          updateStudent={(oldName, newName) => handler('PUT', { oldName, newName })}
        />
      ))}
      <hr />
      <input value={newStudent} onChange={(e) => setNewStudent(e.target.value)} />
      <button type="submit" onClick={submitNewStudent}>Create</button>
    </div>
  );
}
