import React from "react";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import {
  CaseInputs,
  CoinInput,
  Timer,
  TitleInput,
} from "@/features/create-vote/ui/components";
import { DialogContext } from "@/shared/components/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import { BettingRoomInfo } from "@/shared/types";

type WaitingRoomInfo = z.infer<typeof responseBetRoomInfo>;

const EditFormStatusForm = React.memo(({ info }: { info: WaitingRoomInfo }) => {
  const { channel } = info;
  const { toggleOpen } = React.useContext(DialogContext);
  const queryClient = useQueryClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch(`/api/betrooms/${channel.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: {
            title: formData.get("title") as string,
            options: {
              option1: formData.get("winCase") as string,
              option2: formData.get("loseCase") as string,
            },
            settings: {
              duration: Number(formData.get("timer")) * 60,
              defaultBetAmount: Number(formData.get("coin")),
            },
          },
        }),
      });
      if (!response.ok) throw new Error("투표 수정에 실패했습니다.");

      const newRoomResponse = await fetch(`/api/betrooms/${channel.id}`);
      const newRoomData = await newRoomResponse.json();
      const result = responseBetRoomInfo.safeParse(newRoomData.data);
      if (!result.success) {
        console.error(result.error.errors);
        return;
      }
      queryClient.setQueryData(
        bettingRoomQueryKey(channel.id),
        (prev: BettingRoomInfo) => {
          return { ...prev, ...result.data };
        },
      );

      toggleOpen();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-layout-main flex w-full min-w-[500px] flex-col items-center gap-4 rounded-lg p-9"
    >
      <h1 className="text-default my-8 text-xl font-extrabold">
        승부 예측 수정하기
      </h1>
      <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
        <TitleInput initialValue={channel.title} />
      </div>
      <div className="bg-layout-sidebar w-full rounded-lg shadow-inner">
        <CaseInputs
          winIntialValue={channel.options.option1.name}
          loseInitialValue={channel.options.option2.name}
        />
      </div>
      <div className="flex w-full gap-2">
        <Timer initialValue={Math.floor(channel.settings.duration / 60)} />
        <CoinInput initialValue={channel.settings.defaultBetAmount} />
      </div>
      <div className="mt-4 flex w-full gap-2">
        <button
          type="button"
          className="bg-secondary hover:bg-secondary-hover shadow-middle text-default w-1/2 rounded-lg px-8 py-4 font-semibold hover:text-white"
          onClick={toggleOpen}
        >
          취소
        </button>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled shadow-middle w-1/2 rounded-lg px-8 py-4 font-semibold text-white"
        >
          생성
        </button>
      </div>
    </form>
  );
});

EditFormStatusForm.displayName = "EditFormStatusForm";

export { EditFormStatusForm };
