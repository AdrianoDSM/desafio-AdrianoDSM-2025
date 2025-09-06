export function podeAbrigar(pessoa, animalNovo, animaisJaAtribuidos) {
  const brinquedosPessoa = pessoa.brinquedos;
  const brinquedosAnimal = animalNovo.brinquedosFavoritos;

  for (let i = 0, j = 0; i < brinquedosAnimal.length && j < brinquedosPessoa.length; j++) {
    if (brinquedosPessoa[j] === brinquedosAnimal[i]) {
      i++;
    }
    if(i === brinquedosAnimal.length) break;
  }
  if (brinquedosAnimal.some((b, i) => brinquedosPessoa.indexOf(b) < i)) return false;

  for (const outro of animaisJaAtribuidos) {
    if (temConflitoDeBrinquedos(outro.brinquedosFavoritos, brinquedosAnimal)){
      return false;
    }
  }
  return true;
}

function temConflitoDeBrinquedos(brinquedosA, brinquedosB) {
  const mesmaOrdem = brinquedosA.length === brinquedosB.length &&
    brinquedosA.every((b, i) => b === brinquedosB[i]);

  const mesmosItens = brinquedosA.length === brinquedosB.length &&
    brinquedosA.every(b => brinquedosB.includes(b));

  return mesmaOrdem || mesmosItens;
}