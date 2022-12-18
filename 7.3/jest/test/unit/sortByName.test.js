const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("Books names", () => {
    expect(
      sorting.sortByName([
        "481",
        "481",
        "Властелин Колец",
        "Дети капитана Гранта",
      ])
    ).toEqual(["481", "481", "Властелин Колец", "Дети капитана Гранта"]);
  });
});
