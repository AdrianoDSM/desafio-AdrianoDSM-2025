import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Gato não pode ser adotado se já houver animal com brinquedo compartilhado", () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    "LASER,RATO,BOLA",
    "CAIXA,NOVELO",
    "Bebe,Zero"
  );
  expect(resultado.lista).toEqual([
    "Bebe - pessoa 1",
    "Zero - abrigo"
  ]);
});


  test("Animal vai para o abrigo em caso de empate entre pessoas", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.lista).toEqual(["Rex - abrigo"]);
  });

  test("Loco vai para o abrigo se ninguém tiver outro animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO",
      "SKATE,RATO",
      "Loco"
    );
    expect(resultado.lista).toEqual(["Loco - abrigo"]);
  });
});
