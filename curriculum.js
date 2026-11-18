// Curriculum di Piano da zero: livelli, schede e lezioni.
// Token: "C4" semiminima, "C4:2" minima, "C4:.5" croma, "C3+E3+G3" accordo, "r:1" pausa, "*C" un Do qualsiasi, "Bb4" bemolle.
const ODE = 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4:1.5 D4:.5 D4:2 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4:1.5 C4:.5 C4:2';
const POP_RH = 'C4+E4+G4 B3+D4+G4 A3+C4+E4 A3+C4+F4';
const LEVELS = [
  { title:'La tastiera', d:'Bianchi e neri, il Do, le 7 note, le dita, il pentagramma.', c:'#ee4b2b', ci:'#111', lessons:[
    { t:'Bianchi e neri', cards:[
      { anim:'groups', h:'Questa è la tastiera', p:'Tasti bianchi e tasti neri. I neri sono a gruppi: due, poi tre, poi di nuovo due e tre. Lo stesso schema si ripete per tutta la tastiera.', mark:'*#' },
      { h:'Suona tre tasti neri', p:'Uno qualsiasi, poi un altro, poi un altro. Il suono parte da qui: la pianola o il microfono sentono cosa suoni.', play:'*# *# *#' },
      { anim:'lowhigh', h:'Sinistra grave, destra acuto', p:'I tasti a sinistra fanno suoni bassi e gravi, quelli a destra suoni alti e acuti. Prova a suonare un tasto all\'inizio e uno alla fine della pianola.' } ]},
    { t:'Trova il Do', cards:[
      { anim:'find:C', h:'Il Do', p:'Il Do è il tasto bianco subito a sinistra dei due tasti neri. Ce n\'è uno per ogni gruppo da due.', mark:'*C' },
      { h:'Suona quattro Do', p:'Prima uno qualsiasi: vedi che ce ne sono tanti. Poi usa sempre quello in mezzo, il più vicino alla mano: è il Do da cui partono le lezioni.', play:'*C C4 C4 C4' } ]},
    { t:'Le sette note', cards:[
      { anim:'seven', h:'Do Re Mi Fa Sol La Si', p:'Sono i sette tasti bianchi, sempre in quest\'ordine. Dopo il Si ricomincia un altro Do.' },
      { h:'Suonale in fila', p:'Parti dal Do in mezzo alla tastiera e sali verso destra, un tasto bianco alla volta.', play:'C4 D4 E4 F4 G4 A4 B4' },
      { anim:'find:F', h:'Il Fa', p:'Il Fa è il tasto bianco a sinistra dei tre tasti neri. Prima uno qualsiasi, poi quello in mezzo, vicino alla mano.', mark:'*F', play:'*F F4 F4' } ]},
    { t:'Il Do centrale', cards:[
      { anim:'middleC', h:'Il Do centrale', p:'È il Do a metà della tastiera, di solito sotto il nome della pianola. Qui sotto ha un pallino. Tutte le prime lezioni partono da lui.', play:'C4 C4 C4' } ]},
    { t:'Le dita hanno un numero', cards:[
      { anim:'fingers', h:'Ogni dito ha un numero', p:'Pollice 1, indice 2, medio 3, anulare 4, mignolo 5. Vale per tutte e due le mani. Il numero appare sul tasto da suonare.' },
      { h:'Un dito per tasto', p:'Pollice destro sul Do centrale, poi un dito per tasto fino al Sol. Le dita stanno curve, come se tenessi una palla.', play:'C4 D4 E4 F4 G4', f:'1 2 3 4 5' } ]},
    { t:'Il pentagramma', cards:[
      { anim:'staff', h:'Le note si scrivono su 5 linee', p:'Più una nota è in alto, più è acuta. Il simbolo a sinistra è la chiave di violino: indica la mano destra.', staff:true },
      { h:'Leggi e suona', p:'Il Do centrale sta su una lineetta sotto le 5 linee. Ogni nota dopo sale di un gradino: spazio, linea, spazio…', staff:true, play:'C4 D4 E4 F4 G4 G4 F4 E4 D4 C4', f:'1 2 3 4 5 5 4 3 2 1' },
      { h:'Ora senza nomi', p:'Leggi solo dal pentagramma. Se ti blocchi, conta i gradini dal Do.', staff:true, hideNames:true, play:'C4 E4 D4 F4 E4 G4 C4', f:'1 3 2 4 3 5 1' } ]} ]},
  { title:'Prime note', d:'Do, Re e Mi con la mano destra.', c:'#2747d6', ci:'#fff', lessons:[
    { t:'Do e Re', pos:'R', tip:'Pollice sul Do, indice sul Re.', n:'C4 D4 C4 D4 D4 C4 D4 C4' },
    { t:'Do Re Mi', pos:'R', tip:'Dita 1, 2, 3.', n:'C4 D4 E4 D4 C4 E4 D4 C4 C4 D4 E4 E4' },
    { t:'Salti', pos:'R', tip:'Do e Mi senza passare dal Re.', n:'C4 E4 C4 E4 D4 E4 C4 D4 E4 C4' } ]},
  { title:'Il ritmo', d:'Contare i battiti: semiminima, minima, semibreve e pausa.', c:'#0b7a75', ci:'#fff', lessons:[
    { t:'Contare fino a 4', cards:[
      { h:'La musica ha un battito', p:'Come il cuore: regolare. Si conta 1, 2, 3, 4 e si ricomincia. Ogni gruppo da 4 è una battuta, chiusa da una stanghetta.' },
      { h:'La semiminima', p:'La nota piena con il gambo dura 1 battito. Suona il Do e conta ad alta voce: uno, due, tre, quattro.', staff:true, play:'C4 C4 C4 C4 C4 C4 C4 C4', f:'1 1 1 1 1 1 1 1' } ]},
    { t:'La minima', cards:[
      { h:'La minima dura 2', p:'Testa vuota con il gambo: tieni premuto il tasto per 2 battiti. Conta "uno-due" mentre tieni giù.', staff:true, play:'C4:2 C4:2 D4:2 D4:2 E4:2 D4:2 C4:4', f:'1 1 2 2 3 2 1' } ]},
    { t:'La semibreve', pos:'R', tip:'Testa vuota senza gambo: 4 battiti. Prova anche la modalità A tempo.', n:'C4 D4 E4:2 E4 D4 C4:2 C4:4 E4 D4 C4 D4 E4:2 D4:2 C4:4' },
    { t:'La pausa', cards:[
      { h:'Anche il silenzio si conta', p:'La pausa è un battito senza suono: alza il dito ma continua a contare. In modalità Impara si salta, a tempo va rispettata.', staff:true, play:'C4 r C4 r D4 r D4 r E4 E4 r:2 C4:4' } ]},
    { t:'Ritmo misto', pos:'R', tip:'Usa A tempo 70% e conta ad alta voce.', n:'C4 D4 E4 C4 E4:2 E4:2 D4 D4 E4 D4 C4:4 E4 F4 G4:2 F4 E4 D4:2 C4 E4 D4:2 C4:4' },
    { t:'Prima marcia', goal:true, pos:'R', bpm:84, tip:'Brano originale con la base: minime, semiminime e semibrevi.',
      n:'C4:2 E4:2 G4:2 E4:2 F4 E4 D4:2 C4:4 E4 F4 G4:2 A4 G4 F4:2 E4 D4 E4 F4 E4:2 D4:2 C4:4',
      acc:'C . . . G . . C C . . F . . C . . . G . C' } ]},
  { title:'Cinque dita', d:'Da Do a Sol, una dita per tasto. Le prime melodie vere.', c:'#f2b705', ci:'#111', lessons:[
    { t:'Fa e Sol', pos:'R', tip:'Anulare sul Fa, mignolo sul Sol.', n:'E4 F4 G4 F4 E4 G4 F4 E4 C4 G4' },
    { t:'Su e giù', pos:'R', tip:'Senza guardare le mani.', n:'C4 D4 E4 F4 G4 G4 F4 E4 D4 C4' },
    { t:'Inno alla gioia', pos:'R', tip:'Beethoven, tutto in posizione Do.', n:ODE },
    { t:'Una pecorella', pos:'R', tip:'Mary had a little lamb.', n:'E4 D4 C4 D4 E4 E4 E4:2 D4 D4 D4:2 E4 G4 G4:2 E4 D4 C4 D4 E4 E4 E4 E4 D4 D4 E4 D4 C4:4' },
    { t:'Prima luce', goal:true, pos:'R', bpm:88, tip:'Brano originale con la base: la musica parte ogni volta che suoni la nota giusta.',
      n:'E4 E4 G4 E4 D4 E4 D4 C4 E4 F4 G4 E4 D4 C4 D4 D4 G4 G4 F4 E4 F4 F4 E4 D4 E4 E4 D4 C4 D4 E4 C4:2',
      acc:'C . . . G . . . Am . . . F . . . C . . . G . . . Am . . . G . C' } ]},
  { title:'Mano sinistra', d:'La chiave di basso e le prime note con la sinistra.', c:'#1f9d6b', ci:'#111', lessons:[
    { t:'La chiave di basso', cards:[
      { anim:'bass', h:'Il pentagramma di sotto', p:'La mano sinistra legge sul pentagramma in basso, in chiave di basso. Il Do un\'ottava sotto il centrale sta nel secondo spazio dal basso.', staff:true },
      { h:'Mignolo sul Do', p:'Mano sinistra: mignolo (5) sul Do sotto il centrale, poi un dito per tasto. Il pollice arriva sul Sol.', staff:true, play:'C3 D3 E3 F3 G3', f:'5 4 3 2 1' } ]},
    { t:'Do basso', pos:'L', tip:'Mignolo sinistro sul Do.', n:'C3 C3 D3 D3 E3 E3 D3 C3' },
    { t:'Cinque dita a sinistra', pos:'L', tip:'Dita 5-4-3-2-1.', n:'C3 D3 E3 F3 G3 F3 E3 D3 C3' },
    { t:'Inno alla gioia a sinistra', pos:'L', tip:'La stessa melodia, con la sinistra.', n:ODE.replace(/4/g,'3') } ]},
  { title:'Leggere per intervalli', d:'Leggere guardando la distanza tra le note, non nota per nota.', c:'#f4a6c0', ci:'#111', lessons:[
    { t:'Seconde e terze', cards:[
      { anim:'intervals', h:'Leggere per salti', p:'Non serve riconoscere ogni nota: guarda la distanza. Da linea a spazio vicino è una seconda, il tasto accanto. Da linea a linea è una terza: salti un tasto.', staff:true },
      { h:'Seconde', p:'Note che salgono o scendono di un gradino: un dito dopo l\'altro.', staff:true, play:'C4 D4 E4 F4 G4 F4 E4 D4 C4', f:'1 2 3 4 5 4 3 2 1' },
      { h:'Terze', p:'Linea-linea o spazio-spazio: salti un dito.', staff:true, play:'C4 E4 D4 F4 E4 G4 E4 C4', f:'1 3 2 4 3 5 3 1' } ]},
    { t:'Quarte e quinte', cards:[
      { h:'Salti più grandi', p:'La quarta salta due tasti, la quinta tre: dal pollice al mignolo, in posizione di Do.', staff:true, play:'C4 F4 C4 G4 D4 G4 C4:2', f:'1 4 1 5 2 5 1' } ]},
    { t:'Leggi a prima vista', pos:'R', hideNames:true, tip:'Senza nomi: guarda solo i salti tra una nota e l\'altra.', n:'E4 G4 F4 D4 E4 C4 D4:2 G4 E4 F4 D4 C4 E4 C4:2' },
    { t:'Intervalli con la sinistra', pos:'L', hideNames:true, tip:'Stessa lettura, in chiave di basso.', n:'C3 E3 G3 E3 D3 F3 E3:2 G3 C3 G3 D3 C3:4' } ]},
  { title:'Melodie famose', d:'Brani interi, con piccoli spostamenti della mano.', c:'#e0367a', ci:'#111', lessons:[
    { t:'Brilla brilla stellina', pos:'R', tip:'Il salto Do→Sol: apri la mano.', n:'C4 C4 G4 G4 A4 A4 G4:2 F4 F4 E4 E4 D4 D4 C4:2 G4 G4 F4 F4 E4 E4 D4:2 G4 G4 F4 F4 E4 E4 D4:2 C4 C4 G4 G4 A4 A4 G4:2 F4 F4 E4 E4 D4 D4 C4:2' },
    { t:'Fra Martino', pos:'R', tip:'Alla fine scende al Sol sotto il Do.', n:'C4 D4 E4 C4 C4 D4 E4 C4 E4 F4 G4:2 E4 F4 G4:2 G4:.5 A4:.5 G4:.5 F4:.5 E4 C4 G4:.5 A4:.5 G4:.5 F4:.5 E4 C4 C4 G3 C4:2 C4 G3 C4:2' },
    { t:'Jingle Bells', pos:'R', tip:'Il ritornello completo.', n:'E4 E4 E4:2 E4 E4 E4:2 E4 G4 C4:1.5 D4:.5 E4:4 F4 F4 F4:1.5 F4:.5 F4 E4 E4 E4:.5 E4:.5 E4 D4 D4 E4 D4:2 G4:2 E4 E4 E4:2 E4 E4 E4:2 E4 G4 C4:1.5 D4:.5 E4:4 F4 F4 F4:1.5 F4:.5 F4 E4 E4 E4:.5 E4:.5 G4 G4 F4 D4 C4:4' },
    { t:'Tanti auguri', notime:true, tip:'Salti d\'ottava: sposta tutta la mano.', n:'G4 G4 A4 G4 C5 B4 G4 G4 A4 G4 D5 C5 G4 G4 G5 E5 C5 B4 A4 F5 F5 E5 C5 D5 C5' },
    { t:'Città di notte', goal:true, bpm:84, tip:'Brano originale pop in La minore: La minore, Fa, Do, Sol.',
      n:'A4 A4 G4 E4 F4 F4 E4 C4 E4 E4 D4 C4 D4 D4 E4 G4 A4 C5 B4 A4 G4 A4 F4 E4 C4 D4 E4 G4 G4 F4 E4 D4 C4:4',
      acc:'Am . . . F . . . C . . . G . . . Am . . . F . . . C . . . G . . . C' } ]},
  { title:'Posizione di Sol', d:'Spostare la mano: cinque dita da Sol a Re.', c:'#3a86ff', ci:'#111', lessons:[
    { t:'La posizione di Sol', cards:[
      { h:'Sposta la mano', p:'Pollice destro sul Sol sopra il Do centrale: le dita coprono Sol, La, Si, Do, Re.', staff:true, play:'G4 A4 B4 C5 D5 C5 B4 A4 G4:4', f:'1 2 3 4 5 4 3 2 1' } ]},
    { t:'Al chiaro di luna', pos:'G', tip:'Canzone popolare francese, in posizione di Sol.', n:'G4 G4 G4 A4 B4:2 A4:2 G4 B4 A4 A4 G4:4 G4 G4 G4 A4 B4:2 A4:2 G4 B4 A4 A4 G4:4' },
    { t:'Sol con la sinistra', pos:'LG', tip:'Mignolo sinistro sul Sol basso.', n:'G2 A2 B2 C3 D3:2 C3 B2 A2 G2 A2 B2 G2:4' },
    { t:'Passeggiata in Sol', goal:true, pos:'G', bpm:96, tip:'Brano originale con la base: Sol, Do, Mi minore, Re.',
      n:'G4 B4 D5 B4 C5 B4 A4:2 G4 A4 B4 G4 A4:4 B4 D5 C5 B4 A4 B4 G4:2 A4 B4 A4 G4 G4:4',
      acc:'G . . . C . . Em . . . D G . . . C . . D . . . G' } ]},
  { title:'Tasti neri', d:'Il diesis e la prima tonalità con un tasto nero.', c:'#ff7a1a', ci:'#111', lessons:[
    { t:'Il diesis', cards:[
      { anim:'sharp', h:'♯ vuol dire: un tasto più su', p:'Il diesis alza la nota al tasto subito a destra, di solito un nero. Fa♯ è il nero a destra del Fa.', mark:'*F#' },
      { h:'Suona tre Fa♯', p:'Il primo nero del gruppo da tre. Prima uno qualsiasi, poi quello in mezzo.', play:'*F# F#4 F#4' } ]},
    { t:'Il Fa diesis', tip:'Fa♯ = il nero a destra del Fa.', n:'G4 F#4 G4 A4 G4 F#4 E4 D4 G4 F#4 G4' },
    { t:'Scala di Sol', tip:'Dopo il Si, il pollice passa sotto per il Do.', n:'G4 A4 B4 C5 D5 E5 F#5 G5 G5 F#5 E5 D5 C5 B4 A4 G4' },
    { t:'Tanti auguri in Sol', notime:true, tip:'Stesso brano, nuova tonalità.', n:'D4 D4 E4 D4 G4 F#4 D4 D4 E4 D4 A4 G4 D4 D4 D5 B4 G4 F#4 E4 C5 C5 B4 G4 A4 G4' } ]},
  { title:'Mani unite', d:'Le due mani insieme, una alla volta e poi a tempo.', c:'#b8e0c8', ci:'#111', lessons:[
    { t:'Basso fermo', tip:'La sinistra suona il Do sul primo battito, la destra continua.', n:'C3+C4 D4 E4 F4 C3+G4 F4 E4 D4 C3+E4 D4 C4 D4 C3+C4:4' },
    { t:'Domanda e risposta', tip:'Prima la destra, poi la sinistra risponde un\'ottava sotto.', n:'C4 D4 E4:2 C3 D3 E3:2 E4 F4 G4:2 E3 F3 G3:2 G4 F4 E4 D4 G3 F3 E3 D3 C4:4 C3:4' },
    { t:'Sinistra a tempo', tip:'La sinistra entra sul primo battito di ogni battuta. Prova A tempo.', n:'C3+E4 D4 C4 D4 G2+D4 E4 F4:2 C3+E4 D4 C4 E4 G2+D4:2 C3+C4:2' } ]},
  { title:'Primi accordi', d:'Tre note insieme con la mano sinistra.', c:'#6a3fd1', ci:'#fff', lessons:[
    { t:'Cos\'è un accordo', cards:[
      { anim:'chord', h:'Tre note insieme', p:'Un accordo sono più note suonate nello stesso momento. Do maggiore è Do, Mi, Sol: salti un tasto bianco tra l\'una e l\'altra.', staff:true, play:'C4+E4+G4 C4+E4+G4', f:'1-3-5 1-3-5' },
      { h:'Col microfono', p:'Il microfono sente una nota alla volta: suona le note dell\'accordo una dopo l\'altra. Con il cavo USB puoi suonarle insieme.' } ]},
    { t:'Accordo di Do', tip:'Mano sinistra, dita 5-3-1 insieme.', n:'C3+E3+G3 C3+E3+G3 C3+E3+G3 C3+E3+G3', f:'5-3-1 5-3-1 5-3-1 5-3-1' },
    { t:'Do, Fa, Sol', tip:'I tre accordi più usati. Muovi solo le dita che servono.', n:'C3+E3+G3 C3+F3+A3 B2+D3+G3 C3+E3+G3 C3+E3+G3 C3+F3+A3 B2+D3+G3 C3+E3+G3' },
    { t:'Accordi alternati', tip:'Due volte ciascuno.', n:'C3+E3+G3 C3+E3+G3 C3+F3+A3 C3+F3+A3 B2+D3+G3 B2+D3+G3 C3+E3+G3' } ]},
  { title:'Accordi in Sol', d:'I tre accordi principali della tonalità di Sol: Sol, Do, Re.', c:'#a05195', ci:'#fff', lessons:[
    { t:'Sol, Do, Re', cards:[
      { h:'I tre accordi di Sol', p:'In Sol gli accordi principali sono Sol (I), Do (IV) e Re (V). Il Re contiene un Fa♯: tasto nero.', staff:true, play:'G2+B2+D3:2 G2+C3+E3:2 F#2+A2+D3:2 G2+B2+D3:2', f:'5-3-1 5-2-1 5-3-1 5-3-1' } ]},
    { t:'Accordo e melodia in Sol', tip:'Accordo a sinistra sul primo battito, melodia a destra.', n:'G2+B2+D3+B4 A4 G4 A4 G2+C3+E3+C5:2 B4:2 F#2+A2+D3+A4 G4 F#4 A4 G2+B2+D3+G4:4' } ]},
  { title:'Due mani', d:'La sinistra fa il basso, la destra la melodia.', c:'#00a3c4', ci:'#111', lessons:[
    { t:'Inno alla gioia a due mani', tip:'La sinistra entra all\'inizio di ogni battuta.', n:'C3+E4 E4 F4 G4 G3+G4 F4 E4 D4 C3+C4 C4 D4 E4 G3+E4:1.5 D4:.5 D4:2 C3+E4 E4 F4 G4 G3+G4 F4 E4 D4 C3+C4 C4 D4 E4 G3+D4:1.5 C4:.5 C4:2' },
    { t:'Stellina con accordi', tip:'Accordo a sinistra, melodia a destra.', n:'C3+E3+G3+C4 C4 G4 G4 C3+F3+A3+A4 A4 C3+E3+G3+G4 B2+D3+G3+F4 F4 C3+E3+G3+E4 E4 B2+D3+G3+D4 D4 C3+E3+G3+C4' },
    { t:'Quattro accordi', goal:true, bpm:80, tip:'Brano originale: basso con la sinistra, melodia con la destra, la base fa il resto.',
      n:'C3+E4 G4 G4 E4 G2+D4 G4 G4 D4 A2+C4 E4 E4 C4 F2+C4 A4 G4 F4 C3+E4 G4 G4 E4 G2+D4 G4 B4 D5 A2+C5 B4 A4 E4 F2+F4 E4 D4 C4',
      acc:'C . . . G . . . Am . . . F . . . C . . . G . . . Am . . . F . . .' } ]},
  { title:'Posizione di Fa', d:'La mano sul Fa e il primo bemolle: Si♭.', c:'#d4a373', ci:'#111', lessons:[
    { t:'Il bemolle', cards:[
      { anim:'flat', h:'♭ vuol dire: un tasto più giù', p:'Il bemolle abbassa la nota al tasto subito a sinistra, di solito un nero. Si♭ è il nero a sinistra del Si.', mark:'*Bb' },
      { h:'Suona tre Si♭', p:'L\'ultimo nero del gruppo da tre. Prima uno qualsiasi, poi quello in mezzo.', play:'*Bb Bb4 Bb4' } ]},
    { t:'La posizione di Fa', pos:'F', tip:'Pollice destro sul Fa, anulare sul Si♭.', n:'F4 G4 A4 Bb4 C5 Bb4 A4 G4 F4:4 A4 C5 A4 F4 G4 Bb4 G4 F4:4' },
    { t:'Melodia in Fa', pos:'F', tip:'Ogni Si diventa Si♭: è scritto in chiave.', n:'F4 A4 C5 A4 Bb4 A4 G4:2 G4 Bb4 A4 G4 F4:4' } ]},
  { title:'Scale', d:'Il passaggio del pollice per suonare oltre 5 note.', c:'#c8102e', ci:'#fff', lessons:[
    { t:'Scala di Do a destra', tip:'Dopo il Mi, il pollice passa sotto per il Fa.', n:'C4 D4 E4 F4 G4 A4 B4 C5 B4 A4 G4 F4 E4 D4 C4', f:'1 2 3 1 2 3 4 5 4 3 2 1 3 2 1' },
    { t:'Scala di Do a sinistra', tip:'Dopo il Sol, il medio scavalca sul La.', n:'C3 D3 E3 F3 G3 A3 B3 C4 B3 A3 G3 F3 E3 D3 C3', f:'5 4 3 2 1 3 2 1 2 3 1 2 3 4 5' },
    { t:'Due ottave', tip:'Pollice sotto sul Fa e sul Do.', n:'C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C6 B5 A5 G5 F5 E5 D5 C5 B4 A4 G4 F4 E4 D4 C4' } ]},
  { title:'Minori e arpeggi', d:'Il suono malinconico e gli accordi sciolti.', c:'#8bbf2a', ci:'#111', lessons:[
    { t:'La minore', tip:'La, Do, Mi: nessun tasto nero.', n:'A2+C3+E3 A2+C3+E3 A2+C3+E3 A2+C3+E3' },
    { t:'Re e Mi minore', tip:'Re-Fa-La, Mi-Sol-Si.', n:'D3+F3+A3 E3+G3+B3 A2+C3+E3 D3+F3+A3 E3+G3+B3 A2+C3+E3' },
    { t:'Arpeggio di Do', tip:'Le note dell\'accordo una dopo l\'altra.', n:'C3 E3 G3 C4 E4 G4 C5 G4 E4 C4 G3 E3 C3' } ]},
  { title:'Accompagnamenti', d:'Accordo spezzato e basso albertino: come accompagnare una melodia.', c:'#577590', ci:'#fff', lessons:[
    { t:'Accordo spezzato', pos:'L', tip:'Le note dell\'accordo una alla volta: Do, Mi, Sol, Mi.', n:'C3 E3 G3 E3 C3 E3 G3 E3 C3 F3 A3 F3 B2 D3 G3 D3 C3:4' },
    { t:'Basso albertino', tip:'Basso, alto, medio, alto: il trucco di Mozart.', n:'C3 G3 E3 G3 C3 G3 E3 G3 C3 A3 F3 A3 B2 G3 D3 G3 C3:4', f:'5 1 3 1 5 1 3 1 5 1 2 1 5 1 3 1 5' },
    { t:'Melodia e albertino', tip:'Sinistra albertina, destra la melodia: inizia lento.', n:'C3+E4 G3 E3+G4 G3 C3+E4 G3 E3+C4 G3 B2+D4 G3 D3+F4 G3 C3+C4:4' } ]},
  { title:'Crome e sincope', d:'Mezzi battiti e accenti fuori posto: il ritmo del pop.', c:'#f94144', ci:'#111', lessons:[
    { t:'Le crome', cards:[
      { h:'Due note in un battito', p:'La croma ha la codetta: dura mezzo battito. Conta "1 e 2 e 3 e 4 e".', staff:true, play:'C4:.5 C4:.5 D4:.5 D4:.5 E4:.5 E4:.5 D4 C4:.5 D4:.5 E4:.5 F4:.5 G4:2' } ]},
    { t:'Crome a tempo', pos:'R', tip:'Usa A tempo 70% e conta la "e" tra i battiti.', n:'E4:.5 F4:.5 G4 G4 G4 F4:.5 E4:.5 D4 D4 D4 C4:.5 D4:.5 E4 E4:.5 D4:.5 C4 D4:.5 E4:.5 D4 C4:2' },
    { t:'La sincope', cards:[
      { h:'L\'accento fuori posto', p:'Sincope: la nota parte tra due battiti e dura sopra il battito successivo. È il ritmo di tante canzoni di oggi.', staff:true, play:'C4:.5 E4 E4:.5 D4:2 C4:.5 E4 G4:.5 E4:2 D4:.5 F4 E4:.5 D4:2 C4:4' } ]},
    { t:'Pop sincopato', tip:'Accordi a destra in sincope: 3 + 3 + 2 mezzi battiti.', n:'C4+E4+G4:1.5 C4+E4+G4:1.5 C4+E4+G4 B3+D4+G4:1.5 B3+D4+G4:1.5 B3+D4+G4 A3+C4+E4:1.5 A3+C4+E4:1.5 A3+C4+E4 A3+C4+F4:1.5 A3+C4+F4:1.5 A3+C4+F4' } ]},
  { title:'Pop: 4 accordi', d:'Do, Sol, La minore, Fa: la base di centinaia di canzoni di oggi.', c:'#ff4fa3', ci:'#111', lessons:[
    { t:'I 4 accordi a destra', tip:'Posizioni vicine: si muovono poche dita.', n:POP_RH+' '+POP_RH },
    { t:'I bassi a sinistra', tip:'Do, Sol, La, Fa.', n:'C3 G2 A2 F2 C3 G2 A2 F2' },
    { t:'Pop a due mani', tip:'Basso a sinistra e accordo a destra.', n:'C3+C4+E4+G4 G2+B3+D4+G4 A2+A3+C4+E4 F2+A3+C4+F4 C3+C4+E4+G4 G2+B3+D4+G4 A2+A3+C4+E4 F2+A3+C4+F4' },
    { t:'Ritmo pop', tip:'Basso e accordo, poi l\'accordo altre 3 volte.', n:['C3+C4+E4+G4','G2+B3+D4+G4','A2+A3+C4+E4','F2+A3+C4+F4'].map(c => [c, ...Array(3).fill(c.replace(/^\w\d\+/, ''))].join(' ')).join(' ') } ]},
  { title:'Lead sheet', d:'Melodia con le sigle degli accordi: come sono scritte le canzoni pop.', c:'#43aa8b', ci:'#111', lessons:[
    { t:'Leggere le sigle', cards:[
      { h:'Lo spartito del pop', p:'Nei lead sheet c\'è solo la melodia, con sopra le sigle: C = Do, G = Sol, Am = La minore, F = Fa. La sinistra suona la nota della sigla, o l\'accordo intero.' },
      { h:'Sigla e melodia', p:'Le sigle sono sopra il pentagramma. Sulla sigla suoni insieme basso e melodia.', staff:true, lead:true, play:'C3+E4 E4 G2+D4 D4 A2+C4 C4 F2+A4:2 C3+G4:4' } ]},
    { t:'Sigle con la sinistra', lead:true, tip:'Quando c\'è una sigla, la sinistra suona la sua nota.', n:'C3+E4 E4 G2+D4 D4 A2+C4 C4 F2+A4:2 C3+G4 E4 G2+D4:2 C3+C4:4', acc:'C . G . Am . F C . G C' },
    { t:'Canzone in sigle', goal:true, lead:true, bpm:84, tip:'Brano originale: leggi melodia e sigle insieme, la base suona con te.',
      n:'C3+G4 E4 E4 G4 G2+D4:2 B3:2 A2+C4 E4 E4 A4 F2+A4:2 G4:2 C3+G4 E4 G4 C5 G2+B4:2 A4 G4 F2+A4 G4 F4 D4 C3+C4:4',
      acc:'C . . . G . Am . . . F . C . . . G . . F . . . C' } ]},
  { title:'Pedale e tonalità', d:'Il pedale di risonanza e due nuove tonalità: Re maggiore e Si♭ maggiore.', c:'#222e50', ci:'#fff', lessons:[
    { t:'Il pedale', cards:[
      { h:'Il pedale di risonanza', p:'Collega un pedale sustain alla presa SUSTAIN della Melody 61. Premuto, le note continuano a suonare anche se alzi le dita.' },
      { h:'Cambio di pedale', p:'Suona l\'accordo, poi alza e riabbassa il pedale subito dopo il nuovo accordo: così i suoni non si sporcano.', staff:true, play:'C3+E3+G3:4 F3+A3+C4:4 G3+B3+D4:4 C3+E3+G3:4' } ]},
    { t:'Re maggiore', tip:'Due diesis: Fa♯ e Do♯.', n:'D4 E4 F#4 G4 A4:2 F#4:2 G4 F#4 E4 C#4 D4:4' },
    { t:'Si bemolle maggiore', tip:'Due bemolli: Si♭ e Mi♭.', n:'Bb3 C4 D4 Eb4 F4:2 D4:2 Eb4 D4 C4 A3 Bb3:4' } ]},
];

// vecchi indici delle lezioni (prima dei livelli nuovi): servono a spostare i progressi salvati
const LEGACY = [["Bianchi e neri", "Trova il Do", "Le sette note", "Il Do centrale", "Le dita hanno un numero", "Il pentagramma"], ["Do e Re", "Do Re Mi", "Salti"], ["Fa e Sol", "Su e giù", "Inno alla gioia", "Una pecorella", "Prima luce"], ["La chiave di basso", "Do basso", "Cinque dita a sinistra", "Inno alla gioia a sinistra"], ["Brilla brilla stellina", "Fra Martino", "Jingle Bells", "Tanti auguri", "Città di notte"], ["Il diesis", "Il Fa diesis", "Scala di Sol", "Tanti auguri in Sol"], ["Cos'è un accordo", "Accordo di Do", "Do, Fa, Sol", "Accordi alternati"], ["Inno alla gioia a due mani", "Stellina con accordi", "Quattro accordi"], ["Scala di Do a destra", "Scala di Do a sinistra", "Due ottave"], ["La minore", "Re e Mi minore", "Arpeggio di Do"], ["I 4 accordi a destra", "I bassi a sinistra", "Pop a due mani", "Ritmo pop"]];
