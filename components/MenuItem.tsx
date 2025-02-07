interface MenuItemProps {
    text: string;
    color: string;
    icon: React.ComponentType;
  }
  
  const MenuItem = ({ text, color, icon: Icon }: MenuItemProps) => {
    return (
      <div 
        className="w-full h-14  rounded-md flex overflow-hidden cursor-pointer group" 
        style={{ borderColor: `var(--${color})`, borderWidth: "2px" }} 
      >
        <div
          className="rounded-[0_6px_6px_0] w-[70px] flex justify-center items-center text-4xl text-darkGrey transition-all"
          style={{ backgroundColor: `var(--${color})` }} 
        >
          <Icon />
        </div>
        <div className="w-full flex items-center justify-end pr-24 text-lg">
          <p>{text}</p>
        </div>
      </div>
    );
  };
  
  export default MenuItem;
  