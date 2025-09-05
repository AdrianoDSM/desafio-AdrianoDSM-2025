import animais from "./data/animais";
import { podeAbrigar } from "./utils/validacoes";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    {
      const pessoas = [
        {
          nome: "pessoa 1",
          brinquedos: brinquedosPessoa1
            .split(",")
            .map((b) => b.trim().toUpperCase()),
        },
        {
          nome: "pessoa 2",
          brinquedos: brinquedosPessoa2
            .split(",")
            .map((b) => b.trim().toUpperCase()),
        },
      ];

      const ordem = ordemAnimais.split(",").map((ref) => ref.trim());

      const lista = [];
      for (const ref of ordem) {
        const animal = animais.find((a) => a.nome === ref);
        if (!animal) {
          return { erro: "Animal inválido", lista: undefined };
        }
      }

      pessoas.forEach((pessoa, index) => {
        const aptos = [];

        ordem.forEach((ref) => {
          const animal = animais.find((a) => a.nome === ref);
          if (podeAbrigar(pessoa, animal, aptos)) {
            aptos.push(`${animal.nome} - pessoa ${index + 1}`);
          }
        });

        lista.push(...aptos);
      });

      return { erro: false, lista };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
