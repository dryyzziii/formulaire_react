import React, { useState, useEffect } from 'react';
import './ReservationForm.css';

const ReservationForm = () => {
  const [isComingForChristmas, setIsComingForChristmas] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [adults, setAdults] = useState([]);
  const [hasChildren, setHasChildren] = useState(false);
  const [childCount, setChildCount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');
  
  useEffect(() => {
    if (adultCount > adults.length) {
      const newAdults = [...adults];
      for (let i = adults.length; i < adultCount; i++) {
        newAdults.push({ firstName: '' });
      }
      setAdults(newAdults);
    } else if (adultCount < adults.length) {
      setAdults(adults.slice(0, adultCount));
    }
  }, [adultCount]);
  
  // Vérifier si au moins un prénom d'adulte est rempli
  const hasAdultName = adults.some(adult => adult.firstName.trim() !== '');
  
  const increaseAdultCount = () => {
    setAdultCount(prev => prev + 1);
  };
  
  const decreaseAdultCount = () => {
    if (adultCount > 0) {
      setAdultCount(prev => prev - 1);
    }
  };
  
  const increaseChildCount = () => {
    setChildCount(prev => prev + 1);
  };
  
  const decreaseChildCount = () => {
    if (childCount > 0) {
      setChildCount(prev => prev - 1);
    }
  };
  
  const handleAdultNameChange = (index, value) => {
    const newAdults = [...adults];
    newAdults[index].firstName = value;
    setAdults(newAdults);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      isComingForChristmas,
      startDate,
      endDate,
      adults,
      hasChildren,
      childCount,
      comment
    };
    
    console.log('Données du formulaire:', formData);
  };
  
  return (
    <div className="reservation-form-container">
      <div className="info-header">
        <div className="info-icon">!</div>
        <div className="info-text">
          Hello ! Cette page a pour but de commencer à réfléchir à la répartition des lits pour Noël !
          Si t'as la moindre question, hésite pas à nous écrire sur Messenger ou par <a href="#" className="email-link">email</a> ! <span className="emoji">😊</span>
        </div>
        <button className="close-button">×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="toggle-container">
          <label className="toggle">
            <input 
              type="checkbox"
              checked={isComingForChristmas}
              onChange={() => setIsComingForChristmas(!isComingForChristmas)}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">Je viens pour noël !</span>
        </div>
        
        {isComingForChristmas && (
          <>
            <div className="date-range">
              <div className="date-field">
                <label>De :</label>
                <input 
                  type="date" 
                  className="date-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min="2025-12-20"
                  max="2026-01-10"
                />
              </div>
              
              <div className="date-field">
                <label>à</label>
                <input 
                  type="date" 
                  className="date-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || "2025-12-20"}
                  max="2026-01-10"
                />
              </div>
            </div>
            
            <div className="counter-section">
              <label>Nombre d'adultes :</label>
              <div className="counter-control">
                <button 
                  type="button" 
                  className="counter-button"
                  onClick={decreaseAdultCount}
                >
                  −
                </button>
                <div className="counter-value">{adultCount}</div>
                <button 
                  type="button" 
                  className="counter-button"
                  onClick={increaseAdultCount}
                >
                  +
                </button>
              </div>
            </div>
            
            {adultCount > 0 && (
              <div className="name-fields">
                {adults.map((adult, index) => (
                  <input
                    key={index}
                    type="text"
                    className="name-input"
                    placeholder={`Prénom n°${index + 1}`}
                    value={adult.firstName}
                    onChange={(e) => handleAdultNameChange(index, e.target.value)}
                  />
                ))}
              </div>
            )}
            
            {hasAdultName && (
              <div className="toggle-container">
                <label className="toggle">
                  <input 
                    type="checkbox"
                    checked={hasChildren}
                    onChange={() => setHasChildren(!hasChildren)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">J'ai des pitchounes !</span>
              </div>
            )}
            
            {hasChildren && (
              <div className="counter-section">
                <label>Nombre d'enfants :</label>
                <div className="counter-control">
                  <button 
                    type="button" 
                    className="counter-button"
                    onClick={decreaseChildCount}
                  >
                    −
                  </button>
                  <div className="counter-value">{childCount}</div>
                  <button 
                    type="button" 
                    className="counter-button"
                    onClick={increaseChildCount}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            <div className="comment-section">
              <label>Tu vois quelque chose à ajouter ?</label>
              <textarea 
                className="comment-area"
                placeholder="Écris ici 😊"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            
            <button type="submit" className="confirm-button">
              Confirmer les dates <span className="arrow-icon">→</span>
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ReservationForm;