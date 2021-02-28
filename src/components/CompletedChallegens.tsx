import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CompletedChallegens.module.css";

export function CompletedChallenges() {

  const { challengeCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallegensContainer}>
      <span>Desafios completos</span>
      <span>{challengeCompleted}</span>
    </div>
  )
}