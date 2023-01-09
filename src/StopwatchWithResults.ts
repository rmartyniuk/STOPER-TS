import Stopwatch from './Stopwatch.js'

class StopwatchWithResults extends Stopwatch {

  results: string[] = []

  constructor(element: HTMLDivElement) {
    super(element)
    this.prepareElements(element)
    this.prepareActions()
  }

  private prepareElements(element: HTMLDivElement): void {
    this.dom.resultsList = element.querySelector(
      ".stopwatch__results"
    ) as HTMLDivElement;
    this.dom.addToListBtn = element.querySelector(
      ".stopwatch__add-to-list-btn"
    ) as HTMLButtonElement;
    this.dom.resetListBtn = element.querySelector(
      ".stopwatch__reset-list-btn"
    ) as HTMLButtonElement;
    this.dom.resultHead = element.querySelector(
      ".stopwatch__results__heading"
    ) as HTMLElement;
  }

  prepareActions(): void {
    /*
    Funkcja ta powinna dodawać nasłuchwiacze do buttonów this.dom.addToListBtn oraz this.dom.resetListBtn.
    Pierwszy powinien po kliknięciu uruchamiać metodę this.addToList, a druga this.resetList.
    */
    this.dom.addToListBtn.addEventListener("click", () => this.addToList());
    this.dom.resetListBtn.addEventListener("click", () => this.resetList());
  }

  private renderList(): void {
    /*
    Funkcja ta powinna czyścić zawartość this.dom.resultsList, a następnie renderować w niej nowe elementy li
    na podstawie zawartości tablicy this.results. Każdy jej element powinien być renderowany bez żadnych zmian.

    np. <li>00:12:00</li>
    */
    this.dom.resultsList.replaceChildren(this.dom.resultHead);

    const resultHTMLElem = `<ul>${this.results
      .map((currentTime) => `<li><p>${currentTime}</p></li>`)
      .join(" ")}</ul>`;

    this.dom.resultsList.insertAdjacentHTML("beforeend", resultHTMLElem);
  }

  protected addToList(): void {
    /*
    Funkcja ta powinna pobierać aktualny czas z this.currentTime, formatować go i w takiej postaci zapisywać do tablicy this.results.
    Następnie powinna renderować aktualną listę na stronie (this.renderList).
    */
    const resultToArr = this.formatTime(this.currentTime);
    this.results.push(resultToArr);

    this.renderList();
  }

  protected resetList() {
    /*
    Funkcja ta powinna czyścić tablicę this.results oraz zawartość this.dom.resultsList
    */
    this.dom.resultsList.replaceChildren(this.dom.resultHead);

    const noResultText: string = "no results :(";
    const resultHTMLElem = `<ul><li><p>${noResultText}</p></li></ul>`;

    this.dom.resultsList.insertAdjacentHTML(
      "beforeend",
      resultHTMLElem as string
    );
  }
}

export default StopwatchWithResults