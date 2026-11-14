
    // Kategorien und Teams
    const categories = ["Pop", "Hip-Hop/Rap", "Rock/Metal", "Party", "60s-70s", "80s-90s", "00s-10s"];
    const teams = [];
    let scores = {};
    let currentTeamIndex = 0;
    let totalButtons = 0;
    let clickedButtons = 0;
    let selectedButton = null;
    let currentQuestion = null; // Enthält das aktuelle Frageobjekt
    let isPaused = false;

    /* JSON Array mit Frage-Daten
       Jede Frage kann folgende Attribute haben:
         - category: muss zur Kategorie des Buttons passen
         - points: Punktewert, der ebenfalls mit dem Button übereinstimmen muss
         - type: "video", "soundcloud" oder "lyrics"
         - url: (bei "video" oder "soundcloud") die URL der einzubettenden Ressource.
         - lyrics: (bei "lyrics") der anzuzeigende Liedtext.
         - correctAnswer: Die richtige Antwort, die beim Klick auf "Antwort zeigen" angezeigt wird.
    */
    const questions = [
          // POP
          { category: "Pop", points: 10, type: "soundcloud", url: "https://soundcloud.com/onedirectionmusic/story-of-my-life", correctAnswer: "Story of My Life - One Direction" },
          { category: "Pop", points: 20, type: "soundcloud", url: "https://soundcloud.com/mark-forster-official/flash-mich", correctAnswer: "Flash Mich - Mark Forster" },
          { category: "Pop", points: 30, type: "soundcloud", url: "https://soundcloud.com/rodrigo-vidal-161486675/demons-imagine-dragons", correctAnswer: "Demons - Imagine Dragons" },
          { category: "Pop", points: 40, type: "soundcloud", url: "https://soundcloud.com/user-788990709/sets/wenn-sie-tanzt", correctAnswer: "Wenn sie tanzt - Max Giesinger" },
          { category: "Pop", points: 50, type: "soundcloud", url: "https://soundcloud.com/mjimmortal/chicago", correctAnswer: "Chicago - Michael Jackson" },
          { category: "Pop", points: 60, type: "soundcloud", url: "https://soundcloud.com/george-ezra/shotgun", correctAnswer: "Shotgun - George Ezra" },
          { category: "Pop", points: 70, type: "soundcloud", url: "https://soundcloud.com/thecardigans/my-favourite-game", correctAnswer: "My Favourite Game - The Cardigans" },
          { category: "Pop", points: 80, type: "soundcloud", url: "https://soundcloud.com/om-tneu-o/body-on-my-loud-luxury-ft", correctAnswer: "Body - Loud Luxury feat. Brando" },
          { category: "Pop", points: 90, type: "soundcloud", url: "https://soundcloud.com/sarah-connor-official/kommst-du-mit-ihr", correctAnswer: "Kommst du mit ihr - Sarah Connor" },
          { category: "Pop", points: 100, type: "soundcloud", url: "https://soundcloud.com/remi-wolf/cinderella", correctAnswer: "Cinderella - Remi Wolf" },

          // HIP-HOP/RAP
          { category: "Hip-Hop/Rap", points: 10, type: "soundcloud", url: "https://soundcloud.com/apache207/roller", correctAnswer: "Roller - Apache 207" },
          { category: "Hip-Hop/Rap", points: 20, type: "soundcloud", url: "https://soundcloud.com/pashanimofficial/kleiner-prinz", correctAnswer: "Kleiner Prinz - Pashanim" },
          { category: "Hip-Hop/Rap", points: 30, type: "soundcloud", url: "https://soundcloud.com/dickimili/eminem-lose-yourself-original-version", correctAnswer: "Lose Yourself - Eminem" },
          { category: "Hip-Hop/Rap", points: 40, type: "soundcloud", url: "https://soundcloud.com/demon-245031496/shotta-flow-12345-and-6-all-together-top-shotta-and-remix", correctAnswer: "Shotta Flow - NLE Choppa" },
          { category: "Hip-Hop/Rap", points: 50, type: "soundcloud", url: "https://soundcloud.com/xd4mien/lil-koasyy-eligella-mich", correctAnswer: "Eligella Fick Mich - Lil Koasyy" },
          { category: "Hip-Hop/Rap", points: 60, type: "soundcloud", url: "https://soundcloud.com/zah1de/mona-lisa-motion", correctAnswer: "Mona Lisa Motion - Zahide" },
          { category: "Hip-Hop/Rap", points: 70, type: "soundcloud", url: "https://soundcloud.com/user-749112347/jocelyn-flores-xxxtentacion", correctAnswer: "Jocelyn Flores - XXXTentacion" },
          { category: "Hip-Hop/Rap", points: 80, type: "soundcloud", url: "https://soundcloud.com/theluigiguy831/jay-rock-elbows", correctAnswer: "Elbows - Jay Rock" },
          { category: "Hip-Hop/Rap", points: 90, type: "soundcloud", url: "https://soundcloud.com/madvillain-official/accordian", correctAnswer: "Accordion - Madvillain, Madlib, MF DOOM" },
          { category: "Hip-Hop/Rap", points: 100, type: "soundcloud", url: "https://soundcloud.com/mos-def-official/mathematics", correctAnswer: "Mathematics - Mos Def" },

          // ROCK/METAL
          { category: "Rock/Metal", points: 10, type: "soundcloud", url: "https://soundcloud.com/mandylinkinparkmusic2xd/somewhere-i-belong", correctAnswer: "Somewhere I Belong - Linkin Park" },
          { category: "Rock/Metal", points: 20, type: "soundcloud", url: "https://soundcloud.com/atlanticrecords/02-monster", correctAnswer: "Monster - Skillet" },
          { category: "Rock/Metal", points: 30, type: "soundcloud", url: "https://soundcloud.com/raife-duarte/evanescence-bring-me-to-life", correctAnswer: "Bring Me to Life - Evanescence" },
          { category: "Rock/Metal", points: 40, type: "soundcloud", url: "https://soundcloud.com/blacksabbath/paranoid", correctAnswer: "Paranoid - Black Sabbath" },
          { category: "Rock/Metal", points: 50, type: "soundcloud", url: "https://soundcloud.com/nirvana/dumb", correctAnswer: "Dumb - Nirvana" },
          { category: "Rock/Metal", points: 60, type: "soundcloud", url: "https://soundcloud.com/tokio-hotel-official/shout-2-the-universe", correctAnswer: "Shout 2 The Universe - Tokio Hotel" },
          { category: "Rock/Metal", points: 70, type: "soundcloud", url: "https://soundcloud.com/user-833966108/van-halen-jump", correctAnswer: "Jump - Van Halen" },
          { category: "Rock/Metal", points: 80, type: "soundcloud", url: "https://soundcloud.com/efrenjuva/rammstein-deutschland", correctAnswer: "Deutschland - Rammstein" },
          { category: "Rock/Metal", points: 90, type: "soundcloud", url: "https://soundcloud.com/slayerofficial/raining-blood-album-version", correctAnswer: "Raining Blood - Slayer" },
          { category: "Rock/Metal", points: 100, type: "soundcloud", url: "https://soundcloud.com/nuclearblastrecords/meshuggah-bleed", correctAnswer: "Bleed - Meshuggah" },

          // PARTY
          { category: "Party", points: 10, type: "soundcloud", url: "https://soundcloud.com/ladygaga/poker-face", correctAnswer: "Poker Face - Lady Gaga" },
          { category: "Party", points: 20, type: "soundcloud", url: "https://soundcloud.com/mickie-krause/schatzi-schenk-mir-ein-foto-13", correctAnswer: "Schatzi schenk mir ein Foto - Mickie Krause" },
          { category: "Party", points: 30, type: "soundcloud", url: "https://soundcloud.com/jenniferlopez/on-the-floor-album-version", correctAnswer: "On The Floor - Jennifer Lopez, Pitbull" },
          { category: "Party", points: 40, type: "soundcloud", url: "https://soundcloud.com/davidguetta/titanium-feat-sia-6", correctAnswer: "Titanium - David Guetta feat. Sia" },
          { category: "Party", points: 50, type: "soundcloud", url: "https://soundcloud.com/bryanadams/summer-of-69", correctAnswer: "Summer of '69 - Bryan Adams" },
          { category: "Party", points: 60, type: "soundcloud", url: "https://soundcloud.com/cleopatra-recs/lou-bega-mambo-no-5-a-little", correctAnswer: "Mambo No. 5 - Lou Bega" },
          { category: "Party", points: 70, type: "soundcloud", url: "https://soundcloud.com/majorlazer/major-lazer-dj-snake-lean-on-feat-mo", correctAnswer: "Lean On - Major Lazer, MØ, DJ Snake" },
          { category: "Party", points: 80, type: "soundcloud", url: "https://soundcloud.com/gunther-official/ding-dong-song-radio-edit", correctAnswer: "Ding Dong Song (Radio Edit) - Günther" },
          { category: "Party", points: 90, type: "soundcloud", url: "https://soundcloud.com/maximo-park-1/apply-some-pressure", correctAnswer: "Apply Some Pressure - Maxïmo Park" },
          { category: "Party", points: 100, type: "soundcloud", url: "https://soundcloud.com/gabriele-mueller-986230065/dragostea-din-tei", correctAnswer: "Dragostea din tei - O-Zone" },

          // 60s-70s
          { category: "60s-70s", points: 10, type: "soundcloud", url: "https://soundcloud.com/queen-69312/we-will-rock-you-104749910", correctAnswer: "We Will Rock You - Queen" },
          { category: "60s-70s", points: 20, type: "soundcloud", url: "https://soundcloud.com/udo-jurgens/griechischer-wein-1", correctAnswer: "Griechischer Wein - Udo Jürgens" },
          { category: "60s-70s", points: 30, type: "soundcloud", url: "https://soundcloud.com/elvissonymusic/cant-help-falling-in-love-1", correctAnswer: "Can't Help Falling in Love - Elvis Presley" },
          { category: "60s-70s", points: 40, type: "soundcloud", url: "https://soundcloud.com/reinhardmey/ber-den-wolken-4", correctAnswer: "Über den Wolken - Reinhard Mey" },
          { category: "60s-70s", points: 50, type: "soundcloud", url: "https://soundcloud.com/freddy-quinn-official/junge-komm-bald-wieder-1", correctAnswer: "Junge, komm bald wieder - Freddy Quinn" },
          { category: "60s-70s", points: 60, type: "soundcloud", url: "https://soundcloud.com/kansasband/play-the-game-tonight", correctAnswer: "Play the Game Tonight - Kansas" },
          { category: "60s-70s", points: 70, type: "soundcloud", url: "https://soundcloud.com/tomorrow46829/my-white-bicycle-2023-remaster", correctAnswer: "My White Bicycle - Tomorrow" },
          { category: "60s-70s", points: 80, type: "soundcloud", url: "https://soundcloud.com/user-38096932/creedence-clearwater-revival-fortunate-son", correctAnswer: "Fortunate Son - Creedence Clearwater Revival" },
          { category: "60s-70s", points: 90, type: "soundcloud", url: "https://soundcloud.com/trees-official/the-garden-of-jane-delawney", correctAnswer: "The Garden of Jane Delawney - Trees" },
          { category: "60s-70s", points: 100, type: "soundcloud", url: "https://soundcloud.com/thedoors/riders-on-the-storm-2", correctAnswer: "Riders on the Storm - The Doors" },

          // 80s-90s
          { category: "80s-90s", points: 10, type: "soundcloud", url: "https://soundcloud.com/thebackstreetboys/i-want-it-that-way", correctAnswer: "I Want It That Way - Backstreet Boys" },
          { category: "80s-90s", points: 20, type: "soundcloud", url: "https://soundcloud.com/bonjovi/livin-on-a-prayer-1", correctAnswer: "Livin' on a Prayer - Bon Jovi" },
          { category: "80s-90s", points: 30, type: "soundcloud", url: "https://soundcloud.com/camayn/zombie-the-cranberries", correctAnswer: "Zombie - The Cranberries" },
          { category: "80s-90s", points: 40, type: "soundcloud", url: "https://soundcloud.com/mrcyclo/wannabe-spice-girls-cut-ver", correctAnswer: "Wannabe - Spice Girls" },
          { category: "80s-90s", points: 50, type: "soundcloud", url: "https://soundcloud.com/the-outfield/your-love-2", correctAnswer: "Your Love - The Outfield" },
          { category: "80s-90s", points: 60, type: "soundcloud", url: "https://soundcloud.com/mustafa-sharawi/israel-kamakawiwoole-somewhere", correctAnswer: "Over the Rainbow - Israel Kamakawiwo'ole" },
          { category: "80s-90s", points: 70, type: "soundcloud", url: "https://soundcloud.com/the-bunnymen/the-killing-moon-2", correctAnswer: "The Killing Moon - Echo & The Bunnymen" },
          { category: "80s-90s", points: 80, type: "soundcloud", url: "https://soundcloud.com/dead-can-dance/dead-can-dance-the-host-of", correctAnswer: "The Host of Seraphim - Dead Can Dance" },
          { category: "80s-90s", points: 90, type: "soundcloud", url: "https://soundcloud.com/mybloodyvalentinemusic/when-you-sleep-remastered", correctAnswer: "When You Sleep - My Bloody Valentine" },
          { category: "80s-90s", points: 100, type: "soundcloud", url: "https://soundcloud.com/ute-freudenberg-official/jugendliebe-1", correctAnswer: "Jugendliebe - Ute Freudenberg" },

          // 00s-10s
          { category: "00s-10s", points: 10, type: "soundcloud", url: "https://soundcloud.com/rihanna/umbrella-radio-edit", correctAnswer: "Umbrella - Rihanna" },
          { category: "00s-10s", points: 20, type: "soundcloud", url: "https://soundcloud.com/keanemusic/somewhere-only-we-know", correctAnswer: "Somewhere Only We Know - Keane" },
          { category: "00s-10s", points: 30, type: "soundcloud", url: "https://soundcloud.com/black-eyed-peas-official/i-gotta-feeling-album-version", correctAnswer: "I Gotta Feeling - Black Eyed Peas" },
          { category: "00s-10s", points: 40, type: "soundcloud", url: "https://soundcloud.com/kanyewest/stronger-1", correctAnswer: "Stronger - Kanye West" },
          { category: "00s-10s", points: 50, type: "soundcloud", url: "https://soundcloud.com/willemijn-verkaik/lass-jetzt-los-german-version", correctAnswer: "Lass jetzt los - Willemijn Verkaik" },
          { category: "00s-10s", points: 60, type: "soundcloud", url: "https://soundcloud.com/rihanna/man-down-album-version-1", correctAnswer: "Man Down - Rihanna" },
          { category: "00s-10s", points: 70, type: "soundcloud", url: "https://soundcloud.com/franzferdinand/take-me-out-2", correctAnswer: "Take Me Out - Franz Ferdinand" },
          { category: "00s-10s", points: 80, type: "soundcloud", url: "https://soundcloud.com/republicrecordsstaff/of-monsters-and-men-mountain", correctAnswer: "Mountain Sound - Of Monsters and Men" },
          { category: "00s-10s", points: 90, type: "soundcloud", url: "https://soundcloud.com/sweettrip/dsco", correctAnswer: "Dsco - Sweet Trip" },
          { category: "00s-10s", points: 100, type: "soundcloud", url: "https://soundcloud.com/burial-uk-1/archangel", correctAnswer: "Archangel - Burial" },
        ];
        



    function startGame() {
      const t1 = document.getElementById("team1").value || "Team 1";
      const t2 = document.getElementById("team2").value || "Team 2";
      const t3 = document.getElementById("team3").value || "Team 3";
      const t4 = document.getElementById("team4").value || "Team 4";

      teams.push(t1, t2, t3, t4);
      teams.forEach(team => scores[team] = 0);

      document.getElementById("teamInputArea").classList.add("hidden");
      document.getElementById("scoreboard").classList.remove("hidden");
      document.getElementById("board").classList.remove("hidden");
      document.getElementById("currentTeamDisplay").classList.remove("hidden");
      document.getElementById("controls").classList.remove("hidden");

      updateScoreboard();
      showCurrentTeam();
      drawBoard();
    }

    function updateScoreboard() {
      const board = document.getElementById("scoreboard");
      board.innerHTML = teams.map(team => `
        <div class="team-box" id="team-${team}">
          ${team}<br><strong>${scores[team]}</strong> Punkte
        </div>
      `).join("\n");
    }

    function showCurrentTeam() {
      document.getElementById("currentTeamDisplay").textContent = `➡️ Aktuell dran: ${teams[currentTeamIndex]}`;
    }

    function nextTeam() {
      currentTeamIndex = (currentTeamIndex + 1) % teams.length;
      showCurrentTeam();
    }

    function drawBoard() {
      const board = document.getElementById("board");

      // Kategorien (erste Zeile)
      categories.forEach(cat => {
        const header = document.createElement("div");
        header.className = "category";
        header.textContent = cat;
        board.appendChild(header);
      });

      // Erstellen der Punkte-Buttons (von 10 bis 100)
      for (let points = 10; points <= 100; points += 10) {
        categories.forEach((cat) => {
          const btn = document.createElement("button");
          btn.className = "button";
          btn.textContent = points;
          totalButtons++;

          // Speichere Kategorie und Punkte als Data-Attribute
          btn.dataset.category = cat;
          btn.dataset.points = points;

          btn.onclick = () => {
            selectedButton = btn;
            // Finde das passende Frageobjekt anhand von Kategorie und Punktewert
            currentQuestion = questions.find(q => q.category === cat && q.points == points);
            displayQuestion();
          };

          board.appendChild(btn);
        });
      }
    }

    // Zeigt die Frage im Popup an (Video, SoundCloud oder Lyrics)
    function displayQuestion() {
      const contentDiv = document.getElementById("questionContent");
      contentDiv.innerHTML = ""; // Vorherigen Inhalt entfernen

      // Wenn vorhanden, blendet auch den Antwortbereich aus
      document.getElementById("correctAnswerDisplay").classList.add("hidden");
      document.getElementById("correctAnswerText").textContent = "";

      if (currentQuestion) {
        if (currentQuestion.type === "video" && currentQuestion.url) {
          // Erstelle den YouTube-Iframe (invisibler Player)
          const iframe = document.createElement("iframe");
          iframe.src = currentQuestion.url;
          iframe.className = "invisible-video";
          iframe.setAttribute("allow", "autoplay");
          iframe.id = "activeVideo";
          contentDiv.appendChild(iframe);
        } else if (currentQuestion.type === "soundcloud" && currentQuestion.url) {
          // Erstelle den SoundCloud-Embed-Iframe
          const iframe = document.createElement("iframe");
          const embedUrl = "https://w.soundcloud.com/player/?url=" +
                           encodeURIComponent(currentQuestion.url) +
                           "&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false";
          iframe.src = embedUrl;
          iframe.className = "invisible-video";
          iframe.setAttribute("allow", "autoplay");
          iframe.id = "activeSoundcloud";
          contentDiv.appendChild(iframe);
        } else if (currentQuestion.type === "lyrics" && currentQuestion.lyrics) {
          // Erstelle einen Container für die Lyrics
          const lyricsDiv = document.createElement("div");
          lyricsDiv.className = "lyrics-container";
          lyricsDiv.innerHTML = `<pre>${currentQuestion.lyrics}</pre>`;
          lyricsDiv.id = "lyricsDisplay";
          contentDiv.appendChild(lyricsDiv);
        }else if (currentQuestion.type === "audio" && currentQuestion.file) {
          // Handle local audio files or URLs
          const audioPlayer = document.createElement("audio");
          audioPlayer.src = currentQuestion.file;
          audioPlayer.controls = true;
          audioPlayer.autoplay = true;
          contentDiv.appendChild(audioPlayer);
        }
      }
      
      // Zeige das Popup an
      document.getElementById("popup").style.display = 'block';

      // Erstelle die Team-Buttons für die Punktevergabe dynamisch
      const container = document.getElementById("teamButtonsContainer");
      container.innerHTML = "";
      teams.forEach(team => {
        const teamButton = document.createElement("button");
        teamButton.textContent = `Team ${team}`;
        teamButton.onclick = () => { awardPoints(team); };
        container.appendChild(teamButton);
      });
    }

    // Entfernt dynamisch eingefügte Medieninhalte (YouTube, SoundCloud, Lyrics)
    function removeQuestionElements() {
      const yt = document.getElementById("activeVideo");
      if (yt) {
        yt.parentElement.removeChild(yt);
      }
      const sc = document.getElementById("activeSoundcloud");
      if (sc) {
        sc.parentElement.removeChild(sc);
      }
      const lyricsDisplay = document.getElementById("lyricsDisplay");
      if (lyricsDisplay) {
        lyricsDisplay.parentElement.removeChild(lyricsDisplay);
      }
      document.getElementById("questionContent").innerHTML = "";
      currentQuestion = null;
    }

    function awardPoints(teamName) {
      const points = parseInt(selectedButton.textContent);
      scores[teamName] += points;
      updateScoreboard();
      animateScore(teamName, points);
      selectedButton.disabled = true;
      clickedButtons++;
      removeQuestionElements();
      if (clickedButtons === totalButtons) {
        showWinner();
      }
      document.getElementById("popup").style.display = 'none';
    }

    function resetSelection() {
      selectedButton = null;
      removeQuestionElements();
      document.getElementById("popup").style.display = 'none';
    }

    function pauseGame() {
      const pauseBtn = document.getElementById("pause-button");
    
      // LOCAL AUDIO
      const audio = document.querySelector("#questionContent audio");
      if (audio) {
        if (isPaused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    
      // SOUNDCLOUD
      const sc = document.getElementById("activeSoundcloud");
      if (sc) {
        const command = isPaused ? "play" : "pause";
        sc.contentWindow.postMessage(
          JSON.stringify({ method: command }),
          "*"
        );
      }
    
      // Toggle state + button text
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? "Play" : "Pause";
    }
    

    function animateScore(teamName, points) {
      const box = document.getElementById("team-" + teamName);
      const anim = document.createElement("div");
      anim.className = "score-animation";
      let currentPoints = 0;
      const interval = setInterval(() => {
        if (currentPoints < points) {
          currentPoints++;
          anim.textContent = `+${currentPoints} Punkte!`;
          const percentage = currentPoints / points;
          anim.style.color = `rgb(${255 - percentage * 255}, ${percentage * 255}, 0)`;
          box.appendChild(anim);
        } else {
          clearInterval(interval);
        }
      }, 50);
    }

    function showWinner() {
      const winner = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
      document.getElementById("winnerDisplay").textContent = `🏆 ${winner} hat gewonnen!`;
      document.getElementById("winnerDisplay").classList.remove("hidden");
    }

    // Funktion zum Anzeigen des korrekten Antworttextes
    function revealAnswer() {
      if (currentQuestion && currentQuestion.correctAnswer) {
        const answerDisplay = document.getElementById("correctAnswerDisplay");
        const answerText = document.getElementById("correctAnswerText");
        answerText.textContent = currentQuestion.correctAnswer;
        answerDisplay.classList.remove("hidden");
      } else {
        alert("Keine Antwort verfügbar.");
      }
    }

    // Animation und Logik für den Fall "Nicht erraten"
    function showNotGuessedAnimation() {
      document.getElementById("popup").style.display = 'none';
      selectedButton.disabled = true;
      removeQuestionElements();
      const animationDiv = document.getElementById("notGuessedAnimation");
      animationDiv.style.display = 'block';
      setTimeout(() => {
        animationDiv.style.display = 'none';
      }, 2000);
    }
