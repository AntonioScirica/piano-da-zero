// Lingue: italiano (sorgente), inglese, ucraino. Caricato prima di curriculum.js e dello script principale.
// t('chiave', { n:3 }) riempie {n}; una voce può essere un array di forme plurali (it/en: 1, altro; uk: 1, 2-4, 5+), scelte con vars.n.
const LANGS = { it:'Italiano', en:'English', uk:'Українська' };
const LANG = (() => {
  let l = null; try { l = JSON.parse(localStorage.getItem('lang')); } catch {}
  return LANGS[l] ? l : 'it';   // italiano di default; si cambia nelle impostazioni del profilo
})();
document.documentElement.lang = LANG;
const CURR_TR = {};   // traduzioni del curriculum: curriculum.en.js, curriculum.uk.js

const I18N = {
  it:{ loc:'it', names:['Do','Do♯','Re','Re♯','Mi','Fa','Fa♯','Sol','Sol♯','La','La♯','Si'], flats:{ 1:'Re♭', 3:'Mi♭', 6:'Sol♭', 8:'La♭', 10:'Si♭' },
    fingers:['','pollice','indice','medio','anulare','mignolo'], ord:n => n + '°',
    titles:['Principiante', 'Apprendista', 'Esploratore', 'Musicista', 'Solista', 'Virtuoso', 'Maestro', 'Leggenda'],
    where:['Il Do è il bianco a sinistra dei due tasti neri.', 'Il Do♯ è il nero a destra del Do.', 'Il Re sta in mezzo ai due tasti neri.', 'Il Re♯ è il secondo nero del gruppo da due.',
      'Il Mi è il bianco a destra dei due tasti neri.', 'Il Fa è il bianco a sinistra dei tre tasti neri.', 'Il Fa♯ è il primo nero del gruppo da tre.', 'Il Sol sta tra il primo e il secondo nero del gruppo da tre.',
      'Il Sol♯ è il nero in mezzo al gruppo da tre.', 'Il La sta tra il secondo e il terzo nero del gruppo da tre.', 'Il La♯ è l\'ultimo nero del gruppo da tre.', 'Il Si è il bianco a destra dei tre tasti neri.'],
    advice:['Dita curve, come se tenessi una pallina. Polso morbido, all\'altezza dei tasti.', 'Siediti al centro, davanti al Do centrale, con i gomiti un po\' più avanti del busto.',
      'Meglio lento e giusto che veloce e sbagliato: ogni ripetizione sbagliata ne chiede tre giuste per essere cancellata.', 'Guarda lo spartito, non le mani: le dita imparano la strada da sole.',
      'Pochi minuti ogni giorno valgono più di un\'ora una volta a settimana.', 'Se un punto non viene, isolalo: due o tre note, lente, finché vengono tre volte di fila.',
      'Respira e rilassa le spalle: la tensione rende le dita lente.', 'Conta i battiti nella testa, senza voce: aiuta il ritmo e il microfono sente solo la pianola.', 'Prima di suonare, trova con gli occhi la prima nota e metti già il dito giusto sopra.'] },
  en:{ loc:'en', names:['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'], flats:{ 1:'D♭', 3:'E♭', 6:'G♭', 8:'A♭', 10:'B♭' },
    fingers:['','thumb','index','middle','ring','little'], ord:n => n + (['th','st','nd','rd'][n % 10 < 4 && Math.floor(n / 10) % 10 !== 1 ? n % 10 : 0]),
    titles:['Beginner', 'Apprentice', 'Explorer', 'Musician', 'Soloist', 'Virtuoso', 'Maestro', 'Legend'],
    where:['C is the white key left of the two black keys.', 'C♯ is the black key right of C.', 'D sits between the two black keys.', 'D♯ is the second black key of the group of two.',
      'E is the white key right of the two black keys.', 'F is the white key left of the three black keys.', 'F♯ is the first black key of the group of three.', 'G sits between the first and second black keys of the group of three.',
      'G♯ is the middle black key of the group of three.', 'A sits between the second and third black keys of the group of three.', 'A♯ is the last black key of the group of three.', 'B is the white key right of the three black keys.'],
    advice:['Curved fingers, as if you were holding a small ball. Soft wrist, level with the keys.', 'Sit in the middle, in front of middle C, with your elbows slightly ahead of your body.',
      'Slow and right beats fast and wrong: every wrong repetition takes three right ones to undo.', 'Look at the music, not your hands: your fingers learn the way on their own.',
      'A few minutes every day are worth more than an hour once a week.', 'If a spot won’t come, isolate it: two or three notes, slowly, until they come out right three times in a row.',
      'Breathe and drop your shoulders: tension makes your fingers slow.', 'Count the beats in your head, silently: it helps your rhythm, and the microphone only hears the keyboard.', 'Before you play, find the first note with your eyes and put the right finger on it.'] },
  uk:{ loc:'uk', names:['До','До♯','Ре','Ре♯','Мі','Фа','Фа♯','Соль','Соль♯','Ля','Ля♯','Сі'], flats:{ 1:'Ре♭', 3:'Мі♭', 6:'Соль♭', 8:'Ля♭', 10:'Сі♭' },
    fingers:['','великий','вказівний','середній','безіменний','мізинець'], ord:n => n + (['', '-ше', '-ге', '-тє'][n] || '-те'),
    titles:['Новачок', 'Учень', 'Дослідник', 'Музикант', 'Соліст', 'Віртуоз', 'Маестро', 'Легенда'],
    where:['До — біла клавіша ліворуч від двох чорних.', 'До♯ — чорна клавіша праворуч від До.', 'Ре — біла клавіша між двома чорними.', 'Ре♯ — друга чорна клавіша в групі з двох.',
      'Мі — біла клавіша праворуч від двох чорних.', 'Фа — біла клавіша ліворуч від трьох чорних.', 'Фа♯ — перша чорна клавіша в групі з трьох.', 'Соль — між першою і другою чорними клавішами в групі з трьох.',
      'Соль♯ — середня чорна клавіша в групі з трьох.', 'Ля — між другою і третьою чорними клавішами в групі з трьох.', 'Ля♯ — остання чорна клавіша в групі з трьох.', 'Сі — біла клавіша праворуч від трьох чорних.'],
    advice:['Пальці заокруглені, ніби тримаєш маленький м’ячик. Зап’ястя м’яке, на рівні клавіш.', 'Сідай посередині, навпроти центрального До, лікті трохи попереду тулуба.',
      'Краще повільно й правильно, ніж швидко й з помилками: щоб стерти одне неправильне повторення, потрібні три правильні.', 'Дивись у ноти, а не на руки: пальці самі запам’ятають дорогу.',
      'Кілька хвилин щодня дають більше, ніж година раз на тиждень.', 'Якщо якесь місце не виходить, візьми його окремо: дві-три ноти, повільно, поки не вийде тричі поспіль.',
      'Дихай і розслаб плечі: напруга сповільнює пальці.', 'Рахуй долі подумки, без голосу: це допомагає ритму, а мікрофон чує тільки інструмент.', 'Перш ніж грати, знайди очима першу ноту й одразу постав на неї потрібний палець.'] },
};

