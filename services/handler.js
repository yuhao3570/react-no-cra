const url = 'http://localhost:3000/students';

function setUrl(action, data) {
  if (action === 'DELETE' || action === 'PUT') {
    return `${url}/${data.student}`;
  }
  return url;
}

const headersProcessor = {
  GET: {},
  OTHERS: { 'Content-Type': 'application/json' },
};

const bodyProcessor = {
  GET: () => null,
  OTHERS: (data) => JSON.stringify(data),
};

export default (action, data = null, callback) => {
  const fetchConfig = {
    method: action,
    headers: (headersProcessor[action] || headersProcessor.OTHERS),
    body: (bodyProcessor[action] || bodyProcessor.OTHERS)(data),
  };
  console.log(fetchConfig);
  fetch(setUrl(action, data), fetchConfig)
    .then((res) => res.json())
    .then(callback)
    .catch();
};
