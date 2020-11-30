import React, { useState, useEffect } from 'react';
import classes from './SpellQuestion.module.css';
import Button from '../../Button';
import * as myConsts from '../../consts';
import { getChampionNameById } from '../../utils';

const SpellQuestion = ({champion, spell, options, answer, nextQuestion, updateScore}) => {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  
  useEffect(() => {
    setAnswered(false);
  }, [spell])

  const imageUrl = `${myConsts.DDRAGON_BASE_URL}/10.23.1/img/${spell.hotkey === 'Passive' ? 'passive' : 'spell'}/${spell.image}`;

  const checkAnswer = userAnswer => {
    if(answered) return;
    setAnswered(true);
    const isCorrect = userAnswer === answer;
    setCorrect(isCorrect);
    updateScore(isCorrect);
  }

  return (
    <div className={classes.question}>
      <span>De quem é a habilidade <span style={{fontWeight: 'bold'}}>{spell.name}</span>?</span>
      <ul className={classes.options}>
        {
          options.map(option => (
            <Button classes={classes.option} click={() => checkAnswer(option)} key={option} >{getChampionNameById(option)}</Button>
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
          <h3>{`${champion.name} - ${spell.hotkey}`}</h3>
          <img
            src={imageUrl}
            alt=""
            height="100"
            width="100"
          />
          <Button click={() => nextQuestion()} classes={[classes.button, classes.nextButton].join` `}> Próxima pergunta</Button>

        </div>
        ) : null}
    </div>
  );
}

export default SpellQuestion;