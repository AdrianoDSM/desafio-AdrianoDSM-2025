import animais from '../data/animais'

export function podeAdotar(pessoa, animalNovo, animaisJaAtribuidos) {
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

export function temConflitoDeBrinquedos(brinquedosA, brinquedosB) {
  const mesmaOrdem = brinquedosA.length === brinquedosB.length &&
    brinquedosA.every((b, i) => b === brinquedosB[i]);

  const mesmosItens = brinquedosA.length === brinquedosB.length &&
    brinquedosA.every(b => brinquedosB.includes(b));

  return mesmaOrdem || mesmosItens;
}

export function validarBrinquedos(brinquedosPessoa1, brinquedosPessoa2) {
  const todosBrinquedosValidos = new Set(
    animais.flatMap((a) => a.brinquedosFavoritos)
  );

  const todasPessoas = [brinquedosPessoa1, brinquedosPessoa2];

  for (const entrada of todasPessoas) {
    const brinquedos = entrada.split(",").map((b) => b.trim().toUpperCase());
    const vistos = new Set();

    for (const b of brinquedos) {
      if (vistos.has(b)) return "Brinquedo inválido";
      vistos.add(b);
      if (!todosBrinquedosValidos.has(b)) return "Brinquedo inválido";
    }
  }

  return null;
}

export function houveEmpate(animal, pessoa1, pessoa2, jaAtribuidos1, jaAtribuidos2) {
  const pode1 = podeAdotar(pessoa1, animal, jaAtribuidos1);
  const pode2 = podeAdotar(pessoa2, animal, jaAtribuidos2);

  return pode1 && pode2;
}

export function gatoNaoDivide(animalNovo, animaisJaAtribuidos) {
  if (animalNovo.especie !== "gato") return false;

  const brinquedosGato = new Set(animalNovo.brinquedosFavoritos);

  for (const outro of animaisJaAtribuidos) {
    for (const brinquedo of outro.brinquedosFavoritos) {
      if (brinquedosGato.has(brinquedo)) {
        return true;
      }
    }
  }

  return false;
}

export function limiteAdocao(adotados) {
  return adotados.length >= 3;
}

export function podeAdotarLoco(pessoa, adotados) {
  return adotados.length > 0;
}