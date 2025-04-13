import PhaseInfo from "@/components/room/common/PhaseInfo";
import ContentHeader from "@/components/room/common/ContentHeader";
import ContentBody from "@/components/room/common/ContentBody";
import ReflectBoard from "@/components/room/reflect/ReflectBoard";

const Reflect = () => {
  return (
    <div className="h-full flex flex-col gap-[2rem]">
      <ContentHeader.Wrapper>
        <ContentHeader.Title>Reflect</ContentHeader.Title>
        <ContentHeader.Description>
          Add a card and drag cards by topic.
        </ContentHeader.Description>
      </ContentHeader.Wrapper>

      <ContentBody className="flex flex-col">
        <PhaseInfo pagePhase="REFLECT" />
        <ReflectBoard />
      </ContentBody>
    </div>
  );
};

export default Reflect;
