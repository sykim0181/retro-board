import DiscussContent from "@/components/room/discuss/DiscussContent";
import ContentHeader from "@/components/room/common/ContentHeader";
import ContentBody from "@/components/room/common/ContentBody";

const Discuss = () => {
  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <ContentHeader.Wrapper>
        <ContentHeader.Title>Discuss</ContentHeader.Title>
        <ContentHeader.Description>
          Start the conversation about the task card.
        </ContentHeader.Description>
      </ContentHeader.Wrapper>

      <ContentBody>
        <DiscussContent />
      </ContentBody>
    </div>
  );
};

export default Discuss;
