export function podeAbrigar(pessoa, animal, outrosAnimais) {
  const brinquedosPessoa = pessoa.brinquedos;
  const brinquedosAnimal = animal.brinquedosFavoritos;

  for (let i = 0; i < brinquedosAnimal.length; i++) {
    if (brinquedosPessoa[i] !== brinquedosAnimal[i]) return false;
  }

  if (outrosAnimais.length > 0 && brinquedosPessoa.length > 6) return false;

  return true;
}
