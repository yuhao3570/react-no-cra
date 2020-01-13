const url = 'http://localhost:3000/students';

function setUrl(action, data) {
  if (action === 'DELETE' || action === 'PUT') {
    return `${url}/${data.student}`;
  }
  return url;
}

function getStudents(callback) {
  fetch(url)
    .then((res) => res.json())
    .then((result) => callback(result.studentsData))
    .catch();
}

export default (callback, action, data = null) => {
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
    fetch(setUrl(action, data), fetchConfig)
      // .then((res) => res.json())
      // .then((result) => console.log(result.message))
      .then(() => getStudents(callback))
      .catch();
  } else {
    getStudents(callback);
  }
};
