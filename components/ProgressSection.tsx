
interface ProgressSectionProps {   
    title: string;
}

const ProgressSection = ( { title }: ProgressSectionProps) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

export default ProgressSection;