import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {

  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
  <header className={styles.experienceBar}>
    <span>0px</span>
    <div>
      <div style={{width: `${percentNextLevel}%`}}></div>
      <span className={styles.currentExperience} style={{left: `${percentNextLevel}%`}}>{currentExperience} xp</span>
    </div>
    <span>{experienceToNextLevel} px</span>
  </header>
  )
}