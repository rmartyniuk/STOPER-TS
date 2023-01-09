interface StopWatchDom {
  currentTime: HTMLDivElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  [x: string]: HTMLElement;
}

abstract class Stopwatch {

  protected currentTime: number = 0;
  private timer: number | null = null;
  protected dom = <StopWatchDom>{}

  constructor(element: HTMLDivElement) {
    this.getElements(element)
    this.initActions()
    this.renderTime()
  }

  private getElements(element: HTMLDivElement) {
    /*
    Funkcja ta powinna przyjąć jako argument referencję do elementu DOM, w którym znajduje się
    cała struktura stopera. Następnie powinna przygotować referencję do obecnych w tym elemencie dzieci.    
    Konkretnie do: 
    – stopwatch__current-time, 
    – wszystkich buttonów stopwatch__actions
    Wszystkie referencje dla czytelności przechowuj w obiekcie this.dom.
    */

    this.dom.currentTime = <HTMLDivElement>(
      element.querySelector(".stopwatch__current-time")
    );
    this.dom.startBtn = <HTMLButtonElement>(
      element.querySelector(".stopwatch__start-btn")
    );
    this.dom.stopBtn = <HTMLButtonElement>(
      element.querySelector(".stopwatch__stop-btn")
    );
    this.dom.resetBtn = <HTMLButtonElement>(
      element.querySelector(".stopwatch__reset-btn")
    );
  }

  private initActions(): void {
    /*
    Funkcja ta powinna nadać buttonom z buttonów stopwatch__actions odpowiednie nasłuchiwacze na event click. 
    Kliknięcie na każdy z buttonów powinno uruchamiać odpowiednie funkcje.

    Start -> start()
    Stop -> stop()
    Reset -> reset()

    Aby dostać się do tych elementów, wykorzystaj referencję przygotowane wcześniej w funkcji this.getElements.
    */
    this.dom.startBtn.addEventListener("click", () => {
      if (this.timer !== null) {
        clearInterval(this.timer);
      }
      this.start();
    });
    this.dom.stopBtn.addEventListener("click", () =>
      this.stop());
    this.dom.resetBtn.addEventListener("click", () =>
      this.reset());
  }

  protected formatTime(time: number): string {
    /*
    Funkcja ta powinna przyjmować czas w milisekundach a następnie zwracać go w formacie mm:ss:ms (np. 02:23:12).
    */
    const pad0 = (num: number): string =>
      num < 10 ? `0${num}` : num.toString();

    const pad0forMs = (num: number): string => {
      const numLength = num.toString().length;
      if (numLength === 1) return `00${num}`;
      else if (numLength === 2) return `0${num}`;
      else return num.toString();
    };

    const mm = Math.floor(time / 60000);
    const ss = Math.floor((time - mm * 60000) / 1000);
    const ms = time - mm * 60000 - ss * 1000;
    return `${pad0(mm)}:${pad0(ss)}:${pad0forMs(ms).substr(0, 2)}`;
  }


  protected renderTime(): void {
    /*
    Funkcja ta powinna renderować w stopwatch__current-time zawartość obiektu this.currentTime.
    Oczywiście wcześniej należy sformatować czas przy użyciu funkcji this.formatTime. 
    */

    this.dom.currentTime.innerHTML = this.formatTime(this.currentTime);
  }

  protected start(): void {
    /*
    Funkcja ta powinna wystartować interwał, który będzie wykonywał się co milisekundę.
    Powinien on każdorazowo włączać funkcję this.step
  
    Dla wygody przypisz ten interwał do this.timer
    */

    this.timer = setInterval(() => {
      this.step();
    }, 1) as any;
  }

  protected step(): void {
    /*
    Funkcja ta powinna zwiększać liczbę sekund w this.currentTime o jeden, a następnie uruchamiać metodę
    renderującą aktualny czas w HTML-u (this.renderTime).
    */
    this.currentTime = this.currentTime + 1;
    this.renderTime();
  }

  protected stop(): void {
    /* 
    Funkcja ta powinna zatrzymywać interval przypisany do this.timer.
    */
    clearInterval(this.timer as number);
  }

  reset() {
    /*
    Ta funkcja powinna resetować czas zapisany w this.currentTime, a więć zmieniać jego wartość na zero.
    Naturalnie powinno to wiązać się również z przerenderowaniem HTML-a (this.renderTime).
    */
    this.currentTime = 0;

    this.dom.currentTime.innerHTML =
      this.formatTime(this.currentTime);
  }
}

export default Stopwatch