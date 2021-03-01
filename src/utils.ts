const chars = 'ｱｲｳｵｶｸｹｻｼｽｾｿﾀﾁﾂﾃﾄﾊﾋﾌﾎﾅﾇﾈﾏﾑﾒﾓﾗﾘﾙﾚﾔﾕﾜABCDEFGHIJKLMNPQRSTUVWXYZ0123456789#$&';

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number) {
  return Math.floor(random(min, max));
}

export function randomChar() {
  return chars.charAt(randomInt(0, chars.length - 1));
}