// testi dell'interfaccia: [italiano, inglese, ucraino]
const STR = {
  title:['Piano da zero', 'Piano from Zero', 'Піаніно з нуля'],
  lang:['Lingua', 'Language', 'Мова'],
  names:['Nomi delle note', 'Note names', 'Назви нот'],
  back:['Torna ai livelli', 'Back to levels', 'Назад до рівнів'],
  modeL:['Modalità', 'Mode', 'Режим'],
  mWait:['Impara', 'Learn', 'Вчити'], m70:['A tempo 70%', 'In time 70%', 'У темпі 70%'], m100:['A tempo 100%', 'In time 100%', 'У темпі 100%'],
  calib:['Calibra il ritardo', 'Calibrate the delay', 'Калібрувати затримку'],
  base:['Base musicale', 'Backing track', 'Акомпанемент'],
  listen:['Ascolta la lezione', 'Listen to the lesson', 'Прослухати урок'],
  restart:['Ricomincia', 'Start over', 'Почати знову'],
  staff:['Pentagramma', 'Staff', 'Нотний стан'],
  mapSub:['Do contati da sinistra', 'Cs counted from the left', 'До рахуємо зліва'],
  // Chi suona?
  who:['Chi suona?', 'Who’s playing?', 'Хто грає?'],
  whoSub:['Tocca il tuo profilo per entrare.', 'Tap your profile to come in.', 'Торкнися свого профілю, щоб увійти.'],
  tileSub:['Lv {lv} · {xp} XP · Entra', 'Lv {lv} · {xp} XP · Enter', 'Рів. {lv} · {xp} XP · Увійти'],
  newP:['Nuovo profilo', 'New profile', 'Новий профіль'],
  newPsub:['per un\'altra persona', 'for someone else', 'для іншої людини'],
  welcome:['Benvenuto.', 'Welcome.', 'Вітаємо.'],
  newPtxt:['Un profilo per ogni persona: progressi, livelli e classifica separati.', 'One profile per person: separate progress, levels and leaderboard.', 'Окремий профіль для кожного: свій прогрес, рівні й рейтинг.'],
  welcomeTxt:['Crea il tuo profilo: progressi e livelli restano salvati su questo dispositivo.', 'Create your profile: your progress and levels stay saved on this device.', 'Створи свій профіль: прогрес і рівні зберігаються на цьому пристрої.'],
  yourName:['Come ti chiami?', 'What’s your name?', 'Як тебе звати?'],
  create:['Crea profilo', 'Create profile', 'Створити профіль'],
  cancel:['Annulla', 'Cancel', 'Скасувати'],
  // Home
  lv:['Lv {lv}', 'Lv {lv}', 'Рів. {lv}'],
  hold:[' e tieni {n} battiti', ' and hold for {n} beats', ' і тримай {n} долі'],
  holdNow:['Tieni premuto finché la linea arriva alla nota dopo', 'Keep holding until the line reaches the next note', 'Тримай, доки лінія не дійде до наступної ноти'],
  holdShort:['Troppo presto: tieni premuto finché la linea arriva. Riprova.', 'Too soon: keep holding until the line arrives. Try again.', 'Зарано: тримай, доки лінія не дійде. Спробуй ще раз.'],
  tag2:['2 neri', '2 black', '2 чорні'], tag3:['3 neri', '3 black', '3 чорні'],
  low:['grave', 'low', 'низько'], high:['acuto', 'high', 'високо'],
  midC:['Do centrale', 'Middle C', 'Середнє До'],
  upOne:['un tasto più su', 'one key up', 'на клавішу вище'], downOne:['un tasto più giù', 'one key down', 'на клавішу нижче'],
  skip:['salta', 'skip', 'пропусти'],
  iv2:['seconda', 'second', 'секунда'], iv3:['terza', 'third', 'терція'], iv4:['quarta', 'fourth', 'кварта'], iv5:['quinta', 'fifth', 'квінта'],
  lvlN:['Livello {n}', 'Level {n}', 'Рівень {n}'],
  lvlLearn:['Cosa imparerai', 'What you’ll learn', 'Що ти вивчиш'],
  lvlGo:['Comincia', 'Let’s start', 'Почнімо'],
  lvlDone:['Livello {n} completato!', 'Level {n} complete!', 'Рівень {n} пройдено!'],
  lvlStars:['{s} stelle su {t}', '{s} of {t} stars', '{s} з {t} зірок'],
  lvlUnlock:['Si sblocca il livello {n}', 'Level {n} unlocked', 'Відкрито рівень {n}'],
  lvlLast:['Hai finito tutti i livelli. Ora il catalogo delle canzoni è tutto tuo.', 'You’ve finished every level. The song library is all yours now.', 'Ти пройшов усі рівні. Тепер увесь каталог пісень — твій.'],
  cont:['Continua', 'Continue', 'Далі'],
  meSub:['Lv {lv} · {x}', 'Lv {lv} · {x}', 'Рів. {lv} · {x}'],
  pmSwitch:['Cambia profilo', 'Switch profile', 'Змінити профіль'],
  pmLogout:['Esci', 'Log out', 'Вийти'],
  pmSettings:['Impostazioni profilo', 'Profile settings', 'Налаштування профілю'],
  setTitle:['Impostazioni', 'Settings', 'Налаштування'],
  setName:['Nome', 'Name', 'Ім’я'],
  setSave:['Salva il nome', 'Save name', 'Зберегти ім’я'],
  saved:['Salvato.', 'Saved.', 'Збережено.'],
  nameTaken:['Esiste già un profilo con questo nome.', 'A profile with this name already exists.', 'Профіль з таким ім’ям уже існує.'],
  setReset:['Azzera i progressi', 'Reset progress', 'Скинути прогрес'],
  setResetTxt:['Livelli, stelle, XP, ripassi e serie tornano a zero. Il profilo resta.', 'Levels, stars, XP, reviews and streak go back to zero. The profile stays.', 'Рівні, зірки, XP, повторення й серія обнуляться. Профіль залишиться.'],
  setDelete:['Elimina profilo', 'Delete profile', 'Видалити профіль'],
  setDeleteTxt:['Il profilo e tutti i suoi progressi spariscono da questo dispositivo.', 'The profile and all its progress are removed from this device.', 'Профіль і весь його прогрес зникнуть з цього пристрою.'],
  confReset:['Azzerare tutti i progressi di {n}? Non si può annullare.', 'Reset all of {n}’s progress? This can’t be undone.', 'Скинути весь прогрес профілю {n}? Цю дію не можна скасувати.'],
  confDelete:['Eliminare il profilo {n} e tutti i suoi progressi? Non si può annullare.', 'Delete the profile {n} and all its progress? This can’t be undone.', 'Видалити профіль {n} і весь його прогрес? Цю дію не можна скасувати.'],
  close:['Chiudi', 'Close', 'Закрити'],
  start:['Inizia', 'Start', 'Почати'], cont:['Continua', 'Continue', 'Продовжити'],
  nextItem:['Prossimo: {x}', 'Next: {x}', 'Далі: {x}'],
  nextLesson:['Prossima lezione: {x}', 'Next lesson: {x}', 'Наступний урок: {x}'],
  today:['La sessione di oggi', 'Today’s session', 'Сьогоднішнє заняття'],
  sessDone:['Sessione completata.', 'Session complete.', 'Заняття завершено.'],
  sessInfo:['Circa {m} minuti · {d} di {n} fatti', 'About {m} minutes · {d} of {n} done', 'Близько {m} хв · виконано {d} з {n}'],
  sessDoneTxt:['Ottimo lavoro. Domani una nuova sessione, intanto puoi andare avanti.', 'Great work. There’s a new session tomorrow; in the meantime you can keep going.', 'Чудова робота. Завтра нове заняття, а поки можеш іти далі.'],
  min:['{n} min', '{n} min', '{n} хв'],
  streak:[['giorno di fila', 'giorni di fila'], ['day in a row', 'days in a row'], ['день поспіль', 'дні поспіль', 'днів поспіль']],
  daysRow:[['giorni di fila', 'giorni di fila'], ['day in a row', 'days in a row'], ['день поспіль', 'дні поспіль', 'днів поспіль']],
  practice:['Pratica di oggi', 'Today’s practice', 'Практика сьогодні'],
  practiceDone:['Pratica di oggi fatta', 'Today’s practice done', 'Практику на сьогодні виконано'],
  toLevel:['{a}/{b} XP al livello {n}', '{a}/{b} XP to level {n}', '{a}/{b} XP до рівня {n}'],
  drill:['Allenamento lampo', 'Quick drill', 'Бліц-тренування'],
  drillLocked:['Si sblocca dopo le prime lezioni del Livello 0.', 'Unlocks after the first lessons of Level 0.', 'Відкриється після перших уроків рівня 0.'],
  drillTxt:['20 note a caso tra quelle che conosci. Fai combo per punti doppi e tripli.', '20 random notes from the ones you know. Build combos for double and triple points.', '20 випадкових нот із тих, що ти знаєш. Роби комбо — отримаєш подвійні й потрійні бали.'],
  board:['Classifica della settimana', 'This week’s leaderboard', 'Рейтинг тижня'],
  you:['tu', 'you', 'ти'],
  boardSub:[['Lv {lv} · {n} giorni di fila · {xp} XP totali', 'Lv {lv} · {n} giorni di fila · {xp} XP totali'], ['Lv {lv} · {n} day in a row · {xp} XP total', 'Lv {lv} · {n} days in a row · {xp} XP total'],
    ['Рів. {lv} · {n} день поспіль · {xp} XP загалом', 'Рів. {lv} · {n} дні поспіль · {xp} XP загалом', 'Рів. {lv} · {n} днів поспіль · {xp} XP загалом']],
  boardHint:['Per sfidare qualcuno tocca il tuo nome in alto e aggiungi un giocatore.', 'To challenge someone, tap your name at the top and add a player.', 'Щоб змагатися з кимось, торкнися свого імені вгорі й додай гравця.'],
  stars:[['{n} stelle su 3', '{n} stelle su 3'], ['{n} star out of 3', '{n} stars out of 3'], ['{n} зірка з 3', '{n} зірки з 3', '{n} зірок з 3']],
  locked:['Bloccata', 'Locked', 'Заблоковано'],
  mastered:['Padroneggiata a tempo', 'Mastered in time', 'Опановано в темпі'],
  extra:['Esercizio extra', 'Extra exercise', 'Додаткова вправа'],
  extraDone:['{n} fatti', '{n} done', 'виконано: {n}'],
  // Canzoni
  songsT:['Le tue canzoni', 'Your songs', 'Твої пісні'],
  songsD:['Cerca una canzone e suonala subito, oppure aggiungi un file .mid. Le canzoni restano solo su questo dispositivo.', 'Find a song and play it right away, or add a .mid file. Songs stay on this device only.', 'Знайди пісню й одразу зіграй її або додай файл .mid. Пісні зберігаються лише на цьому пристрої.'],
  noSongs:['Ancora nessuna canzone. Cercala qui sopra, oppure aggiungi un file .mid che hai già.', 'No songs yet. Search for one above, or add a .mid file you already have.', 'Пісень ще немає. Пошукай вище або додай файл .mid, який уже маєш.'],
  del:['Elimina {x}', 'Delete {x}', 'Видалити {x}'],
  delConfirm:['Eliminare "{x}" dal catalogo? Non si può annullare.', 'Delete "{x}" from your songs? This can’t be undone.', 'Видалити «{x}» з каталогу? Це не можна скасувати.'],
  searchL:['Cerca una canzone', 'Find a song', 'Знайди пісню'],
  searchPh:['Titolo o artista', 'Title or artist', 'Назва або виконавець'],
  searchB:['Cerca', 'Search', 'Шукати'],
  searching:['Cerco…', 'Searching…', 'Шукаю…'],
  museLink:['Cerca "{x}" su MuseScore', 'Search for "{x}" on MuseScore', 'Шукати «{x}» на MuseScore'],
  museHint:['Lì trovi gli arrangiamenti per pianoforte delle canzoni recenti. Apri quello che ti piace, scarica il file <b>MIDI</b> (serve un account MuseScore; alcuni spartiti sono a pagamento) e aggiungilo qui sotto con "Aggiungi canzoni".',
    'There you’ll find piano arrangements of recent songs. Open one you like, download the <b>MIDI</b> file (you need a MuseScore account; some scores are paid) and add it below with "Add songs".',
    'Там є фортепіанні аранжування нових пісень. Відкрий те, що подобається, завантаж файл <b>MIDI</b> (потрібен акаунт MuseScore; деякі ноти платні) і додай його нижче кнопкою «Додати пісні».'],
  plays:[['{x} ascolti', '{x} ascolti'], ['{x} play', '{x} plays'], ['{x} прослуховування', '{x} прослуховування', '{x} прослуховувань']],
  play:['Suona', 'Play', 'Грати'],
  more:['Altri risultati', 'More results', 'Більше результатів'],
  results:[['{n} risultati dall\'archivio BitMidi. I file sono fatti da utenti: se una versione suona male, provane un\'altra.', '{n} risultati dall\'archivio BitMidi. I file sono fatti da utenti: se una versione suona male, provane un\'altra.'],
    ['{n} result from the BitMidi archive. The files are made by users: if a version sounds wrong, try another.', '{n} results from the BitMidi archive. The files are made by users: if a version sounds wrong, try another.'],
    ['{n} результат з архіву BitMidi. Файли створюють користувачі: якщо версія звучить погано, спробуй іншу.', '{n} результати з архіву BitMidi. Файли створюють користувачі: якщо версія звучить погано, спробуй іншу.', '{n} результатів з архіву BitMidi. Файли створюють користувачі: якщо версія звучить погано, спробуй іншу.']],
  notFound:['"{q}" non è nell\'archivio gratuito: contiene soprattutto canzoni fino ai primi anni 2010.', '"{q}" isn’t in the free archive: it mostly has songs up to the early 2010s.', '«{q}» немає в безкоштовному архіві: там переважно пісні до початку 2010-х.'],
  searchErr:['Ricerca non riuscita: controlla la connessione e riprova.', 'Search didn’t work: check your connection and try again.', 'Пошук не вдався: перевір з’єднання й спробуй ще раз.'],
  downloading:['Scarico…', 'Downloading…', 'Завантажую…'],
  dlFail:['download non riuscito', 'download failed', 'не вдалося завантажити'],
  memFull:['memoria piena, elimina qualche canzone', 'storage is full, delete a few songs', 'пам’ять заповнена, видали кілька пісень'],
  retry:['Riprova', 'Try again', 'Спробувати ще'],
  diffL:['Difficoltà delle canzoni', 'Song difficulty', 'Складність пісень'],
  easyL:['Facile: melodia', 'Easy: melody', 'Легко: мелодія'], normL:['Normale: con accordi', 'Normal: with chords', 'Звичайно: з акордами'],
  addSongs:['Aggiungi canzoni (.mid)', 'Add songs (.mid)', 'Додати пісні (.mid)'],
  memFull2:['Memoria piena: elimina qualche canzone e riprova.', 'Storage is full: delete a few songs and try again.', 'Пам’ять заповнена: видали кілька пісень і спробуй ще раз.'],
  added:[['Aggiunte {n} canzoni.', 'Aggiunte {n} canzoni.'], ['Added {n} song.', 'Added {n} songs.'], ['Додано {n} пісню.', 'Додано {n} пісні.', 'Додано {n} пісень.']],
  unread:['Non lette: {x}.', 'Couldn’t read: {x}.', 'Не вдалося прочитати: {x}.'],
  notMidi:['non è un file MIDI', 'not a MIDI file', 'це не файл MIDI'],
  smpte:['formato SMPTE non supportato', 'SMPTE format not supported', 'формат SMPTE не підтримується'],
  noMel:['nessuna melodia trovata', 'no melody found', 'мелодію не знайдено'],
  whole:['Tutta', 'Whole song', 'Уся пісня'], part:['Parte {n}', 'Part {n}', 'Частина {n}'],
  songTip:['La base parte ogni volta che suoni la nota giusta.', 'The backing plays each time you hit the right note.', 'Акомпанемент звучить щоразу, коли граєш правильну ноту.'],
  // lezioni speciali e sessione
  drillT:['Allenamento', 'Practice', 'Тренування'],
  warm:['Riscaldamento', 'Warm-up', 'Розминка'],
  warmTip:['Lento e uniforme: ogni nota con la stessa forza, dita curve.', 'Slow and even: every note with the same weight, fingers curved.', 'Повільно й рівно: кожна нота з однаковою силою, пальці заокруглені.'],
  extraTip:['Esercizio nuovo ogni volta, con quello che hai imparato nel livello {n}. Leggi senza fretta.', 'A new exercise every time, built from what you learned in level {n}. Read without rushing.', 'Щоразу нова вправа з того, що ти вивчив на рівні {n}. Читай без поспіху.'],
  iRev:['Ripasso · {x}', 'Review · {x}', 'Повторення · {x}'],
  iGoal:['Obiettivo · {x}', 'Goal · {x}', 'Мета · {x}'],
  iNew:['Nuova · {x}', 'New · {x}', 'Нове · {x}'],
  iDrill:['Lettura · Allenamento lampo', 'Reading · Quick drill', 'Читання · Бліц-тренування'],
  iPrize:['Premio · {x} ({p})', 'Reward · {x} ({p})', 'Нагорода · {x} ({p})'],
  drillTip:['Leggi la nota e suonala. Più combo fai, più punti prendi.', 'Read the note and play it. The longer your combo, the more points you get.', 'Прочитай ноту й зіграй її. Що довше комбо, то більше балів.'],
  easy:['Facile', 'Easy', 'Легко'], normal:['Normale', 'Normal', 'Звичайно'],
  goalP:['Obiettivo · ', 'Goal · ', 'Мета · '],
  levelSub:['Livello {n} · {x}', 'Level {n} · {x}', 'Рівень {n} · {x}'],
  timedTip:['Suona quando la nota tocca la linea colorata. Prima 4 battiti di attacco.', 'Play when the note touches the coloured line. First, 4 beats to count you in.', 'Грай, коли нота торкається кольорової лінії. Спершу 4 долі на відлік.'],
  // lezione
  combo:['Combo {n}', 'Combo {n}', 'Комбо {n}'], comboX:[' · punti ×{m}', ' · points ×{m}', ' · бали ×{m}'],
  next:['Avanti', 'Next', 'Далі'],
  anyKey:['oppure premi un tasto qualsiasi', 'or press any key', 'або натисни будь-яку клавішу'],
  sayAny:['Suona un <em>{x}</em> qualsiasi', 'Play any <em>{x}</em>', 'Зіграй будь-яке <em>{x}</em>'],
  sayBlack:['Suona un <em>tasto nero</em> qualsiasi', 'Play any <em>black key</em>', 'Зіграй будь-яку <em>чорну клавішу</em>'],
  goOn:['Bene, avanti così…', 'Good, keep going…', 'Добре, так і далі…'],
  finger:[' — dito {n}, {f}', ' — finger {n}, {f}', ' — палець {n}, {f}'],
  together:['Suona insieme <em>{x}</em>', 'Play together <em>{x}</em>', 'Зіграй разом <em>{x}</em>'],
  micOne:[' (col microfono, una alla volta)', ' (with the microphone, one at a time)', ' (з мікрофоном — по одній)'],
  playNote:['Suona il <em>{x}</em>{f}', 'Play <em>{x}</em>{f}', 'Зіграй <em>{x}</em>{f}'],
  which:['Quale nota è?{f}', 'Which note is it?{f}', 'Яка це нота?{f}'],
  hOct:['Nota giusta, ottava sbagliata: usa il pallino del Do centrale come riferimento.', 'Right note, wrong octave: use the dot on middle C as your guide.', 'Нота правильна, а октава ні: орієнтуйся на крапку центрального До.'],
  hNear:['Quasi: hai preso il tasto vicino. Un dito per tasto, dita curve.', 'Close: you hit the key next door. One finger per key, fingers curved.', 'Майже: ти натиснув сусідню клавішу. Один палець на клавішу, пальці заокруглені.'],
  useF:[' Usa il dito {n}.', ' Use finger {n}.', ' Грай пальцем {n}.'],
  repT:['Ripara gli errori', 'Fix the mistakes', 'Виправ помилки'],
  repSub:['Tratto {a} di {b} · pulito {r} su {c}', 'Passage {a} of {b} · clean {r} of {c}', 'Фрагмент {a} з {b} · без помилок {r} з {c}'],
  rep0:['Qui avevi sbagliato. Suona lento: conta la precisione, non la velocità.', 'This is where you slipped. Play slowly: accuracy is what counts, not speed.', 'Тут була помилка. Грай повільно: важить точність, а не швидкість.'],
  repLast:['Ultima volta, senza nomi delle note.', 'One last time, without note names.', 'Останній раз, без назв нот.'],
  repMid:['Bene. Ancora, senza errori.', 'Good. Again, with no mistakes.', 'Добре. Ще раз, без помилок.'],
  // fine lezione
  advSlow:['Il tempo è difficile all\'inizio: torna su "A tempo 70%" e conta 1-2-3-4 nella testa.', 'Timing is hard at first: go back to "In time 70%" and count 1-2-3-4 in your head.', 'Спочатку темп дається важко: повернися до «У темпі 70%» і рахуй 1-2-3-4 подумки.'],
  adv70:['Ottimo a velocità ridotta: ora prova "A tempo 100%".', 'Great at reduced speed: now try "In time 100%".', 'Чудово на зниженій швидкості: тепер спробуй «У темпі 100%».'],
  advErr:['Molti errori: rifalla più lenta. Tre volte giuste valgono più di trenta sbagliate.', 'Lots of mistakes: try it again, slower. Three right times are worth more than thirty wrong ones.', 'Багато помилок: зіграй ще раз, повільніше. Три правильні рази варті більше, ніж тридцять неправильних.'],
  perfect:['Perfetto.', 'Perfect.', 'Ідеально.'], doneH:['Fatto.', 'Done.', 'Готово.'],
  xpFirst:[' (+20 prima volta)', ' (+20 first time)', ' (+20 за перший раз)'],
  inTime:['a tempo ({p})', 'in time ({p})', 'у темпі ({p})'],
  perfN:['perfette', 'perfect', 'ідеально'],
  offMiss:['fuori tempo o mancate', 'off time or missed', 'не в темп або пропущено'],
  bestCombo:['combo migliore', 'best combo', 'найкраще комбо'],
  errs:[['errore', 'errori'], ['mistake', 'mistakes'], ['помилка', 'помилки', 'помилок']],
  fixed:[['punto riparato', 'punti riparati'], ['spot fixed', 'spots fixed'], ['місце виправлено', 'місця виправлено', 'місць виправлено']],
  lvUp:['Livello {n} raggiunto · {x}', 'Level {n} reached · {x}', 'Досягнуто рівня {n} · {x}'],
  masteredDone:['Padroneggiata: suonata a tempo al 100%', 'Mastered: played in time at 100%', 'Опановано: зіграно в темпі на 100%'],
  sessComplete:[['Sessione di oggi completata · {n} giorno di fila', 'Sessione di oggi completata · {n} giorni di fila'], ['Today’s session complete · {n} day in a row', 'Today’s session complete · {n} days in a row'],
    ['Сьогоднішнє заняття завершено · {n} день поспіль', 'Сьогоднішнє заняття завершено · {n} дні поспіль', 'Сьогоднішнє заняття завершено · {n} днів поспіль']],
  sNext:['Avanti nella sessione', 'Next in the session', 'Далі в занятті'],
  again:['Ancora', 'Again', 'Ще раз'], anotherEx:['Un altro esercizio', 'Another exercise', 'Ще одна вправа'], oncemore:['Di nuovo', 'Once more', 'Знову'],
  nextL:['Prossima lezione', 'Next lesson', 'Наступний урок'],
  home:['Home', 'Home', 'Головна'],
  anyKeyDone:['oppure premi un tasto qualsiasi della pianola', 'or press any key on your keyboard', 'або натисни будь-яку клавішу синтезатора'],
  // base, a tempo, calibrazione
  baseOn:['Base accesa', 'Backing on', 'Акомпанемент увімкнено'], baseOff:['Base spenta', 'Backing off', 'Акомпанемент вимкнено'],
  ready:['Pronti… <em>{n}</em>', 'Ready… <em>{n}</em>', 'Готові… <em>{n}</em>'],
  jPerf:['Perfetto', 'Perfect', 'Ідеально'], jGood:['Bene', 'Good', 'Добре'], jEarly:['Presto', 'Early', 'Зарано'], jLate:['Tardi', 'Late', 'Запізно'], jMiss:['Mancata', 'Missed', 'Пропущено'],
  calSay:['Calibrazione: suona <em>un tasto qualsiasi</em> insieme a ogni click, dopo i 4 di attacco.', 'Calibration: play <em>any key</em> together with each click, after the 4 count-in clicks.', 'Калібрування: грай <em>будь-яку клавішу</em> разом із кожним клацанням, після 4 на відлік.'],
  calTip:['Serve una volta per dispositivo: corregge il ritardo di microfono o cavo.', 'You only need this once per device: it corrects the delay of the microphone or cable.', 'Потрібно один раз на пристрій: виправляє затримку мікрофона чи кабелю.'],
  calFew:['Pochi tasti sentiti: riprova suonando più forte, insieme ai click.', 'Too few keys heard: try again, playing louder, along with the clicks.', 'Почуто замало клавіш: спробуй ще раз, грай гучніше, разом із клацаннями.'],
  calOk:['Fatto: ritardo {k} {ms} ms. Ora la modalità a tempo è precisa.', 'Done: {k} delay {ms} ms. In time mode is now accurate.', 'Готово: затримка {k} {ms} мс. Тепер режим «У темпі» точний.'],
  calMic:['del microfono', 'microphone', 'мікрофона'], calKbd:['della tastiera', 'keyboard', 'клавіатури'],
  // input
  usb:['Pianola collegata via USB', 'Keyboard connected via USB', 'Синтезатор підключено через USB'],
  micOn:['Microfono attivo', 'Microphone on', 'Мікрофон увімкнено'], micUse:['Usa il microfono', 'Use the microphone', 'Увімкнути мікрофон'],
  aHttps:['Il microfono funziona solo da un indirizzo https:// o da localhost.', 'The microphone only works from an https:// address or from localhost.', 'Мікрофон працює лише з адреси https:// або з localhost.'],
  aDenied:['Il microfono non è autorizzato, quindi l\'app non sente la pianola.\n\nSu iPad: Impostazioni › Safari › Microfono › Consenti (oppure tocca "aA" nella barra degli indirizzi › Impostazioni sito web › Microfono). Poi ricarica la pagina.',
    'The microphone isn’t allowed, so the app can’t hear your keyboard.\n\nOn iPad: Settings › Safari › Microphone › Allow (or tap "aA" in the address bar › Website Settings › Microphone). Then reload the page.',
    'Доступ до мікрофона не надано, тому застосунок не чує синтезатор.\n\nНа iPad: Параметри › Safari › Мікрофон › Дозволити (або торкнися «aA» в рядку адреси › Параметри вебсайту › Мікрофон). Потім перезавантаж сторінку.'],
};
const LI = ['it', 'en', 'uk'].indexOf(LANG), L10N = I18N[LANG];
const plural = n => LANG === 'uk' ? (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2) : n === 1 ? 0 : 1;
function t(k, vars = {}) {
  let s = STR[k]?.[LI] ?? STR[k]?.[0] ?? k;
  if (Array.isArray(s)) s = s[Math.min(s.length - 1, plural(+vars.n || 0))];
  return s.replace(/\{(\w+)\}/g, (m, v) => v in vars ? vars[v] : m);
}
// testi del curriculum nella lingua scelta (l'italiano resta la sorgente e la base degli id)
const trLevel = (L, li) => ({ ...L, ...CURR_TR[LANG]?.levels[li] });
function trLesson(x, id) {
  const tr = CURR_TR[LANG]?.lessons[id]; if (!tr) return {};
  const o = { t:tr.t }; if (tr.tip) o.tip = tr.tip;
  if (x.cards && tr.cards) o.cards = x.cards.map((c, i) => ({ ...c, ...tr.cards[i] }));
  return o;
}
// selettore della lingua: salva e ricarica; dalla home si rientra nello stesso profilo
const langSel = id => `<label class="lang">${t('lang')} <select id="${id}">${Object.entries(LANGS).map(([k, v]) => `<option value="${k}" lang="${k}"${k === LANG ? ' selected' : ''}>${v}</option>`).join('')}</select></label>`;

