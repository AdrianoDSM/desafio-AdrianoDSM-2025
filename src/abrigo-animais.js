import animais from "./data/animais";
import { podeAbrigar } from "./utils/validacoes";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoas = [brinquedosPessoa1, brinquedosPessoa2].map(
      (entrada, i) => ({
        brinquedos: entrada.split(",").map((b) => b.trim().toUpperCase()),
        id: `pessoa ${i + 1}`,
      })
    );

    const ordem = ordemAnimais.split(",").map((ref) => ref.trim());
    const lista = [];

    for (const nome of ordem) {
      const animal = animais.find((a) => a.nome === nome);
      if (!animal) return { erro: "Animal inválido", lista: undefined };
    }

    pessoas.forEach((pessoa) => {
      const adotados = [];

      ordem.forEach((nome) => {
        const animal = animais.find((a) => a.nome === nome);
        const jaAtribuidos = adotados.map((n) =>
          animais.find((a) => a.nome === n)
        );

        if (podeAbrigar(pessoa, animal, jaAtribuidos)) {
          adotados.push(animal.nome);
          lista.push(`${animal.nome} - ${pessoa.id}`);
        }
      });
    });

    return { erro: false, lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
