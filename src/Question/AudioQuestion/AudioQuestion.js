import React, { useState, useEffect } from "react";
import Button from "../../Button";
import * as myConsts from '../../consts';
import classes from './Question.module.css';
import { FaPlay } from 'react-icons/fa';
import { getChampionNameById, getChampionKeyById } from '../../utils';


const AudioQuestion = ({version, questionOptions, champion, updateScore, nextQuestion, mode}) => {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [audio, setAudio] = useState();

  const subPath = mode === "ban" ? myConsts.CDRAGON_BAN_URL : myConsts.CDRAGON_SELECT_URL;
  const imageUrl = `${myConsts.DDRAGON_BASE_URL}/${version}/img/champion/${getChampionKeyById(champion)}.png`;
  const audioUrl = `${myConsts.CDRAGON_BASE_URL}/latest/${subPath}/${champion}.ogg`;  

  useEffect(() => {
    setAnswered(false);
  }, [champion]);
  
  useEffect(() => {
    setAudio(new Audio(audioUrl))
  }, [audioUrl]);

  const getNextQuestion = () => {
    audio.pause();
    nextQuestion();
  }

  const checkAnswer = userAnswer => {
    if(answered) return;
    setAnswered(true);
    const isCorrect = userAnswer === champion;
    setCorrect(isCorrect);
    updateScore(isCorrect);
  }

  return (
    <div className={classes.question}>
      <Button click={() => audio.play()} classes={[classes.button, classes.audioButton].join` `}>
        <FaPlay/>
        Tocar fala de {mode === 'ban' ? 'banimento' : 'seleção'}
      </Button>
      <ul className={classes.options}>
        {
          questionOptions.map(option => (
            <Button classes={classes.option} key={option} click={() => checkAnswer(option)}>{getChampionNameById(option)}</Button>
          ))
        }
      </ul>
      {answered ? (
        <div className={classes.answer}>
          {correct ? (
            <h2 className={classes.correct}>Correto ✔</h2>
          ) : (
            <h2 className={classes.wrong}>Errado ❌</h2>
          )}
          <img
            src={imageUrl}
            alt=""
            height="100"
            width="100"
            />
          <Button click={getNextQuestion} classes={[classes.button, classes.nextButton].join` `}> Próxima pergunta</Button>
        </div>
        ) : null}
    </div>
  );
};

export default AudioQuestion;