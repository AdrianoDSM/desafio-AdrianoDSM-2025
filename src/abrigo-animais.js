import animais from "./data/animais";
import { 
  podeAdotar, 
  validarBrinquedos, 
  houveEmpate, 
  gatoNaoDivide, 
  limiteAdocao, 
  podeAdotarLoco
 } from "./utils/validacoes";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const erroBrinquedos = validarBrinquedos(brinquedosPessoa1, brinquedosPessoa2);
    if (erroBrinquedos) return { erro: erroBrinquedos, lista: undefined };

    const pessoas = [brinquedosPessoa1, brinquedosPessoa2].map(
      (entrada, i) => ({
        brinquedos: entrada.split(",").map((b) => b.trim().toUpperCase()),
        id: `pessoa ${i + 1}`,
      })
    );

    const ordem = ordemAnimais.split(",").map((ref) => ref.trim());
    const lista = [];

    const nomesUnicos = new Set();
    for (const nome of ordem) {
      if (nomesUnicos.has(nome)) return { erro: "Animal inválido", lista: undefined };
      nomesUnicos.add(nome);
      const animal = animais.find((a) => a.nome === nome);
      if (!animal) return { erro: "Animal inválido", lista: undefined };
    }

    for (const nome of ordem) {
      const animal = animais.find((a) => a.nome === nome);
      const pessoa1 = pessoas[0];
      const pessoa2 = pessoas[1];

      const adotados1 = lista.filter(item => item.includes(pessoa1.id)).map(item => item.split(" - ")[0]);
      const adotados2 = lista.filter(item => item.includes(pessoa2.id)).map(item => item.split(" - ")[0]);

      const jaAtribuidos1 = adotados1.map(n => animais.find(a => a.nome === n));
      const jaAtribuidos2 = adotados2.map(n => animais.find(a => a.nome === n));

      if (houveEmpate(animal, pessoa1, pessoa2, jaAtribuidos1, jaAtribuidos2)) {
        lista.push(`${animal.nome} - abrigo`);
        continue;
      }

      let adotado = false;

      for (const [pessoa, jaAtribuidos, adotados] of [
        [pessoa1, jaAtribuidos1, adotados1],
        [pessoa2, jaAtribuidos2, adotados2]
      ]) {
        if (gatoNaoDivide(animal, jaAtribuidos)) continue;

        if (limiteAdocao(adotados)) continue;

        if (animal.nome === "Loco" && !podeAdotarLoco(pessoa, adotados)) continue;

        if (podeAdotar(pessoa, animal, jaAtribuidos)) {
          lista.push(`${animal.nome} - ${pessoa.id}`);
          adotado = true;
          break;
        }
      }

      if (!adotado) {
        lista.push(`${animal.nome} - abrigo`);
      }
    }

    lista.sort((a, b) => a.localeCompare(b));
    return { erro: false, lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
