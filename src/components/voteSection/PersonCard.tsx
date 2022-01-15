import { FC, useEffect, useState } from "react";
import { IPerson, THUMBS } from "../../constants/types/People";
import { formatDistanceStrict } from "date-fns";
import thumbUp from "../../assets/img/thumbs-up.svg";
import thumbDown from "../../assets/img/thumbs-down.svg";
import VoteStatusBar from "./VoteStatusBar";

interface PersonCardProps extends IPerson {
  onVote: (id: number, thumb: THUMBS) => void;
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

  return (
    <li className="person-card">
      <img
        className="person-card__image"
        src={`assets/img/${picture}`}
        alt={name}
      />
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
