import { randomChar, randomInt } from "./utils.js";

const SPEED = 3;

export class Raindrop {
  private _row = -1;
  private _frames = 0;
  private _delete = false;
  private _glyphLifetime = randomInt(60, 120);
  constructor(
    private _column: number,
  ) {}
  onUpdate(glyphs: Glyph[][], rows) {
    if(this._frames > SPEED) {
      this._row += 1;
      let g = glyphs[this._column][this._row];
      if(g !== undefined) {
        g.character = randomChar();
        g.timeSinceBirth = 0;
        g.lifetime = this._glyphLifetime;
        g.alive =  true;
      }
      this._frames = 0;
    }
    this._frames++;
    if (this._row >= rows) {
      // console.log(this._row);
      this._delete = true;
    }
  }
  get shouldDelete() {
    return this._delete;
  }
}

export interface Glyph{
  character: string,
  timeSinceBirth: number,
  lifetime: number,
  alive: boolean
}