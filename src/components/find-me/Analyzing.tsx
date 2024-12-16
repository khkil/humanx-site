import React from 'react';
import '../../css/find-me/found_me.css';

export function Analyzing() {
  return (
    <div className='findme__loading'>
      <div className='findme__loading__text'>나를 찾았어!</div>
      <div className='findme__loading__animation'>
        <div className='findme__loading__animation--objet objet--1'></div>
        <div className='findme__loading__animation--objet objet--2'></div>
        <div className='findme__loading__animation--objet objet--3'></div>
      </div>
      <div className='findme__loading__explanation'>
        10만 명의 데이터들 중에서
        <br />
        당신의 데이터를 추출중입니다!
      </div>
    </div>
  );
}