// ===== Spiegazioni guidate (frasi a schermo, sincronizzate con la tastiera) =====
// segnaposto: {c} {d} {e} {f} {g} {a} {b} = nomi delle note bianche, {fs} = Fa♯, {bb} = Si♭
const TOURS = {
  groups:{
    it:['Questa è la tastiera: tasti bianchi e tasti neri.', 'Guarda i tasti neri: sono a gruppi di due…', '…e a gruppi di tre.', 'Due, tre, due, tre: lo schema si ripete per tutta la tastiera. È la tua mappa.'],
    en:['This is the keyboard: white keys and black keys.', 'Look at the black keys: they come in groups of two…', '…and in groups of three.', 'Two, three, two, three: the pattern repeats across the whole keyboard. It’s your map.'],
    uk:['Це клавіатура: білі й чорні клавіші.', 'Подивись на чорні клавіші: вони йдуть групами по дві…', '…і групами по три.', 'Дві, три, дві, три: цей візерунок повторюється по всій клавіатурі. Це твоя карта.'] },
  lowhigh:{
    it:['A sinistra i suoni sono gravi, bassi.', 'Andando verso destra diventano sempre più acuti.', 'Ascolta: dal grave all’acuto.'],
    en:['On the left the sounds are low and deep.', 'Moving to the right they get higher and higher.', 'Listen: from low to high.'],
    uk:['Ліворуч звуки низькі, глибокі.', 'Що правіше, то вищими вони стають.', 'Послухай: від низьких до високих.'] },
  'find:C':{
    it:['Questo è il {c}.', 'Si trova subito a sinistra dei due tasti neri.', 'Lo riconosci così: cerca i due tasti neri e scendi al tasto bianco alla loro sinistra.', 'Ce n’è uno per ogni gruppo da due: eccoli tutti.', 'Noi useremo quello in mezzo, il più vicino a te: il {c} centrale.'],
    en:['This is {c}.', 'It sits just left of the two black keys.', 'Here’s how to spot it: find the two black keys and step down to the white key on their left.', 'There’s one for every group of two: here they all are.', 'We’ll use the one in the middle, closest to you: middle {c}.'],
    uk:['Це {c}.', 'Воно одразу ліворуч від двох чорних клавіш.', 'Ось як його впізнати: знайди дві чорні клавіші й спустися на білу ліворуч від них.', 'Таке є біля кожної групи з двох: ось вони всі.', 'Ми будемо грати те, що посередині, найближче до тебе: середнє {c}.'] },
  seven:{
    it:['Partendo dal {c}, i tasti bianchi hanno sette nomi.', '{c}, {d}, {e}, {f}, {g}, {a}, {b}.', 'Dopo il {b} ricomincia un altro {c}: i nomi si ripetono sempre uguali.'],
    en:['Starting from {c}, the white keys have seven names.', '{c}, {d}, {e}, {f}, {g}, {a}, {b}.', 'After {b} a new {c} begins: the names always repeat the same way.'],
    uk:['Починаючи з {c}, білі клавіші мають сім назв.', '{c}, {d}, {e}, {f}, {g}, {a}, {b}.', 'Після {b} починається нове {c}: назви завжди повторюються.'] },
  'find:F':{
    it:['Questo è il {f}.', 'Si trova subito a sinistra dei tre tasti neri.', '{c} e {f} sono i tuoi punti di riferimento: da loro trovi tutte le altre note.'],
    en:['This is {f}.', 'It sits just left of the three black keys.', '{c} and {f} are your landmarks: from them you can find every other note.'],
    uk:['Це {f}.', 'Воно одразу ліворуч від трьох чорних клавіш.', '{c} і {f} — твої орієнтири: від них знайдеш усі інші ноти.'] },
  middleC:{
    it:['Questo è il {c} centrale, a metà della tastiera.', 'Sulla tua Melody 61 è il terzo {c} contando da sinistra.', 'Tutte le prime lezioni partono da qui: appoggia il pollice destro su questo tasto.'],
    en:['This is middle {c}, halfway along the keyboard.', 'On your Melody 61 it’s the third {c} counting from the left.', 'All the first lessons start here: rest your right thumb on this key.'],
    uk:['Це середнє {c}, посередині клавіатури.', 'На твоїй Melody 61 це третє {c}, якщо рахувати зліва.', 'Усі перші уроки починаються тут: поклади правий великий палець на цю клавішу.'] },
  fingers:{
    it:['Ogni dito ha un numero. Il pollice è 1.', 'Poi indice 2, medio 3, anulare 4 e mignolo 5.', 'Vale per tutte e due le mani. Con la destra sul {c} centrale: pollice sul {c}, mignolo sul {g}.'],
    en:['Every finger has a number. Your thumb is 1.', 'Then index 2, middle 3, ring 4 and little finger 5.', 'It’s the same for both hands. With your right hand on middle {c}: thumb on {c}, little finger on {g}.'],
    uk:['Кожен палець має номер. Великий — це 1.', 'Далі вказівний 2, середній 3, безіменний 4 і мізинець 5.', 'Так для обох рук. Права рука на середньому {c}: великий на {c}, мізинець на {g}.'] },
  staff:{
    it:['Le note si scrivono sul pentagramma: cinque linee.', 'Il {c} centrale sta su una piccola linea tutta sua, sotto le cinque.', 'Ogni nota più alta sale di un gradino: {d} nello spazio, {e} sulla linea, poi {f} e {g}.'],
    en:['Notes are written on the staff: five lines.', 'Middle {c} sits on its own little line, below the five.', 'Each higher note climbs one step: {d} in the space, {e} on the line, then {f} and {g}.'],
    uk:['Ноти записують на нотному стані: п’ять ліній.', 'Середнє {c} стоїть на власній маленькій лінії, під п’ятьма.', 'Кожна вища нота піднімається на сходинку: {d} у проміжку, {e} на лінії, далі {f} і {g}.'] },
  bass:{
    it:['La mano sinistra legge sul pentagramma di sotto, in chiave di basso.', 'Qui il {c} sotto il centrale sta nel secondo spazio dal basso.', 'Da lì salgono {d}, {e}, {f} e {g}: mignolo sinistro sul {c}.'],
    en:['Your left hand reads the lower staff, the bass clef.', 'Here the {c} below middle {c} sits in the second space from the bottom.', 'From there come {d}, {e}, {f} and {g}: left little finger on {c}.'],
    uk:['Ліва рука читає нижній нотний стан — басовий ключ.', 'Тут {c} під середнім стоїть у другому проміжку знизу.', 'Звідти йдуть {d}, {e}, {f} і {g}: лівий мізинець на {c}.'] },
  intervals:{
    it:['Per leggere più in fretta, guarda la distanza tra le note.', 'Dal {c} al {d}: il tasto accanto. È una seconda.', 'Dal {c} al {e}: salti un tasto. È una terza: da linea a linea.', 'Poi la quarta e la quinta: salti due e tre tasti.'],
    en:['To read faster, look at the distance between notes.', 'From {c} to {d}: the next key. That’s a second.', 'From {c} to {e}: skip one key. That’s a third: line to line.', 'Then the fourth and the fifth: skip two and three keys.'],
    uk:['Щоб читати швидше, дивись на відстань між нотами.', 'Від {c} до {d}: сусідня клавіша. Це секунда.', 'Від {c} до {e}: пропусти одну клавішу. Це терція: з лінії на лінію.', 'Далі кварта й квінта: пропусти дві й три клавіші.'] },
  sharp:{
    it:['Questo è il {f}.', 'Il diesis lo alza di un tasto: il nero subito a destra.', 'Si chiama {fs}.'],
    en:['This is {f}.', 'A sharp raises it by one key: the black key just to the right.', 'It’s called {fs}.'],
    uk:['Це {f}.', 'Дієз підвищує її на одну клавішу: чорну одразу праворуч.', 'Вона називається {fs}.'] },
  flat:{
    it:['Questo è il {b}.', 'Il bemolle lo abbassa di un tasto: il nero subito a sinistra.', 'Si chiama {bb}.'],
    en:['This is {b}.', 'A flat lowers it by one key: the black key just to the left.', 'It’s called {bb}.'],
    uk:['Це {b}.', 'Бемоль знижує її на одну клавішу: чорну одразу ліворуч.', 'Вона називається {bb}.'] },
  chord:{
    it:['Un accordo sono più note suonate insieme.', 'Il {c} maggiore: parti dal {c}…', '…salti un tasto e prendi il {e}…', '…salti ancora e prendi il {g}.', 'Ora tutte e tre insieme: {c}, {e}, {g}.'],
    en:['A chord is several notes played together.', '{c} major: start from {c}…', '…skip a key and take {e}…', '…skip again and take {g}.', 'Now all three together: {c}, {e}, {g}.'],
    uk:['Акорд — це кілька нот, зіграних разом.', '{c} мажор: почни з {c}…', '…пропусти клавішу й візьми {e}…', '…пропусти ще одну й візьми {g}.', 'А тепер усі три разом: {c}, {e}, {g}.'] },
};
STR.tutBack = ['Indietro', 'Back', 'Назад'];
STR.tutStart = ['Inizia l’esercizio', 'Start the exercise', 'Почати вправу'];
STR.tSkip = ['Salta', 'Skip', 'Пропустити'];
STR.tReplay = ['Rivedi la spiegazione', 'Watch the explanation again', 'Переглянути пояснення'];
STR.tVoice = ['Voce', 'Voice', 'Голос'];
STR.tYourTurn = ['Ora tocca a te.', 'Now it’s your turn.', 'Тепер твоя черга.'];
