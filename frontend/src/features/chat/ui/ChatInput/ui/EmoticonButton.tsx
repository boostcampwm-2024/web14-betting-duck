import styles from "./style.module.css";
import emoticonImage from "@assets/images/emoticon.png";

function EmoticomButton() {
  return (
    <div className={styles["vote-page-button"]}>
      <button>
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
        <div>emoticon</div>
      </div>{" "}
    </div>
  );
}

export { EmoticomButton };
