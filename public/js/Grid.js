class Grid {
  constructor(params) {
    this.params = params;
    this.initializeForm();
    this.initializeButtons();
  }

  initializeForm() {
    this.formCreate = document.querySelector(this.params.formCreate);
    if (this.formCreate) {
      this.formCreate
        .save()
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    this.formUpdate = document.querySelector(this.params.formUpdate);
    if (this.formUpdate) {
      this.formUpdate
        .save()
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  initializeButtons() {
    const buttonDelete = document.querySelectorAll(this.params.buttonDelete);
    const convert = Array.from(buttonDelete);
    convert.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const row = event.path.find(
          (element) => element.tagName.toUpperCase() === 'TR',
        );
        const data = JSON.parse(row.dataset.row);
        if (confirm(eval(`\`${this.params.deleteMessage}\``))) {
          fetch(eval(`\`${this.params.deleteURL}\``), {
            method: 'DELETE',
          })
            .then((response) => {
              response.json();
            })
            .then((response) => {
              window.location.reload();
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
    });
    const btnUpdate = document.querySelectorAll(this.params.buttonUpdate);
    const toArray = Array.from(btnUpdate);
    toArray.forEach((button) => {
      button.addEventListener('click', (event) => {
        const row = event.path.find(
          (element) => element.tagName.toUpperCase() === 'TR',
        );
        const data = JSON.parse(row.dataset.row);
        for (let name in data) {
          this.params.onUpdateLoad(this.formUpdate, name, data);
        }
        $('#modal-update').modal('show');
      });
    });
  }
}
