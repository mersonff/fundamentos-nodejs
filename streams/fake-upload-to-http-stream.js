import { Readable } from 'node:stream';

class OneToHundreds extends Readable {
  index = 1;

  _read() {
    const number = this.index++;

    setTimeout(() => {
      if (number > 5) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(number));
        this.push(buffer);
      }
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundreds(),
  duplex: 'half'
}).then(response => response.text()).then(data => console.log(data));