HTMLFormElement.prototype.save = function () {
  const form = this;
  return new Promise((resolve, reject) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const submit = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: submit,
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
