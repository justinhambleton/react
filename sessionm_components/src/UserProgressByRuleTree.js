/* global confetti */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProgressDisplay.css';
import 'animate.css';

const UserProgressByRuleTree = ({ retailerId, userId, ruleTreeId, ruleId }) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/user-progress', {
          retailer_id: retailerId,
          user_id: userId,
          ids: [ruleTreeId],
          culture: 'en-US'
        });
        setProgress(response.data.payload.rule_trees[0].root.rules[ruleId]);
      } catch (error) {
        setError(error);
      }
    };

    const fetchOffers = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/get-user-offers', {
          retailer_id: retailerId,
          user_id: userId,
          skip: 0,
          take: 1000,
          include_pending_extended_data: false,
          culture: 'en-US'
        });
        setOffers(response.data.payload.user_offers);
      } catch (error) {
        setError(error);
      }
    };

    fetchUserProgress();
    fetchOffers();

    const intervalId = setInterval(fetchUserProgress, 5000);

    return () => clearInterval(intervalId);
  }, [retailerId, userId, ruleTreeId, ruleId]);

  useEffect(() => {
    if (progress) {
      const current = Math.round(parseFloat(progress.current));
      const expected = parseFloat(progress.expected);
      const percentage = (current / expected) * 100;
      if (percentage >= 100) {
        confetti();
      }
    }
  }, [progress]);

  if (error) return <div>Error: {error.message}</div>;
  if (!progress) return <div>Loading...</div>;

  const current = Math.round(parseFloat(progress.current));
  const expected = parseFloat(progress.expected);
  const percentage = (current / expected) * 100;
  const remaining = expected - current;

  return (
    <div className="container">
      <div className="main-card">
        <div className="score-section">
          <div className="score">
            <div className="score-value">{current}</div>
            <div className="score-label">points</div>
          </div>
        </div>
        <div className="reward-section">
          <div className="reward-card">
            <div className="reward-value">$5</div>
            <div className="reward-label">reward</div>
            <div className="reward-space"></div>
          </div>
          <div className="progress-section">
            <div className="progress-bar-container">
              <div className="progress-bar-background"></div>
              <div className="progress-bar-foreground" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="progress-info">
              <div className="progress-text">{current}/{expected}</div>
              <div className="progress-text">{remaining} to reward</div>
            </div>
          </div>
        </div>
      </div>
      <div className="offer-wallet">
        {offers.map(offer => (
          <div key={offer.offer_id} className="offer-card animate__animated animate__bounceIn">
            <h3>{offer.name}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProgressByRuleTree;
