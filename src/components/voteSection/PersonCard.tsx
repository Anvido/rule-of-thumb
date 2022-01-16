import { CSSProperties, FC, useEffect, useState } from "react";
import { IPerson, THUMBS } from "../../utils/types/People";
import { formatDistanceStrict } from "date-fns";
import thumbUp from "../../assets/img/thumbs-up.svg";
import thumbDown from "../../assets/img/thumbs-down.svg";
import VoteStatusBar from "./VoteStatusBar";

interface PersonCardProps extends IPerson {
  onVote: (id: number, thumb: THUMBS) => void;
  viewMode: string;
}

const PersonCard: FC<PersonCardProps> = ({
  id,
  name,
  description,
  category,
  picture,
  lastUpdated,
  votes,
  onVote,
  viewMode,
}) => {
  const [selectedThumb, setSelectedThumb] = useState<THUMBS | null>(null);
  const [sendVote, setSendVote] = useState(false);

  useEffect(() => {
    if (sendVote && selectedThumb) {
      onVote(id, selectedThumb);
      setSelectedThumb(null);
    }
  }, [sendVote, selectedThumb, onVote, id]);

  const handleVote = () => {
    setSendVote((prevValue) => !prevValue);
  };

  const dateText = `${formatDistanceStrict(
    new Date(),
    new Date(lastUpdated)
  )} ago in `;

  const thumbFocus = {
    outline: "2px solid white",
  };

  let bgStyle: CSSProperties = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.6) 50%), url(assets/img/${picture}) no-repeat`,
    backgroundSize: "cover",
  };

  if (viewMode === "list") {
    bgStyle = {
      background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 8%, rgb(136, 136, 136) 21.79%, rgb(102, 102, 102) 52%, rgba(51, 51, 51, 0.6) 70.88%) , url(assets/img/${picture}) no-repeat`,
      backgroundPosition: "center center, left center",
      backgroundSize: "100% 100%, 22%",
    };
  }

  return (
    <li className="person-card" style={bgStyle}>
      {votes.positive >= votes.negative && (
        <img
          className="person-card__thumb--positive"
          src={thumbUp}
          alt="thumbs up"
        />
      )}
      {votes.positive < votes.negative && (
        <img
          className="person-card__thumb--negative"
          src={thumbDown}
          alt="thumbs down"
        />
      )}
      <div className="person-card__content">
        <div className="content__info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="content__vote">
          {!sendVote && (
            <small>
              {dateText}
              <span>{category}</span>
            </small>
          )}
          {sendVote && <small>Thank you for your vote!</small>}
          <div className="person-card__actions">
            {!sendVote && (
              <>
                <button
                  onClick={() => setSelectedThumb(THUMBS.UP)}
                  className="icon-button"
                  aria-label="thumbs up"
                  style={selectedThumb === THUMBS.UP ? thumbFocus : {}}
                >
                  <img src={thumbUp} alt="thumbs up" />
                </button>
                <button
                  onClick={() => setSelectedThumb(THUMBS.DOWN)}
                  className="icon-button"
                  aria-label="thumbs down"
                  style={selectedThumb === THUMBS.DOWN ? thumbFocus : {}}
                >
                  <img src={thumbDown} alt="thumbs down" />
                </button>
              </>
            )}
            <button
              onClick={handleVote}
              disabled={sendVote ? false : !selectedThumb}
              className="vote-button"
            >
              {sendVote ? "Vote Again" : "Vote Now"}
            </button>
          </div>
        </div>
      </div>
      <VoteStatusBar {...votes} />
    </li>
  );
};

export default PersonCard;
