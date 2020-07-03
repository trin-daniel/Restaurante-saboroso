class ImageReader {
  constructor(input, image) {
    this.input = input;
    this.image = image;
    this.initialize();
  }

  initialize() {
    document.querySelector(this.input).addEventListener('change', (event) => {
      ImageReader.reader(event.target.files[0]).then((response) => {
        document.querySelector(this.image).src = response;
      });
    });
  }

  static reader(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        const err = 'Erro na leitura da imagem';
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }
}
