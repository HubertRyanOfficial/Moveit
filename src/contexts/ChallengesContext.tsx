import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";

import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengeProviderProps {
  children: ReactNode,
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

interface ChallengesContextData {
  level: number;
  levelUp: () => void; 
  currentExperience: number; 
  challengeCompleted: number;
  startNewChallenge: () => void;
  activeChallenge: Challenge,
  resetChallenge: () => void,
  experienceToNextLevel: number,
  completeChallenge: () => void,
  closeLevelUpModal: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({children, ...rest}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengeCompleted, setChallengeComplete] = useState(rest.challengeCompleted ?? 0)

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4,2)

  useEffect(() => {
    Notification.requestPermission()

    // getCookies();

  }, [])

  useEffect(() => {

    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengeCompleted", String(challengeCompleted));

  }, [currentExperience, challengeCompleted, level]);

  // function getCookies() {
  //   let cLevel = Cookies.get("level");
  //   let cCurrentExperience = Cookies.get("currentExperience");
  //   let cChallengeCompleted = Cookies.get("challengeCompleted");

  //   setLevel(Number(cLevel));
  //   setCurrentExperience(Number(cCurrentExperience))
  //   setChallengeComplete(Number(cChallengeCompleted))
  // }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }
  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    // 

    new Audio("/notification.mp3").play();

    if(Notification.permission === "granted") {
      new Notification("Novo desafio 🥳", {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    resetChallenge();
    setChallengeComplete(challengeCompleted + 1);
  }

  return(
    <ChallengesContext.Provider value={{
      level, 
      levelUp, 
      currentExperience, 
      challengeCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
      }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}