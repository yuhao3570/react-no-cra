import React, { useState } from 'react';

export default function StudentListItem(props) {
  const { student } = props;
  const [studentName, setStudentName] = useState(student);

  const handleDelete = () => {
    props.deleteStudent(student);
  };

  const handleUpdate = () => {
    props.updateStudent(student, studentName, setStudentName);
  };

  const handleInput = (e) => setStudentName(e.target.value);

  return (
    <div>
      <input value={studentName} type="text" onChange={handleInput} />
      <button type="submit" onClick={handleUpdate}>Update</button>
      <button type="submit" onClick={handleDelete}>Delete</button>
    </div>
  );
}
