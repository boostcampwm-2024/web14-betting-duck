import React from "react";
import { InputField } from "../../../../shared/components/input/InputField";
import { TextIcon } from "@/shared/icons";
import { useTitleInput } from "@/features/create-vote/model/useTitleInput";

const TitleInput = React.memo(() => {
  const { value, setValue } = useTitleInput();

  return (
    <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
      <InputField
        id="create-vote-title"
        placeholder="승부를 예측할 제목을 입력해 주세요."
        name="title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min={10}
      >
        <TextIcon />
      </InputField>
    </div>
  );
});

export { TitleInput };
