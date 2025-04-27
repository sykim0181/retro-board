import DiscussContent from "@/components/room/discuss/DiscussContent";
import ContentHeader from "@/components/room/common/ContentHeader";
import ContentBody from "@/components/room/common/ContentBody";
import PhaseInfo from "@/components/room/common/PhaseInfo";

const Discuss = () => {
  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <ContentHeader.Wrapper>
        <ContentHeader.Title>Discuss</ContentHeader.Title>
        <ContentHeader.Description>
          Start the conversation about the topic.
        </ContentHeader.Description>
      </ContentHeader.Wrapper>

      <ContentBody>
        <PhaseInfo pagePhase="DISCUSS" />
        <DiscussContent />
      </ContentBody>
    </div>
  );
};

export default Discuss;
