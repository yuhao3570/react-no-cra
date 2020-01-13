import React, { useState } from 'react';

export default function StudentListItem({ student, updateStudent, deleteStudent }) {
  const [studentName, setStudentName] = useState(student);

  return (
    <div>
      <input value={studentName} type="text" onChange={(e) => setStudentName(e.target.value)} />
      <button type="submit" action="update" onClick={() => updateStudent(student, studentName)}>Update</button>
      <button type="submit" action="delete" onClick={() => deleteStudent(studentName)}>Delete</button>
    </div>
  );
}
