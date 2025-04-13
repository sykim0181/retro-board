import ContentBody from "@/components/room/common/ContentBody";
import ContentHeader from "@/components/room/common/ContentHeader";
import PhaseInfo from "@/components/room/common/PhaseInfo";
import VoteBoard from "@/components/room/vote/VoteBoard";

const Vote = () => {
  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <ContentHeader.Wrapper>
        <ContentHeader.Title>Vote</ContentHeader.Title>
        <ContentHeader.Description>
          Vote on the topics you want to discuss.
        </ContentHeader.Description>
      </ContentHeader.Wrapper>

      <ContentBody className="flex flex-col">
        <PhaseInfo pagePhase="VOTE" />
        <VoteBoard />
      </ContentBody>
    </div>
  );
};

export default Vote;
