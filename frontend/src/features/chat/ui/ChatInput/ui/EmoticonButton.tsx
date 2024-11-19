import useToggle from "@/shared/hooks/use-trigger";
import styles from "./style.module.css";
import emoticonImage from "@assets/images/emoticon.png";

function EmoticomButton() {
  const [isClick, toggleClick] = useToggle();

  return (
    <div className={styles["vote-page-button"]}>
      <button
        onClick={toggleClick}
        onMouseLeave={() =>
          setTimeout(() => {
            if (isClick) toggleClick();
          }, 300)
        }
      >
        <img
          alt="이모티콘 입력 버튼"
          loading="lazy"
          decoding="async"
          src={emoticonImage}
          width={24}
          height={24}
        />
      </button>
      <div className={styles.tooltip}>
        {isClick ? (
          <div className={styles["emoticon-list"]}>HIHI</div>
        ) : (
          <div>emoticon</div>
        )}
      </div>{" "}
    </div>
  );
}

export { EmoticomButton };
