import { Readable, Writable, Transform } from 'stream';

class OneToHundreds extends Readable {
  index = 1;

  _read() {
    const number = this.index++;

    setTimeout(() => {
      if (number > 100) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(number));
        this.push(buffer);
      }
    }, 1000);
  }
}

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTwo extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 2)
    callback();
  }
}

new OneToHundreds()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTwo());