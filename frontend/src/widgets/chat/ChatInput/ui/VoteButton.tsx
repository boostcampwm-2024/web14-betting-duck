import styles from "./style.module.css";

function VoteButton() {
  return (
    <div className={styles["vote-page-button"]}>
      <button>
        <img
          alt="투표 페이지로 이동"
          loading="lazy"
          decoding="async"
          src="/src/assets/vote-page.png"
          width={24}
          height={24}
        />
      </button>
      <div className={`${styles.tooltip} ${styles["vote-page"]}`}>
        <div>vote page</div>
      </div>
    </div>
  );
}

export { VoteButton };
