import ProgressBar from "react-customizable-progressbar";
import styles from "./progess.module.css";

export default function ProgessCircular({ progress }) {
  return (
    <ProgressBar
      radius={100}
      progress={progress}
      cut={120}
      rotate={-210}
      strokeWidth={28}
      strokeColor="#50429b"
      trackStrokeWidth={14}
      trackStrokeLinecap="butt"
    >
      <div className={styles.indicator}>
        <div className="flex justify-center items-center text-white text-4xl font-semibold">
          {progress}%
        </div>
      </div>
    </ProgressBar>
  );
}
