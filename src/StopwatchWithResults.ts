import Stopwatch from './Stopwatch.js'


class StopwatchWithResults extends Stopwatch {
  results: string[] = []

  constructor(element: HTMLDivElement) {
    super(element)
    this.prepareElements(element)
    this.prepareActions()
    this.results = [];
    console.log(this)
  }

  prepareElements(element: HTMLDivElement): void {
    this.dom.resultsList = element.querySelector('.stopwatch__results ul') as HTMLDivElement
    this.dom.addToListBtn = element.querySelector('.stopwatch__add-to-list-btn') as HTMLButtonElement
    this.dom.resetListBtn = element.querySelector('.stopwatch__reset-list-btn') as HTMLButtonElement
    this.dom.removeItem = element.querySelector('#remove') as HTMLElement
  }

  prepareActions() {
    this.dom.addToListBtn.addEventListener('click', () => this.addToList());
    this.dom.resetListBtn.addEventListener('click', () => this.resetList());
    /*
    Funkcja ta powinna dodawać nasłuchwiacze do buttonów this.dom.addToListBtn oraz this.dom.resetListBtn.
    Pierwszy powinien po kliknięciu uruchamiać metodę this.addToList, a druga this.resetList.
    */
  }

  renderList() {

    if (!this.results.length) this.dom.resultsList.children[0].remove();
    /*
    Funkcja ta powinna czyścić zawartość this.dom.resultsList, a następnie renderować w niej nowe elementy li
    na podstawie zawartości tablicy this.results. Każdy jej element powinien być renderowany bez żadnych zmian.

    np. <li>00:12:00</li>
    */
  }

  addToList() {
    this.renderList();
    this.results.unshift(this.convertedTime.slice(5));
    let domElement: HTMLLIElement = document.createElement("li"); 
    domElement.innerHTML = `${this.results[0]}`

    this.dom.resultsList.prepend(domElement);

    /*
    Funkcja ta powinna pobierać aktualny czas z this.currentTime, formatować go i w takiej postaci zapisywać do tablicy this.results.
    Następnie powinna renderować aktualną listę na stronie (this.renderList).
    */
  }

  resetList() {
    this.dom.resultsList.children[0].remove();
    this.dom.resultsList.innerHTML = '<li>No results:(</li>';
    /*
    Funkcja ta powinna czyścić tablicę this.results oraz zawartość this.dom.resultsList
    */
  }

}

export default StopwatchWithResults