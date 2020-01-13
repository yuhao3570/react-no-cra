import React, { useState } from 'react';

export default function StudentListItem(props) {
  const { student } = props;
  const [studentName, setStudentName] = useState([student]);

  const handleButtonClick = (e) => {
    props[e.target.id](student, studentName);
  };

  const handleInput = (e) => setStudentName(e.target.value);

  return (
    <div>
      <input value={studentName} type="text" onChange={handleInput} />
      <button type="submit" id="updateStudent" onClick={handleButtonClick}>Update</button>
      <button type="submit" id="deleteStudent" onClick={handleButtonClick}>Delete</button>
    </div>
  );
}
