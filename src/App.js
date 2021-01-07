import { useEffect, useState, useCallback } from 'react';
import AudioQuestion from './Question/AudioQuestion/AudioQuestion';
import SpellQuestion from './Question/SpellQuestion/SpellQuestion';
import Navbar from './Navbar/Navbar';
import React from 'react';
import * as utils from './utils';
import classes from './App.module.css';

const spellOrder = ['Q', 'W', 'E', 'R', 'Passive'];

const App = () =>  {
  const [score, setScore] = useState(0);
  const [gamemode, setGamemode] = useState();
  const [version, setVersion] = useState();
  const [component, setComponent] = useState(); 
  const [showSidebar, setShowSidebar] = useState(false);

  const generateQuoteQuestion = useCallback(() => {
    const options = utils.shuffleChampions(4);
    return {
      options,
      answer: options[Math.floor(Math.random() * options.length)]
    }
  }, [])

  const generateChampionSpellQuestion = useCallback(() => {
    const options = utils.shuffleChampions(4);
    const answer = options[Math.floor(Math.random() * options.length)];
    const champion = utils.getChampionDataById(answer);

    const spells = [...champion.spells];
    spells.push(champion.passive);

    const spellIndex = Math.floor(Math.random() * spells.length); 
    const spell = spells[spellIndex];

    return {
      options,
      answer,
      champion,
      spell: {
        hotkey: spellOrder[spellIndex],
        name: spell.name,
        image: spell.image.full
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const version = (await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
                        .then(async(r) => await r.json())
                      )[0]; 
      setVersion(version);
    }
    
    fetchData();
  },[]);

  const getNextQuestion = (mode) => {
    const questionMode = mode ?? gamemode;
    switch (questionMode) {
      case "pick":
      case "ban":
        const quoteQuestion = generateQuoteQuestion();
        const quoteComponent = (
          <AudioQuestion 
            updateScore={updateScore}
            questionOptions={quoteQuestion.options}
            champion={quoteQuestion.answer}
            version={version}
            nextQuestion={() => getNextQuestion(questionMode)}
            mode={questionMode}
          ></AudioQuestion>
        );
        setComponent(quoteComponent)
        break;
      case "champion":
        const championQuestion = generateChampionSpellQuestion();
        setComponent((
          <SpellQuestion {...championQuestion} 
            nextQuestion={() => getNextQuestion(questionMode)} 
            updateScore={updateScore}
          ></SpellQuestion>
        ));
        break;
      default:
        setComponent(null);
        break;
    }
  }

  const switchGamemode = (mode) => {
    const msg = 'Se você trocar o modo de jogo, sua pontuação será zerada. Tem certeza?';
    if(gamemode && gamemode !== mode && !window.confirm(msg)) return;
    (() => {
      setGamemode(mode);
      setShowSidebar(false);
      setScore(0);
    })();

    getNextQuestion(mode);
  }
  
  const toggleSidebar = show => {
    setShowSidebar(show)
  }

  const updateScore = (isCorrect) => {
    setScore(prevScore => isCorrect ?  prevScore + 1 : 0);
  }

  return (
    <React.Fragment>
      <Navbar 
        sidebar={{show: showSidebar, toggle: toggleSidebar}} 
        gamemode={{name: gamemode, toggle: switchGamemode}}
        score={score}
      ></Navbar>
      {component}
      <div className={classes.footbar}>
        This webite was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.
      </div>
    </React.Fragment>
  );
}

export default App;
