import { FC } from "react";
import { IVotes } from "../../constants/types/People";
import thumbUp from "../../assets/img/thumbs-up.svg";
import thumbDown from "../../assets/img/thumbs-down.svg";

const VoteStatusBar: FC<IVotes> = ({ positive, negative }) => {
  const total = positive + negative;
  const positiveVotes = Number((positive / total) * 100).toFixed(1);
  const negativeVotes = Number((negative / total) * 100).toFixed(1);

  const statusbarStyle = {
    background: `linear-gradient(to right, rgba(60, 187, 180, 0.6) ${positiveVotes}%, rgba(249, 173, 29, 0.6) ${positiveVotes}%)`,
  };

  return (
    <div className="status-bar" style={statusbarStyle}>
      <div className="status-bar__positive">
        <img src={thumbUp} alt="thumbs up" />
        <span>{positiveVotes}%</span>
      </div>
      <div className="status-bar__negative">
        <span>{negativeVotes}%</span>
        <img src={thumbDown} alt="thumbs down" />
      </div>
    </div>
  );
};

export default VoteStatusBar;
