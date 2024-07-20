//Interface setup for 'dom' element inside the class
interface StopwatchDom {
  currentTime: HTMLDivElement;
  wrapperBtns: HTMLDivElement; 
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  [x: string]: HTMLElement;
}

abstract class Stopwatch {
  protected currentTime: number = 0;
  protected convertedTime: string = '';
  private timer: number | null = null;
  protected dom = {} as StopwatchDom;

  constructor(element: HTMLDivElement) {
    this.getElements(element);
    this.initActions();
    this.renderTime();
  }

  private getElements(element: HTMLDivElement): void {
    this.dom.currentTime = <HTMLDivElement> element.querySelector('.stopwatch__current-time');
    this.dom.startBtn = <HTMLButtonElement> element.querySelector('.stopwatch__start-btn');
    this.dom.stopBtn = <HTMLButtonElement> element.querySelector('.stopwatch__stop-btn');
    this.dom.resetBtn = <HTMLButtonElement> element.querySelector('.stopwatch__reset-btn');
    this.dom.wrapperBtns = <HTMLDivElement> element.querySelector('.stopwatch__actions');
  }


  private initActions(): void {
    this.dom.wrapperBtns.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('stopwatch__button')) {
        if (target.classList.contains('stopwatch__start-btn')) this.start();
        else if (target.classList.contains('stopwatch__stop-btn')) this.stop();
        else this.reset();
      }
    })

    /*
    Funkcja ta powinna nadać buttonom z buttonów stopwatch__actions odpowiednie nasłuchiwacze na event click. 
    Kliknięcie na każdy z buttonów powinno uruchamiać odpowiednie funkcje.

    Start -> start()
    Stop -> stop()
    Reset -> reset()

    Aby dostać się do tych elementów, wykorzystaj referencję przygotowane wcześniej w funkcji this.getElements.
    */
  }

  protected formatTime(time: number): void {
    const milliseconds = Math.floor((time / 10) % 100);
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000) % 60;
    
    const formatedTime: string = `
    ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
   
    this.convertedTime = formatedTime;
    this.renderTime(formatedTime);
  }


private renderTime(formatedTime: string = "00:00:00") {

    this.dom.currentTime.innerHTML = formatedTime;
    /*
    Funkcja ta powinna renderować w stopwatch__current-time zawartość obiektu this.currentTime.
    Oczywiście wcześniej należy sformatować czas przy użyciu funkcji this.formatTime. 
    */
  }

  private start(): void {
    this.timer = 10
    this.step(); 
    setInterval(() => {
      if (this.timer !== null) {
        this.timer += 10;
      }
      this.step(); 
    }, 10);
    /*
    Funkcja ta powinna wystartować interwał, który będzie wykonywał się co milisekundę.
    Powinien on każdorazowo włączać funkcję this.step

    Dla wygody przypisz ten interwał do this.timer
    */
  }

  private step(): void {
    if (this.timer !== null) this.formatTime(this.currentTime = this.timer)
    /*
    Funkcja ta powinna zwiększać liczbę sekund w this.currentTime o jeden, a następnie uruchamiać metodę
    renderującą aktualny czas w HTML-u (this.renderTime).
    */
  }

  private stop(): void {
    this.timer = null;
    /* 
    Funkcja ta powinna zatrzymywać interval przypisany do this.timer.
    */
  }

  private reset(): void {
    this.dom.currentTime.innerHTML = "00:00:00";
    this.currentTime = 0;
    /*
    Ta funkcja powinna resetować czas zapisany w this.currentTime, a więć zmieniać jego wartość na zero.
    Naturalnie powinno to wiązać się również z przerenderowaniem HTML-a (this.renderTime).
    */
  }

}

export default Stopwatch