import React from "react";

interface MessageProps {
  username: string;
  message: string;
  userColor: string;
  userIcon: string;
}

const Message: React.FC<MessageProps> = ({
  username,
  message,
  userColor,
  userIcon,
}) => {
  return (
    <div className="live_chatting_list_item__0SGhw">
      <div className="live_chatting_message_container__vrI-y">
        <span
          className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP"
          style={{ marginRight: "4px" }}
        >
          <span className="live_chatting_username_wrapper__iJpJB">
            <span className="live_chatting_username_icon__6Dj7b">
              <span className="badge_container__a64XB">
                <img src={userIcon} alt="" width="18" height="18" />
              </span>
            </span>
          </span>
          <span
            className="live_chatting_username_nickname__dDbbj"
            style={{ color: userColor }}
          >
            <span className="">
              <span className="name_text__yQG50">{username}</span>
            </span>
          </span>
        </span>
        <span className="live_chatting_message_text__DyleH">{message}</span>
      </div>
    </div>
  );
};

export default Message;

// display: flex;
// flex: 1 1;
// margin: -77px 0 -62px;
// overflow: hidden;
// padding: 77px 0 62px;
// position: relative;

// margin-top: -77px;
// padding-top: 77px;
