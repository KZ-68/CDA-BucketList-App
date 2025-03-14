
interface ProgressSectionProps {   
    title: string;
    icon: React.ComponentType;
    color: string;
}

const ProgressSection = ( { title,  icon: Icon, color }: ProgressSectionProps) => {
  return (
    <div className="flex items-center gap-3 mt-8 mb-4">
      <div 
        className="h-11 w-11 rounded flex justify-center items-center text-4xl border border-solid p-1 "
        style={{ color: `var(--${color})`, borderColor: `var(--${color})` }} >
        <Icon />
      </div>
      <h2 className="uppercase text-2xl" style={{ color: `var(--${color})`}} >{title}</h2>
    </div>
  );
}

export default ProgressSection;